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

  const displayPrice = Number(product.display_price ?? product.base_price);

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
      categoryName: product.category_name,
    });
  };

  return (
    <article className="rounded-2xl border bg-white p-4 shadow-sm">
      <div className="mb-4 h-40 rounded-xl bg-gray-100">
        {product.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image_url}
            alt={product.name}
            className="h-full w-full rounded-xl object-cover"
          />
        ) : null}
      </div>

      <p className="text-xs uppercase tracking-wide text-gray-500">{product.category_name}</p>
      <h3 className="mt-1 text-lg font-semibold">{product.name}</h3>

      {product.description ? (
        <p className="mt-2 line-clamp-2 text-sm text-gray-600">{product.description}</p>
      ) : null}

      <div className="mt-4 flex items-center justify-between">
        <span className="text-lg font-bold">{formatCurrency(displayPrice)}</span>
        <button
          onClick={handleAdd}
          className="rounded-xl bg-black px-4 py-2 text-sm font-medium text-white"
        >
          Agregar
        </button>
      </div>
    </article>
  );
}