import { formatCurrency } from '@/lib/utils/currency';

type Props = {
  subtotal: number;
  totalItems: number;
};

export function CartSummary({ subtotal, totalItems }: Props) {
  return (
    <div className="soft-card sticky top-24 p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="section-subtitle">Pedido</p>
          <h3 className="mt-2 text-2xl font-extrabold" style={{ color: 'var(--dark)' }}>
            Resumen
          </h3>
        </div>
        <div
          className="flex h-12 w-12 items-center justify-center rounded-2xl text-xl"
          style={{ background: 'var(--primary-soft)' }}
        >
          🛒
        </div>
      </div>

      <div className="mt-6 space-y-3 text-sm">
        <div className="flex justify-between" style={{ color: 'var(--text-soft)' }}>
          <span>Productos</span>
          <span className="font-bold" style={{ color: 'var(--dark)' }}>{totalItems}</span>
        </div>

        <div className="flex justify-between border-t pt-4 text-lg font-black" style={{ borderColor: 'var(--border-soft)', color: 'var(--dark)' }}>
          <span>Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
      </div>

      <p className="mt-4 rounded-2xl px-4 py-3 text-xs leading-5" style={{ background: 'var(--accent-soft)', color: 'var(--warning)' }}>
        El costo de delivery o ajustes finales se confirmarán según la sucursal y disponibilidad.
      </p>
    </div>
  );
}
