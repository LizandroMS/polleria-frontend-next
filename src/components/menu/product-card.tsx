'use client';

import { Product } from '@/features/products/types';
import { getOrCreateSessionId } from '@/features/cart/utils/cart-session';
import { useCart } from '@/hooks/use-cart';
import { formatCurrency } from '@/lib/utils/currency';
import { notify } from '@/shared/lib/notify';

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

    notify.success('Producto agregado al carrito satisfactoriamente.');
  };

  return (
    <article className="group overflow-hidden rounded-[24px] border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-52 overflow-hidden bg-gray-100">
        {product.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image_url}
            alt={product.name}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-gray-400">
            Sin imagen
          </div>
        )}

        <div className="absolute left-4 top-4">
          <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-800 shadow">
            {product.category_name}
          </span>
        </div>
      </div>

      <div className="space-y-3 p-5">
        <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>

        {product.description ? (
          <p className="line-clamp-2 text-sm leading-6 text-gray-600">
            {product.description}
          </p>
        ) : null}

        <div className="flex items-center justify-between pt-2">
          <div className="flex flex-col">
            {hasPromo ? (
              <span className="text-sm text-gray-400 line-through">
                {formatCurrency(regularPrice)}
              </span>
            ) : null}
            <span className="text-xl font-bold text-gray-900">
              {formatCurrency(displayPrice)}
            </span>
            {hasPromo ? (
              <span className="text-xs font-semibold text-emerald-600">Precio promo</span>
            ) : null}
          </div>

          <button
            onClick={handleAdd}
            className="rounded-2xl bg-black px-4 py-2 text-sm font-medium text-white transition hover:scale-[1.02]"
          >
            Agregar
          </button>
        </div>
      </div>
    </article>
  );
}