'use client';

import { SimpleAdminTable } from '@/components/admin/simple-admin-table';
import { useAdminDocuments } from '@/features/admin/hooks/use-admin-documents';
import { useQueryDocumentStatus } from '@/features/admin/hooks/use-query-document-status';
import { useRetryDocument } from '@/features/admin/hooks/use-retry-document';
import { useVoidDocument } from '@/features/admin/hooks/use-void-document';
import { useAuth } from '@/hooks/use-auth';

export default function AdminDocumentsPage() {
  const { token } = useAuth();

  const { data = [], isLoading } = useAdminDocuments(token);
  const retryMutation = useRetryDocument(token);
  const statusMutation = useQueryDocumentStatus(token);
  const voidMutation = useVoidDocument(token);

  if (isLoading) {
    return <div>Cargando comprobantes...</div>;
  }

  return (
    <SimpleAdminTable
      rows={data}
      columns={[
        { key: 'order', title: 'Pedido', render: (row: any) => row.order_number },
        { key: 'client', title: 'Cliente', render: (row: any) => row.customer_name_snapshot },
        { key: 'type', title: 'Tipo', render: (row: any) => row.document_type },
        { key: 'serie', title: 'Serie', render: (row: any) => row.series },
        { key: 'correlative', title: 'Número', render: (row: any) => row.correlative },
        { key: 'status', title: 'Estado', render: (row: any) => row.external_status },
        {
          key: 'actions',
          title: 'Acciones',
          render: (row: any) => (
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => statusMutation.mutate(row.order_id)}
                className="rounded-xl border px-3 py-2 text-xs"
              >
                Consultar estado
              </button>

              {row.external_status === 'FAILED' ? (
                <button
                  onClick={() => retryMutation.mutate(row.order_id)}
                  className="rounded-xl border px-3 py-2 text-xs"
                >
                  Reintentar
                </button>
              ) : null}

              <button
                onClick={() =>
                  voidMutation.mutate({
                    orderId: row.order_id,
                    reason: 'ANULACIÓN DE OPERACIÓN',
                  })
                }
                className="rounded-xl border px-3 py-2 text-xs"
              >
                Anular
              </button>
            </div>
          ),
        },
      ]}
    />
  );
}