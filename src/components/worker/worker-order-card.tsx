'use client';

import { OrderStatusForm } from './order-status-form';

type Props = {
  order: any;
  onChangeStatus: (orderId: string, status: string, comment?: string) => Promise<void>;
};

export function WorkerOrderCard({ order, onChangeStatus }: Props) {
  return (
    <article className="soft-card p-6 transition hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <div
            className="mb-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold"
            style={{ background: '#f9e8db', color: 'var(--primary)' }}
          >
            Pedido operativo
          </div>

          <h3 className="text-xl font-extrabold" style={{ color: 'var(--dark)' }}>
            {order.order_number}
          </h3>

          <div className="mt-3 space-y-1 text-sm" style={{ color: 'var(--text-soft)' }}>
            <p>
              <span className="font-semibold" style={{ color: 'var(--text-main)' }}>
                Cliente:
              </span>{' '}
              {order.customer_name_snapshot}
            </p>
            <p>
              <span className="font-semibold" style={{ color: 'var(--text-main)' }}>
                Sucursal:
              </span>{' '}
              {order.branch_name}
            </p>
            <p>
              <span className="font-semibold" style={{ color: 'var(--text-main)' }}>
                Estado:
              </span>{' '}
              {order.status}
            </p>
            <p>
              <span className="font-semibold" style={{ color: 'var(--text-main)' }}>
                Tipo:
              </span>{' '}
              {order.order_type}
            </p>
            <p>
              <span className="font-semibold" style={{ color: 'var(--text-main)' }}>
                Total:
              </span>{' '}
              S/ {order.total}
            </p>
          </div>
        </div>
      </div>

      <div
        className="rounded-[24px] border p-4"
        style={{ borderColor: 'var(--border-soft)', background: '#fffdfb' }}
      >
        <p className="mb-3 text-sm font-semibold" style={{ color: 'var(--dark)' }}>
          Actualizar estado
        </p>

        <OrderStatusForm
          currentStatus={order.status}
          onSubmit={(status, comment) => onChangeStatus(order.id, status, comment)}
        />
      </div>
    </article>
  );
}