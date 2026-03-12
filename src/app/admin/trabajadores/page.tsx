'use client';

import { SimpleAdminTable } from '@/components/admin/simple-admin-table';
import { WorkerForm } from '@/components/admin/worker-form';
import { useAdminBranches } from '@/features/admin/hooks/use-admin-branches';
import { useAdminWorkers } from '@/features/admin/hooks/use-admin-workers';
import { useAssignWorkerBranch } from '@/features/admin/hooks/use-assign-worker-branch';
import { useCreateWorker } from '@/features/admin/hooks/use-create-worker';
import { useToggleUser } from '@/features/admin/hooks/use-toggle-user';
import { useUnassignWorkerBranch } from '@/features/admin/hooks/use-unassign-worker-branch';
import { useUpdateWorker } from '@/features/admin/hooks/use-update-worker';
import { useWorkerAssignments } from '@/features/admin/hooks/use-worker-assignments';
import { useAuth } from '@/hooks/use-auth';
import { useState } from 'react';

export default function AdminWorkersPage() {
  const { token } = useAuth();
  const [editingWorker, setEditingWorker] = useState<any | null>(null);

  const { data: workers = [] } = useAdminWorkers(token);
  const { data: branches = [] } = useAdminBranches(token);
  const { data: assignments = [] } = useWorkerAssignments(token);

  const createWorkerMutation = useCreateWorker(token);
  const updateWorkerMutation = useUpdateWorker(token);
  const assignMutation = useAssignWorkerBranch(token);
  const toggleUserMutation = useToggleUser(token);
  const unassignMutation = useUnassignWorkerBranch(token);

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
          Gestión de trabajadores
        </h1>
        <p className="mt-2 text-sm" style={{ color: 'var(--text-soft)' }}>
          Registra personal, actualiza sus datos y asigna sucursales operativas.
        </p>
      </div>

      <WorkerForm
        workers={workers}
        branches={branches}
        initialData={editingWorker}
        onCreateWorker={async (payload) => { await createWorkerMutation.mutateAsync(payload); }}
        onUpdateWorker={async (payload) => { await updateWorkerMutation.mutateAsync({
            id: editingWorker.id,
            payload,
          }); }}
        onAssign={async (payload) => { await assignMutation.mutateAsync(payload); }}
        onCancelEdit={() => setEditingWorker(null)}
      />

      <SimpleAdminTable
        rows={workers}
        columns={[
          {
            key: 'name',
            title: 'Nombre',
            render: (row: any) => `${row.first_name} ${row.last_name ?? ''}`,
          },
          { key: 'email', title: 'Correo', render: (row: any) => row.email },
          { key: 'phone', title: 'Teléfono', render: (row: any) => row.phone ?? '-' },
          { key: 'active', title: 'Activo', render: (row: any) => (row.is_active ? 'Sí' : 'No') },
          {
            key: 'actions',
            title: 'Acciones',
            render: (row: any) => (
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setEditingWorker(row)}
                  className="btn-secondary"
                >
                  Editar
                </button>
                <button
                  onClick={() => toggleUserMutation.mutate(row.id)}
                  className="btn-secondary"
                >
                  {row.is_active ? 'Desactivar' : 'Activar'}
                </button>
              </div>
            ),
          },
        ]}
      />

      <SimpleAdminTable
        rows={assignments}
        columns={[
          {
            key: 'worker',
            title: 'Trabajador',
            render: (row: any) => `${row.first_name} ${row.last_name ?? ''}`,
          },
          { key: 'email', title: 'Correo', render: (row: any) => row.email },
          { key: 'branch', title: 'Sucursal', render: (row: any) => row.branch_name },
          {
            key: 'actions',
            title: 'Acciones',
            render: (row: any) => (
              <button
                onClick={() => unassignMutation.mutate(row.id)}
                className="btn-secondary"
              >
                Quitar
              </button>
            ),
          },
        ]}
      />
    </div>
  );
}