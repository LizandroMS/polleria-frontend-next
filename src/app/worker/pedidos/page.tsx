'use client';

import { EmptyState } from '@/components/shared/empty-state';
import { PageHeader } from '@/components/shared/page-header';
import { WorkerOrderCard } from '@/components/worker/worker-order-card';
import { useChangeOrderStatus } from '@/features/orders/hooks/use-change-order-status';
import { useWorkerOrders } from '@/features/orders/hooks/use-worker-orders';
import { useMyBranches } from '@/features/workers/hooks/use-my-branches';
import { useAuth } from '@/hooks/use-auth';
import { useRealtimeWorkerOrders } from '@/hooks/use-realtime-worker-orders';
import { useState } from 'react';
import { RequireWorker } from '@/components/auth/require-worker';

export default function WorkerOrdersPage() {
  const { token } = useAuth();
  const [statusFilter, setStatusFilter] = useState<string>('');

  const { data: myBranches = [] } = useMyBranches(token);
  const { data = [], isLoading, refetch } = useWorkerOrders(token, statusFilter || undefined);
  const changeStatusMutation = useChangeOrderStatus(token);

  useRealtimeWorkerOrders(myBranches.map((branch: any) => branch.branch_id));

  const handleChangeStatus = async (orderId: string, status: string, comment?: string) => {
    await changeStatusMutation.mutateAsync({ orderId, status, comment });
    await refetch();
  };

  return (
  <RequireWorker>
    <div className="mx-auto max-w-7xl px-4 py-8">
      <PageHeader
        title="Pedidos operativos"
        description="Gestiona los pedidos de tu sucursal."
      />

      <div className="mb-6">
        <select
          className="rounded-xl border bg-white px-4 py-3"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">Todos</option>
          <option value="PENDING">PENDING</option>
          <option value="CONFIRMED">CONFIRMED</option>
          <option value="PREPARING">PREPARING</option>
          <option value="READY">READY</option>
          <option value="OUT_FOR_DELIVERY">OUT_FOR_DELIVERY</option>
          <option value="DELIVERED">DELIVERED</option>
          <option value="CANCELLED">CANCELLED</option>
        </select>
      </div>

      {isLoading ? (
        <div>Cargando pedidos...</div>
      ) : !data.length ? (
        <EmptyState title="No hay pedidos para mostrar" />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {data.map((order: any) => (
            <WorkerOrderCard
              key={order.id}
              order={order}
              onChangeStatus={handleChangeStatus}
            />
          ))}
        </div>
      )}
    </div>
  </RequireWorker>
);
}