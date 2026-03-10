'use client';

import { OrderStatusForm } from './order-status-form';

type Props = {
  order: any;
  onChangeStatus: (orderId: string, status: string, comment?: string) => Promise<void>;
};

export function WorkerOrderCard({ order, onChangeStatus }: Props) {
  return (
    <article className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">{order.order_number}</h3>
        <p className="text-sm text-gray-600">Cliente: {order.customer_name_snapshot}</p>
        <p className="text-sm text-gray-600">Sucursal: {order.branch_name}</p>
        <p className="text-sm text-gray-600">Estado actual: {order.status}</p>
      </div>

      <OrderStatusForm
        currentStatus={order.status}
        onSubmit={(status, comment) => onChangeStatus(order.id, status, comment)}
      />
    </article>
  );
}