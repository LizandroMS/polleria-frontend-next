'use client';

import { CartItem } from '@/features/cart/types';
import { formatCurrency } from '@/lib/utils/currency';

type Props = {
  item: CartItem;
  onUpdateQuantity: (quantity: number) => void;
  onRemove: () => void;
};

export function CartItemRow({ item, onUpdateQuantity, onRemove }: Props) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border bg-white p-4 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-4">
        <div className="h-20 w-20 rounded-xl bg-gray-100">
          {item.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.imageUrl}
              alt={item.productName}
              className="h-full w-full rounded-xl object-cover"
            />
          ) : null}
        </div>

        <div>
          <h3 className="font-semibold">{item.productName}</h3>
          {item.categoryName ? (
            <p className="text-sm text-gray-500">{item.categoryName}</p>
          ) : null}
          <p className="mt-1 text-sm font-medium">
            {formatCurrency(item.displayPrice)}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <input
          type="number"
          min={1}
          value={item.quantity}
          onChange={(e) => onUpdateQuantity(Number(e.target.value))}
          className="w-20 rounded-xl border px-3 py-2"
        />
        <button
          onClick={onRemove}
          className="rounded-xl border px-4 py-2 text-sm"
        >
          Quitar
        </button>
      </div>
    </div>
  );
}