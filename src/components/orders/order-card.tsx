import Link from 'next/link';

type Props = {
  order: {
    id: string;
    order_number: string;
    status: string;
    total: string;
    created_at: string;
  };
};

export function OrderCard({ order }: Props) {
  return (
    <article className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">{order.order_number}</h3>
          <p className="mt-1 text-sm text-gray-600">Estado: {order.status}</p>
          <p className="mt-1 text-sm text-gray-600">Total: S/ {order.total}</p>
        </div>

        <Link href={`/profile/pedidos/${order.id}`} className="rounded-xl border px-4 py-2 text-sm">
          Ver detalle
        </Link>
      </div>
    </article>
  );
}