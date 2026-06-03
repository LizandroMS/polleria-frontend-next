'use client';

import { Product } from '@/features/products/types';
import { getOrCreateSessionId } from '@/features/cart/utils/cart-session';
import { useCart } from '@/hooks/use-cart';
import { formatCurrency } from '@/lib/utils/currency';

type Props = {
  product: Product;
};

export function ProductCard({ product }: Props) {
  const { selectedBranchId, setSelectedBranchId, addItem, sessionId, setSessionId } = useCart();

  const regularPrice = Number(product.reference_price ?? product.base_price);
  const displayPrice = Number(product.display_price ?? product.promo_price ?? product.base_price);
  const hasPromo = Number.isFinite(displayPrice) && Number.isFinite(regularPrice) && displayPrice < regularPrice;

  const handleAdd = () => {
    const currentSessionId = sessionId ?? getOrCreateSessionId();

    if (currentSessionId && !sessionId) {
      setSessionId(currentSessionId);
    }

    const branchId = selectedBranchId ?? 'pending-branch';

    if (!selectedBranchId) {
      setSelectedBranchId(branchId);
    }

    addItem({
      productId: product.id,
      branchId,
      quantity: 1,
      productName: product.name,
      imageUrl: product.image_url,
      displayPrice,
      originalPrice: hasPromo ? regularPrice : null,
      promoPrice: hasPromo ? displayPrice : null,
      categoryName: product.category_name,
    });
  };

  return (
    <article className="group soft-card interactive-card overflow-hidden">
      <div className="relative h-56 overflow-hidden bg-[#fff4e9]">
        {product.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image_url}
            alt={product.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm" style={{ color: 'var(--text-soft)' }}>
            Sin imagen
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-80" />

        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-white/92 px-3 py-1 text-xs font-extrabold shadow-sm" style={{ color: 'var(--primary)' }}>
            {product.category_name || 'Carta'}
          </span>
          {hasPromo ? (
            <span className="rounded-full px-3 py-1 text-xs font-extrabold text-white shadow-sm" style={{ background: 'var(--success)' }}>
              Promo
            </span>
          ) : null}
        </div>
      </div>

      <div className="space-y-4 p-5">
        <div>
          <h3 className="text-xl font-extrabold leading-tight" style={{ color: 'var(--dark)' }}>
            {product.name}
          </h3>

          {product.description ? (
            <p className="mt-2 line-clamp-2 text-sm leading-6" style={{ color: 'var(--text-soft)' }}>
              {product.description}
            </p>
          ) : null}
        </div>

        <div className="flex items-end justify-between gap-4 pt-2">
          <div className="flex flex-col">
            {hasPromo ? (
              <span className="text-sm line-through" style={{ color: 'var(--text-muted)' }}>
                {formatCurrency(regularPrice)}
              </span>
            ) : null}
            <span className="text-2xl font-black" style={{ color: 'var(--dark)' }}>
              {formatCurrency(displayPrice)}
            </span>
            {hasPromo ? <span className="text-xs font-bold text-emerald-700">Precio promocional</span> : null}
          </div>

          <button onClick={handleAdd} className="btn-primary px-5 py-3">
            Agregar
          </button>
        </div>
      </div>
    </article>
  );
}
