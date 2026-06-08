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
    <article className="group flex h-full flex-col overflow-hidden rounded-[18px] border bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg sm:rounded-[24px]">
      <div className="relative h-36 overflow-hidden bg-gray-100 sm:h-52">
        {product.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image_url}
            alt={product.name}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center px-3 text-center text-xs text-gray-400 sm:text-sm">
            Sin imagen
          </div>
        )}

        <div className="absolute left-2 top-2 sm:left-4 sm:top-4">
          <span className="line-clamp-1 rounded-full bg-white/90 px-2 py-1 text-[10px] font-semibold text-gray-800 shadow sm:px-3 sm:text-xs">
            {product.category_name}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col space-y-2 p-3 sm:space-y-3 sm:p-5">
        <h3 className="line-clamp-2 text-sm font-semibold leading-5 text-gray-900 sm:text-lg sm:leading-6">
          {product.name}
        </h3>

        {product.description ? (
          <p className="hidden text-sm leading-6 text-gray-600 sm:line-clamp-2">
            {product.description}
          </p>
        ) : null}

        <div className="mt-auto flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col">
            {hasPromo ? (
              <span className="text-xs text-gray-400 line-through sm:text-sm">
                {formatCurrency(regularPrice)}
              </span>
            ) : null}
            <span className="text-base font-bold text-gray-900 sm:text-xl">
              {formatCurrency(displayPrice)}
            </span>
            {hasPromo ? (
              <span className="text-[10px] font-semibold text-emerald-600 sm:text-xs">Precio promo</span>
            ) : null}
          </div>

          <button
            onClick={handleAdd}
            className="w-full rounded-xl bg-black px-3 py-2 text-xs font-semibold text-white transition hover:bg-gray-900 sm:w-auto sm:rounded-2xl sm:px-4 sm:text-sm"
          >
            Agregar
          </button>
        </div>
      </div>
    </article>
  );
}
