'use client';

import { BranchSelector } from '@/components/cart/branch-selector';
import { CartItemRow } from '@/components/cart/cart-item-row';
import { CartSummary } from '@/components/cart/cart-summary';
import { EmptyState } from '@/components/shared/empty-state';
import { PageHeader } from '@/components/shared/page-header';
import { getOrCreateSessionId } from '@/features/cart/utils/cart-session';
import { useCart } from '@/hooks/use-cart';
import Link from 'next/link';
import { useEffect } from 'react';

export default function CartPage() {
  const {
    items,
    hydrated,
    selectedBranchId,
    replacePendingBranch,
    sessionId,
    setSessionId,
    updateQuantity,
    removeItem,
    subtotal,
    totalItems,
  } = useCart();

  useEffect(() => {
    if (!sessionId) {
      const generated = getOrCreateSessionId();
      if (generated) {
        setSessionId(generated);
      }
    }
  }, [sessionId, setSessionId]);

  if (!hydrated) {
    return (
      <div className="page-shell">
        <div className="app-container">
          <div className="loading-panel">Cargando carrito...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <div className="app-container space-y-8">
        <section className="page-hero">
          <PageHeader
            eyebrow="Carrito"
            title="Tu pedido"
            description="Revisa tus productos, confirma la sucursal y continúa al checkout cuando todo esté listo."
          />
        </section>

        {!items.length ? (
          <EmptyState
            title="Tu carrito está vacío"
            description="Agrega productos desde la carta o promociones para iniciar tu pedido."
            action={<Link href="/menu" className="btn-primary">Ver carta</Link>}
          />
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
            <div className="space-y-5">
              <BranchSelector selectedBranchId={selectedBranchId} onSelect={replacePendingBranch} />

              <div className="space-y-4">
                {items.map((item) => (
                  <CartItemRow
                    key={`${item.productId}-${item.branchId}`}
                    item={item}
                    onUpdateQuantity={(quantity) => updateQuantity(item.productId, item.branchId, Math.max(1, quantity))}
                    onRemove={() => removeItem(item.productId, item.branchId)}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <CartSummary subtotal={subtotal} totalItems={totalItems} />
              <Link href="/checkout" className="btn-primary w-full">
                Continuar al checkout
              </Link>
              <Link href="/menu" className="btn-secondary w-full">
                Seguir comprando
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
