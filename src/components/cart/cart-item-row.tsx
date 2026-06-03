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
    <div className="soft-card flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-4">
        <div className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-[#fff4e9]">
          {item.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={item.imageUrl} alt={item.productName} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs" style={{ color: 'var(--text-soft)' }}>
              Sin imagen
            </div>
          )}
        </div>

        <div className="min-w-0">
          <h3 className="font-extrabold" style={{ color: 'var(--dark)' }}>
            {item.productName}
          </h3>
          {item.categoryName ? <p className="mt-1 text-sm" style={{ color: 'var(--text-soft)' }}>{item.categoryName}</p> : null}
          <div className="mt-2 flex flex-col">
            {item.originalPrice && item.originalPrice > item.displayPrice ? (
              <span className="text-xs line-through" style={{ color: 'var(--text-muted)' }}>
                {formatCurrency(item.originalPrice)}
              </span>
            ) : null}
            <p className="text-sm font-bold" style={{ color: 'var(--dark)' }}>
              {formatCurrency(item.displayPrice)}
            </p>
            {item.promoPrice ? <span className="text-xs font-semibold text-emerald-700">Precio promocional</span> : null}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-end gap-3">
        <label className="text-xs font-bold uppercase tracking-wide" style={{ color: 'var(--text-soft)' }}>
          Cantidad
        </label>
        <input
          type="number"
          min={1}
          value={item.quantity}
          onChange={(e) => onUpdateQuantity(Number(e.target.value))}
          className="input-soft w-24 text-center"
        />
        <button onClick={onRemove} className="btn-secondary px-4 py-2">
          Quitar
        </button>
      </div>
    </div>
  );
}
