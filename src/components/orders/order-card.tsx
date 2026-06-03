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
    <article className="soft-card interactive-card p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <span className="status-pill">{order.status}</span>
          <h3 className="mt-3 text-xl font-extrabold" style={{ color: 'var(--dark)' }}>
            {order.order_number}
          </h3>
          <p className="mt-2 text-sm" style={{ color: 'var(--text-soft)' }}>
            Total: <span className="font-bold" style={{ color: 'var(--dark)' }}>S/ {order.total}</span>
          </p>
        </div>

        <Link href={`/profile/pedidos/${order.id}`} className="btn-secondary px-4 py-2">
          Ver detalle
        </Link>
      </div>
    </article>
  );
}
