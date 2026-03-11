'use client';

import { SimpleAdminTable } from '@/components/admin/simple-admin-table';
import { WorkerForm } from '@/components/admin/worker-form';
import { assignWorkerBranch } from '@/features/admin/api/assign-worker-branch';
import { createWorker } from '@/features/admin/api/create-worker';
import { getAdminBranches } from '@/features/admin/api/get-admin-branches';
import { getAdminWorkers } from '@/features/admin/api/get-admin-workers';
import { getWorkerAssignments } from '@/features/admin/api/get-worker-assignments';
import { toggleUser } from '@/features/admin/api/toggle-user';
import { unassignWorkerBranch } from '@/features/admin/api/unassign-worker-branch';
import { useAuth } from '@/hooks/use-auth';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export default function AdminWorkersPage() {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  const { data: workers = [] } = useQuery({
    queryKey: ['admin-workers'],
    queryFn: () => getAdminWorkers(token as string),
    enabled: !!token,
  });

  const { data: branches = [] } = useQuery({
    queryKey: ['admin-branches'],
    queryFn: () => getAdminBranches(token as string),
    enabled: !!token,
  });

  const { data: assignments = [] } = useQuery({
    queryKey: ['worker-assignments'],
    queryFn: () => getWorkerAssignments(token as string),
    enabled: !!token,
  });

  const createWorkerMutation = useMutation({
    mutationFn: (payload: any) => createWorker(token as string, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-workers'] }),
  });

  const assignMutation = useMutation({
    mutationFn: (payload: any) => assignWorkerBranch(token as string, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['worker-assignments'] }),
  });

  const toggleUserMutation = useMutation({
    mutationFn: (id: string) => toggleUser(token as string, id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-workers'] }),
  });

  const unassignMutation = useMutation({
    mutationFn: (id: string) => unassignWorkerBranch(token as string, id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['worker-assignments'] }),
  });

  return (
    <div className="space-y-6">
      <WorkerForm
        workers={workers}
        branches={branches}
        onCreateWorker={async (payload) => createWorkerMutation.mutateAsync(payload)}
        onAssign={async (payload) => assignMutation.mutateAsync(payload)}
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
          { key: 'active', title: 'Activo', render: (row: any) => (row.is_active ? 'Sí' : 'No') },
          {
            key: 'actions',
            title: 'Acciones',
            render: (row: any) => (
              <button
                onClick={() => toggleUserMutation.mutate(row.id)}
                className="rounded-xl border px-3 py-2 text-xs"
              >
                {row.is_active ? 'Desactivar' : 'Activar'}
              </button>
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
                className="rounded-xl border px-3 py-2 text-xs"
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