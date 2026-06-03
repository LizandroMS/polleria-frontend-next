'use client';

import { OrderDetail } from '@/components/orders/order-detail';
import { EmptyState } from '@/components/shared/empty-state';
import { useOrderById } from '@/features/orders/hooks/use-order-by-id';
import { useAuth } from '@/hooks/use-auth';
import { useRealtimeOrderDetail } from '@/hooks/use-realtime-order-detail';
import { useParams } from 'next/navigation';

export default function MyOrderDetailPage() {
  const params = useParams<{ id: string }>();
  const { token } = useAuth();
  const { data, isLoading, error } = useOrderById(params.id, token);

  useRealtimeOrderDetail(params.id);

  if (isLoading) {
    return <div className="loading-panel">Cargando detalle del pedido...</div>;
  }

  if (error || !data) {
    return <EmptyState title="No se pudo cargar el pedido" description="Intenta nuevamente o revisa tu conexión." />;
  }

  return <OrderDetail data={data} />;
}
