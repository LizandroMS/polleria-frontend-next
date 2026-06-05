'use client';

import { DocumentSeriesForm } from '@/components/admin/document-series-form';
import { SimpleAdminTable } from '@/components/admin/simple-admin-table';
import { useAdminBranches } from '@/features/admin/hooks/use-admin-branches';
import { useAdminDocumentSeries } from '@/features/admin/hooks/use-admin-document-series';
import { useCreateDocumentSeries } from '@/features/admin/hooks/use-create-document-series';
import { useToggleDocumentSeries } from '@/features/admin/hooks/use-toggle-document-series';
import { useUpdateDocumentSeries } from '@/features/admin/hooks/use-update-document-series';
import { useAuth } from '@/hooks/use-auth';
import { useState } from 'react';

const documentTypeLabels: Record<string, string> = {
  BOLETA_SIMPLE: 'Boleta simple',
  FACTURA: 'Factura',
};

export default function AdminDocumentSeriesPage() {
  const { token } = useAuth();
  const [editingSeries, setEditingSeries] = useState<any | null>(null);

  const { data: branches = [], isLoading: loadingBranches } = useAdminBranches(token);
  const { data: series = [], isLoading: loadingSeries } = useAdminDocumentSeries(token);

  const createMutation = useCreateDocumentSeries(token);
  const updateMutation = useUpdateDocumentSeries(token);
  const toggleMutation = useToggleDocumentSeries(token);

  const handleSubmit = async (payload: any) => {
    if (editingSeries) {
      await updateMutation.mutateAsync({
        id: editingSeries.id,
        payload,
      });
      setEditingSeries(null);
      return;
    }

    await createMutation.mutateAsync(payload);
  };

  const isLoading = loadingBranches || loadingSeries;

  return (
    <div className="space-y-6">
      <div
        className="rounded-[32px] px-6 py-8 md:px-10"
        style={{
          background: 'linear-gradient(135deg, #f7ede3 0%, #fff7ef 100%)',
          border: '1px solid var(--border-soft)',
        }}
      >
        <p className="section-subtitle">Administración</p>
        <h1 className="mt-2 text-3xl font-extrabold" style={{ color: 'var(--dark)' }}>
          Series de comprobantes
        </h1>
        <p className="mt-2 text-sm" style={{ color: 'var(--text-soft)' }}>
          {/* Nota para mí: si falta una serie activa, APISUNAT no se ejecuta porque el backend no puede calcular serie/correlativo. */}
          Configura la serie activa de boletas y facturas por sucursal para habilitar la emisión electrónica.
        </p>
      </div>

      <DocumentSeriesForm
        branches={branches}
        initialData={editingSeries}
        onSubmit={handleSubmit}
        onCancelEdit={() => setEditingSeries(null)}
      />

      {isLoading ? (
        <div className="soft-card p-6 text-sm" style={{ color: 'var(--text-soft)' }}>
          Cargando series de comprobantes...
        </div>
      ) : (
        <SimpleAdminTable
          rows={series}
          columns={[
            {
              key: 'branch',
              title: 'Sucursal',
              render: (row: any) => row.branch_name ?? row.branch_id,
            },
            {
              key: 'type',
              title: 'Tipo',
              render: (row: any) => documentTypeLabels[row.document_type] ?? row.document_type,
            },
            { key: 'series', title: 'Serie', render: (row: any) => row.series },
            {
              key: 'currentNumber',
              title: 'Correlativo actual',
              render: (row: any) => row.current_number,
            },
            {
              key: 'nextNumber',
              title: 'Siguiente número',
              render: (row: any) => Number(row.current_number ?? 0) + 1,
            },
            {
              key: 'active',
              title: 'Activo',
              render: (row: any) => (row.is_active ? 'Sí' : 'No'),
            },
            {
              key: 'actions',
              title: 'Acciones',
              render: (row: any) => (
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => setEditingSeries(row)} className="btn-secondary">
                    Editar
                  </button>
                  <button
                    onClick={() => toggleMutation.mutate(row.id)}
                    className="btn-secondary"
                  >
                    {row.is_active ? 'Desactivar' : 'Activar'}
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
