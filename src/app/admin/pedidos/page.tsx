'use client';

import { SimpleAdminTable } from '@/components/admin/simple-admin-table';
import { useAdminOrders } from '@/features/admin/hooks/use-admin-orders';
import { useEmitDocument } from '@/features/admin/hooks/use-emit-document';
import { useAuth } from '@/hooks/use-auth';
import { useRealtimeAdminOrders } from '@/hooks/use-realtime-admin-orders';
import { useState } from 'react';

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
      <div className="rounded-2xl border bg-white p-4">
        <select
          className="rounded-xl border px-4 py-3"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
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

      {feedback ? (
        <div className="rounded-2xl border bg-white p-4 text-sm text-gray-700">
          {feedback}
        </div>
      ) : null}

      {isLoading ? (
        <div>Cargando pedidos...</div>
      ) : (
        <SimpleAdminTable
          rows={data}
          columns={[
            { key: 'order', title: 'Pedido', render: (row: any) => row.order_number },
            { key: 'client', title: 'Cliente', render: (row: any) => row.customer_name_snapshot },
            { key: 'branch', title: 'Sucursal', render: (row: any) => row.branch_name },
            { key: 'status', title: 'Estado', render: (row: any) => row.status },
            { key: 'invoiceType', title: 'Comprobante', render: (row: any) => row.invoice_type },
            {
              key: 'invoiceEmissionStatus',
              title: 'Estado emisión',
              render: (row: any) => row.invoice_emission_status ?? 'NO DISPONIBLE',
            },
            { key: 'total', title: 'Total', render: (row: any) => `S/ ${row.total}` },
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
                  <button
                    type="button"
                    className="rounded-xl border px-3 py-2 text-xs disabled:opacity-50"
                    disabled={emitMutation.isPending}
                    onClick={() => handleEmitDocument(row.id)}
                  >
                    {emitMutation.isPending ? 'Emitiendo...' : 'Emitir comprobante'}
                  </button>
                ) : (
                  <span className="text-xs text-gray-500">Sin acción</span>
                );
              },
            },
          ]}
        />
      )}
    </div>
  );
}
