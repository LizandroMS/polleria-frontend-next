'use client';

import { OrderStatusForm } from './order-status-form';

type Props = {
  order: any;
  onChangeStatus: (orderId: string, status: string, comment?: string) => Promise<void>;
};

export function WorkerOrderCard({ order, onChangeStatus }: Props) {
  return (
    <article className="soft-card interactive-card p-6">
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="mb-3 flex flex-wrap gap-2">
            <span className="status-pill">Pedido operativo</span>
            <span className="status-pill" style={{ background: '#eefdf3', color: 'var(--success)' }}>
              {order.status}
            </span>
          </div>

          <h3 className="text-2xl font-black" style={{ color: 'var(--dark)' }}>
            {order.order_number}
          </h3>

          <div className="mt-4 grid gap-2 text-sm" style={{ color: 'var(--text-soft)' }}>
            <p><span className="font-bold" style={{ color: 'var(--text-main)' }}>Cliente:</span> {order.customer_name_snapshot}</p>
            <p><span className="font-bold" style={{ color: 'var(--text-main)' }}>Sucursal:</span> {order.branch_name}</p>
            <p><span className="font-bold" style={{ color: 'var(--text-main)' }}>Tipo:</span> {order.order_type}</p>
            <p><span className="font-bold" style={{ color: 'var(--text-main)' }}>Total:</span> S/ {order.total}</p>
          </div>
        </div>
      </div>

      <div className="rounded-[24px] border p-4" style={{ borderColor: 'var(--border-soft)', background: 'linear-gradient(135deg, #fffdf9, #fff7ef)' }}>
        <p className="mb-3 text-sm font-extrabold" style={{ color: 'var(--dark)' }}>
          Actualizar estado del pedido
        </p>

        <OrderStatusForm currentStatus={order.status} onSubmit={(status, comment) => onChangeStatus(order.id, status, comment)} />
      </div>
    </article>
  );
}
