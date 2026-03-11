'use client';

import { BranchForm } from '@/components/admin/branch-form';
import { SimpleAdminTable } from '@/components/admin/simple-admin-table';
import { getAdminBranches } from '@/features/admin/api/get-admin-branches';
import { createBranch } from '@/features/admin/api/create-branch';
import { toggleBranch } from '@/features/admin/api/toggle-branch';
import { useAuth } from '@/hooks/use-auth';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export default function AdminBranchesPage() {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  const { data = [] } = useQuery({
    queryKey: ['admin-branches'],
    queryFn: () => getAdminBranches(token as string),
    enabled: !!token,
  });

  const createMutation = useMutation({
    mutationFn: (payload: any) => createBranch(token as string, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-branches'] }),
  });

  const toggleMutation = useMutation({
    mutationFn: (id: string) => toggleBranch(token as string, id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-branches'] }),
  });

  return (
    <div className="space-y-6">
      <BranchForm onSubmit={async (payload) => { await createMutation.mutateAsync(payload); }} />

      <SimpleAdminTable
        rows={data}
        columns={[
          { key: 'name', title: 'Nombre', render: (row: any) => row.name },
          { key: 'district', title: 'Distrito', render: (row: any) => row.district ?? '-' },
          { key: 'active', title: 'Activo', render: (row: any) => (row.is_active ? 'Sí' : 'No') },
          {
            key: 'actions',
            title: 'Acciones',
            render: (row: any) => (
              <button
                onClick={() => toggleMutation.mutate(row.id)}
                className="rounded-xl border px-3 py-2 text-xs"
              >
                {row.is_active ? 'Desactivar' : 'Activar'}
              </button>
            ),
          },
        ]}
      />
    </div>
  );
}