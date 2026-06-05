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
    return <div className="mx-auto max-w-7xl px-4 py-8">Cargando carrito...</div>;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <PageHeader
        title="Tu carrito"
        description="Revisa tus productos antes de continuar con el checkout."
      />

      {!items.length ? (
        <EmptyState
          title="Tu carrito está vacío"
          description="Agrega productos desde la carta o promociones."
        />
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
          <div className="space-y-4">
            <BranchSelector
              selectedBranchId={selectedBranchId}
              onSelect={replacePendingBranch}
            />

            {items.map((item) => (
              <CartItemRow
                key={`${item.productId}-${item.branchId}`}
                item={item}
                onUpdateQuantity={(quantity) =>
                  updateQuantity(item.productId, item.branchId, Math.max(1, quantity))
                }
                onRemove={() => removeItem(item.productId, item.branchId)}
              />
            ))}
          </div>

          <div className="space-y-4">
            <CartSummary subtotal={subtotal} totalItems={totalItems} />

            <Link
              href="/checkout"
              className="block rounded-2xl bg-black px-5 py-3 text-center text-white"
            >
              Continuar al checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}