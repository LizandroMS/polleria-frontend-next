'use client';

import { EmptyState } from '@/components/shared/empty-state';
import { PageHeader } from '@/components/shared/page-header';
import { OrderCard } from '@/components/orders/order-card';
import { useMyOrders } from '@/features/orders/hooks/use-my-orders';
import { useAuth } from '@/hooks/use-auth';
import { useRealtimeMyOrders } from '@/hooks/use-realtime-my-orders';

export default function MyOrdersPage() {
  const { token } = useAuth();
  const { data = [], isLoading } = useMyOrders(token);

  useRealtimeMyOrders();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <PageHeader title="Mis pedidos" description="Aquí verás el historial de tus compras." />

      {isLoading ? (
        <div>Cargando pedidos...</div>
      ) : !data.length ? (
        <EmptyState title="Aún no tienes pedidos" />
      ) : (
        <div className="space-y-4">
          {data.map((order: any) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}