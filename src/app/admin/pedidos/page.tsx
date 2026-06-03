'use client';

import { SimpleAdminTable } from '@/components/admin/simple-admin-table';
import { useAdminOrders } from '@/features/admin/hooks/use-admin-orders';
import { useEmitDocument } from '@/features/admin/hooks/use-emit-document';
import { useAuth } from '@/hooks/use-auth';
import { useRealtimeAdminOrders } from '@/hooks/use-realtime-admin-orders';
import { useState } from 'react';

const statusOptions = [
  { value: '', label: 'Todos los estados' },
  { value: 'PENDING', label: 'Pendiente' },
  { value: 'CONFIRMED', label: 'Confirmado' },
  { value: 'PREPARING', label: 'Preparando' },
  { value: 'READY', label: 'Listo' },
  { value: 'OUT_FOR_DELIVERY', label: 'En reparto' },
  { value: 'DELIVERED', label: 'Entregado' },
  { value: 'CANCELLED', label: 'Cancelado' },
];

export default function AdminOrdersPage() {
  const { token } = useAuth();
  const [status, setStatus] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);

  const { data = [], isLoading, refetch } = useAdminOrders(token, status || undefined);
  const emitMutation = useEmitDocument(token);

  useRealtimeAdminOrders();

  const handleEmitDocument = async (orderId: string) => {
    setFeedback(null);

    try {
      await emitMutation.mutateAsync(orderId);
      setFeedback('Se solicitó la emisión del comprobante correctamente.');
      await refetch();
    } catch (error) {
      setFeedback((error as Error).message || 'No se pudo emitir el comprobante.');
    }
  };

  return (
    <div className="space-y-6">
      <section className="page-hero">
        <p className="section-subtitle">Operación</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight" style={{ color: 'var(--dark)' }}>
          Gestión de pedidos
        </h1>
        <p className="section-description">
          Monitorea pedidos en tiempo real, filtra por estado y emite comprobantes cuando corresponda.
        </p>
      </section>

      <section className="soft-card p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="section-subtitle">Filtro</p>
            <h2 className="mt-2 text-2xl font-extrabold" style={{ color: 'var(--dark)' }}>
              Pedidos registrados
            </h2>
          </div>

          <select className="input-soft max-w-xs" value={status} onChange={(e) => setStatus(e.target.value)}>
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </section>

      {feedback ? (
        <div className="rounded-[24px] border px-5 py-4 text-sm" style={{ background: 'var(--accent-soft)', borderColor: 'var(--border-soft)', color: 'var(--warning)' }}>
          {feedback}
        </div>
      ) : null}

      {isLoading ? (
        <div className="loading-panel">Cargando pedidos...</div>
      ) : (
        <SimpleAdminTable
          rows={data}
          columns={[
            { key: 'order', title: 'Pedido', render: (row: any) => <span className="font-bold">{row.order_number}</span> },
            { key: 'client', title: 'Cliente', render: (row: any) => row.customer_name_snapshot },
            { key: 'branch', title: 'Sucursal', render: (row: any) => row.branch_name },
            { key: 'status', title: 'Estado', render: (row: any) => <span className="status-pill">{row.status}</span> },
            { key: 'invoiceType', title: 'Comprobante', render: (row: any) => row.invoice_type },
            {
              key: 'invoiceEmissionStatus',
              title: 'Estado emisión',
              render: (row: any) => row.invoice_emission_status ?? 'NO DISPONIBLE',
            },
            { key: 'total', title: 'Total', render: (row: any) => <span className="font-bold">S/ {row.total}</span> },
            {
              key: 'actions',
              title: 'Acciones',
              render: (row: any) => {
                const canEmit =
                  row.status === 'DELIVERED' &&
                  row.invoice_type !== 'NONE' &&
                  (row.invoice_emission_status === 'PENDING' ||
                    row.invoice_emission_status === 'FAILED' ||
                    !row.invoice_emission_status);

                return canEmit ? (
                  <button type="button" className="btn-primary px-4 py-2 text-xs" disabled={emitMutation.isPending} onClick={() => handleEmitDocument(row.id)}>
                    {emitMutation.isPending ? 'Emitiendo...' : 'Emitir comprobante'}
                  </button>
                ) : (
                  <span className="text-xs" style={{ color: 'var(--text-soft)' }}>Sin acción</span>
                );
              },
            },
          ]}
        />
      )}
    </div>
  );
}
