'use client';

import { OrderDetail } from '@/components/orders/order-detail';
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
    return <div className="mx-auto max-w-7xl px-4 py-8">Cargando detalle...</div>;
  }

  if (error || !data) {
    return <div className="mx-auto max-w-7xl px-4 py-8">No se pudo cargar el pedido.</div>;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <OrderDetail data={data} />
    </div>
  );
}