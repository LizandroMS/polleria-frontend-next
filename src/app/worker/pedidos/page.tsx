'use client';

import { EmptyState } from '@/components/shared/empty-state';
import { WorkerOrderCard } from '@/components/worker/worker-order-card';
import { useChangeOrderStatus } from '@/features/orders/hooks/use-change-order-status';
import { useWorkerOrders } from '@/features/orders/hooks/use-worker-orders';
import { useWorkerOrderSound } from '@/features/workers/hooks/use-worker-order-sound';
import { useMyBranches } from '@/features/workers/hooks/use-my-branches';
import { useAuth } from '@/hooks/use-auth';
import { useRealtimeWorkerOrders } from '@/hooks/use-realtime-worker-orders';
import { useCallback, useState } from 'react';

export default function WorkerOrdersPage() {
  const { token } = useAuth();
  const [statusFilter, setStatusFilter] = useState<string>('');

  const { data: rawMyBranches = [] } = useMyBranches(token);
  const { data: rawData = [], isLoading, refetch } = useWorkerOrders(token, statusFilter || undefined);
  const myBranches = Array.isArray(rawMyBranches) ? rawMyBranches : [];
  const data = Array.isArray(rawData) ? rawData : [];
  const changeStatusMutation = useChangeOrderStatus(token);
  const {
    enabled: soundEnabled,
    supported: soundSupported,
    enableSound,
    disableSound,
    playNewOrderSound,
  } = useWorkerOrderSound();

  const handleNewOrder = useCallback(() => {
    void playNewOrderSound();
  }, [playNewOrderSound]);

  useRealtimeWorkerOrders(myBranches.map((branch: any) => branch.branch_id), {
    onNewOrder: handleNewOrder,
  });

  const handleChangeStatus = async (orderId: string, status: string, comment?: string) => {
    await changeStatusMutation.mutateAsync({ orderId, status, comment });
    await refetch();
  };

  return (
    <div className="space-y-8">
      <section
        className="rounded-[32px] px-6 py-10 md:px-10"
        style={{
          background: 'linear-gradient(135deg, #f7ede3 0%, #fff7ef 100%)',
          border: '1px solid var(--border-soft)',
        }}
      >
        <p className="section-subtitle">Operación diaria</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight" style={{ color: 'var(--dark)' }}>
          Gestión de pedidos
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-7" style={{ color: 'var(--text-soft)' }}>
          Revisa los pedidos asignados a tu sucursal, cambia estados y mantén el flujo operativo al día.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="soft-card p-5">
          <p className="text-sm font-medium" style={{ color: 'var(--text-soft)' }}>
            Sucursales asignadas
          </p>
          <p className="mt-2 text-3xl font-extrabold" style={{ color: 'var(--dark)' }}>
            {myBranches.length}
          </p>
        </div>

        <div className="soft-card p-5">
          <p className="text-sm font-medium" style={{ color: 'var(--text-soft)' }}>
            Pedidos visibles
          </p>
          <p className="mt-2 text-3xl font-extrabold" style={{ color: 'var(--dark)' }}>
            {data.length}
          </p>
        </div>

        <div className="soft-card p-5">
          <p className="text-sm font-medium" style={{ color: 'var(--text-soft)' }}>
            Filtro actual
          </p>
          <p className="mt-2 text-lg font-bold" style={{ color: 'var(--dark)' }}>
            {statusFilter || 'Todos'}
          </p>
        </div>
      </section>

      <section className="soft-card p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="section-subtitle">Alertas</p>
            <h2 className="mt-2 text-2xl font-extrabold" style={{ color: 'var(--dark)' }}>
              Sonido de nuevos pedidos
            </h2>
            <p className="mt-2 text-sm" style={{ color: 'var(--text-soft)' }}>
              Activa el sonido para que el panel avise cada vez que llegue un pedido nuevo.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span
              className="rounded-full px-3 py-1 text-xs font-semibold"
              style={{
                background: soundEnabled ? '#dcfce7' : '#f3f4f6',
                color: soundEnabled ? '#166534' : 'var(--text-soft)',
              }}
            >
              {soundEnabled ? 'Sonido activado' : 'Sonido desactivado'}
            </span>

            {soundEnabled ? (
              <button type="button" className="btn-secondary" onClick={disableSound}>
                Desactivar sonido
              </button>
            ) : (
              <button
                type="button"
                className="btn-primary disabled:opacity-50"
                onClick={() => void enableSound()}
                disabled={!soundSupported}
              >
                Activar sonido
              </button>
            )}
          </div>
        </div>

        {!soundSupported ? (
          <p className="mt-3 text-sm text-red-600">
            Este navegador no soporta la reproducción de alertas de audio.
          </p>
        ) : null}
      </section>

      <section className="soft-card p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="section-subtitle">Pedidos</p>
            <h2 className="mt-2 text-2xl font-extrabold" style={{ color: 'var(--dark)' }}>
              Lista operativa
            </h2>
          </div>

          <select
            className="input-soft max-w-xs"
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
      </section>

      {isLoading ? (
        <div className="soft-card p-8 text-sm" style={{ color: 'var(--text-soft)' }}>
          Cargando pedidos...
        </div>
      ) : !data.length ? (
        <EmptyState title="No hay pedidos para mostrar" />
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
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
  );
}