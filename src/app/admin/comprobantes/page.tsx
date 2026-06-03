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

  return (
    <div className="space-y-6">
      <section className="page-hero">
        <p className="section-subtitle">Facturación</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight" style={{ color: 'var(--dark)' }}>
          Comprobantes electrónicos
        </h1>
        <p className="section-description">
          Consulta documentos emitidos, revisa su estado y ejecuta acciones administrativas de facturación.
        </p>
      </section>

      {isLoading ? (
        <div className="loading-panel">Cargando comprobantes...</div>
      ) : (
        <SimpleAdminTable
          rows={data}
          columns={[
            { key: 'order', title: 'Pedido', render: (row: any) => <span className="font-bold">{row.order_number}</span> },
            { key: 'client', title: 'Cliente', render: (row: any) => row.customer_name_snapshot },
            { key: 'type', title: 'Tipo', render: (row: any) => row.document_type },
            { key: 'serie', title: 'Serie', render: (row: any) => row.series },
            { key: 'correlative', title: 'Número', render: (row: any) => row.correlative },
            { key: 'status', title: 'Estado', render: (row: any) => <span className="status-pill">{row.external_status}</span> },
            {
              key: 'actions',
              title: 'Acciones',
              render: (row: any) => (
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => statusMutation.mutate(row.order_id)} className="btn-secondary px-4 py-2 text-xs">
                    Consultar
                  </button>

                  {row.external_status === 'FAILED' ? (
                    <button onClick={() => retryMutation.mutate(row.order_id)} className="btn-primary px-4 py-2 text-xs">
                      Reintentar
                    </button>
                  ) : null}

                  <button
                    onClick={() => voidMutation.mutate({ orderId: row.order_id, reason: 'ANULACIÓN DE OPERACIÓN' })}
                    className="btn-danger px-4 py-2 text-xs"
                  >
                    Anular
                  </button>
                </div>
              ),
            },
          ]}
        />
      )}
    </div>
  );
}
