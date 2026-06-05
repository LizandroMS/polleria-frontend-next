import { formatCurrency } from '@/lib/utils/currency';

type Props = {
  subtotal: number;
  totalItems: number;
};

export function CartSummary({ subtotal, totalItems }: Props) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <h3 className="text-lg font-semibold">Resumen</h3>

      <div className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Productos</span>
          <span>{totalItems}</span>
        </div>

        <div className="flex justify-between font-semibold">
          <span>Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
      </div>
    </div>
  );
}