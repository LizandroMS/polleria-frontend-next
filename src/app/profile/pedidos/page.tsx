'use client';

import { EmptyState } from '@/components/shared/empty-state';
import { PageHeader } from '@/components/shared/page-header';
import { useMyOrders } from '@/features/orders/hooks/use-my-orders';
import { useAuth } from '@/hooks/use-auth';
import Link from 'next/link';

function statusLabel(status: string) {
  switch (status) {
    case 'PENDING':
      return 'Pendiente';
    case 'CONFIRMED':
      return 'Confirmado';
    case 'PREPARING':
      return 'En preparación';
    case 'READY':
      return 'Listo';
    case 'OUT_FOR_DELIVERY':
      return 'En camino';
    case 'DELIVERED':
      return 'Entregado';
    case 'CANCELLED':
      return 'Cancelado';
    default:
      return status;
  }
}

export default function MyOrdersPage() {
  const { token } = useAuth();
  const { data = [], isLoading } = useMyOrders(token);

  return (
    <div className="space-y-8">
      <section
        className="rounded-[32px] px-6 py-10 md:px-10"
        style={{
          background: 'linear-gradient(135deg, #f7ede3 0%, #fff7ef 100%)',
          border: '1px solid var(--border-soft)',
        }}
      >
        <PageHeader
          title="Mis pedidos"
          description="Revisa el historial y el estado actual de todos tus pedidos."
        />
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="soft-card p-5">
          <p className="text-sm font-medium" style={{ color: 'var(--text-soft)' }}>
            Total de pedidos
          </p>
          <p className="mt-2 text-3xl font-extrabold" style={{ color: 'var(--dark)' }}>
            {data.length}
          </p>
        </div>

        <div className="soft-card p-5">
          <p className="text-sm font-medium" style={{ color: 'var(--text-soft)' }}>
            Última actividad
          </p>
          <p className="mt-2 text-lg font-bold" style={{ color: 'var(--dark)' }}>
            {data[0]?.status ? statusLabel(data[0].status) : 'Sin pedidos'}
          </p>
        </div>

        <div className="soft-card p-5">
          <p className="text-sm font-medium" style={{ color: 'var(--text-soft)' }}>
            Seguimiento
          </p>
          <p className="mt-2 text-lg font-bold" style={{ color: 'var(--dark)' }}>
            En tiempo real
          </p>
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="section-subtitle">Historial</p>
            <h2 className="mt-2 text-2xl font-extrabold" style={{ color: 'var(--dark)' }}>
              Pedidos registrados
            </h2>
          </div>
        </div>

        {isLoading ? (
          <div className="soft-card p-8 text-sm" style={{ color: 'var(--text-soft)' }}>
            Cargando pedidos...
          </div>
        ) : !data.length ? (
          <EmptyState title="Aún no tienes pedidos registrados" />
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {data.map((order: any) => (
              <article
                key={order.id}
                className="soft-card overflow-hidden p-6 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div>
                    <div
                      className="mb-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold"
                      style={{ background: '#f9e8db', color: 'var(--primary)' }}
                    >
                      Pedido
                    </div>

                    <h3 className="text-xl font-extrabold" style={{ color: 'var(--dark)' }}>
                      {order.order_number}
                    </h3>
                  </div>

                  <span
                    className="rounded-full px-3 py-2 text-xs font-semibold text-white"
                    style={{ background: 'var(--primary)' }}
                  >
                    {statusLabel(order.status)}
                  </span>
                </div>

                <div className="space-y-2 text-sm" style={{ color: 'var(--text-soft)' }}>
                  <p>
                    <span className="font-semibold" style={{ color: 'var(--text-main)' }}>
                      Tipo:
                    </span>{' '}
                    {order.order_type}
                  </p>
                  <p>
                    <span className="font-semibold" style={{ color: 'var(--text-main)' }}>
                      Pago:
                    </span>{' '}
                    {order.payment_method}
                  </p>
                  <p>
                    <span className="font-semibold" style={{ color: 'var(--text-main)' }}>
                      Total:
                    </span>{' '}
                    S/ {order.total}
                  </p>
                </div>

                <div className="mt-5">
                  <Link href={`/profile/pedidos/${order.id}`} className="btn-primary">
                    Ver detalle
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}