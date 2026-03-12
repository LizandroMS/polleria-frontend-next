'use client';

import { BranchForm } from '@/components/admin/branch-form';
import { SimpleAdminTable } from '@/components/admin/simple-admin-table';
import { useAdminBranches } from '@/features/admin/hooks/use-admin-branches';
import { useCreateBranch } from '@/features/admin/hooks/use-create-branch';
import { useToggleBranch } from '@/features/admin/hooks/use-toggle-branch';
import { useUpdateBranch } from '@/features/admin/hooks/use-update-branch';
import { useAuth } from '@/hooks/use-auth';
import { useState } from 'react';

export default function AdminBranchesPage() {
  const { token } = useAuth();
  const [editingBranch, setEditingBranch] = useState<any | null>(null);

  const { data = [] } = useAdminBranches(token);
  const createMutation = useCreateBranch(token);
  const updateMutation = useUpdateBranch(token);
  const toggleMutation = useToggleBranch(token);

  const handleSubmit = async (payload: any) => {
    if (editingBranch) {
      await updateMutation.mutateAsync({
        id: editingBranch.id,
        payload,
      });
      setEditingBranch(null);
      return;
    }

    await createMutation.mutateAsync(payload);
  };

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
          Gestión de sucursales
        </h1>
        <p className="mt-2 text-sm" style={{ color: 'var(--text-soft)' }}>
          Administra direcciones, teléfonos y estado operativo de las sedes.
        </p>
      </div>

      <BranchForm
        initialData={editingBranch}
        onSubmit={handleSubmit}
        onCancelEdit={() => setEditingBranch(null)}
      />

      <SimpleAdminTable
        rows={data}
        columns={[
          { key: 'name', title: 'Nombre', render: (row: any) => row.name },
          { key: 'district', title: 'Distrito', render: (row: any) => row.district ?? '-' },
          { key: 'address', title: 'Dirección', render: (row: any) => row.address },
          { key: 'phone', title: 'Teléfono', render: (row: any) => row.phone ?? '-' },
          { key: 'active', title: 'Activo', render: (row: any) => (row.is_active ? 'Sí' : 'No') },
          {
            key: 'actions',
            title: 'Acciones',
            render: (row: any) => (
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setEditingBranch(row)}
                  className="btn-secondary"
                >
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
    </div>
  );
}