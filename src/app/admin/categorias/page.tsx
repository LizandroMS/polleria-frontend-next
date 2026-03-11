'use client';

import { CategoryForm } from '@/components/admin/category-form';
import { SimpleAdminTable } from '@/components/admin/simple-admin-table';
import { createCategory } from '@/features/admin/api/create-category';
import { getAdminCategories } from '@/features/admin/api/get-admin-categories';
import { toggleCategory } from '@/features/admin/api/toggle-category';
import { useAuth } from '@/hooks/use-auth';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export default function AdminCategoriesPage() {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  const { data = [] } = useQuery({
    queryKey: ['admin-categories'],
    queryFn: () => getAdminCategories(token as string),
    enabled: !!token,
  });

  const createMutation = useMutation({
    mutationFn: (payload: any) => createCategory(token as string, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-categories'] }),
  });

  const toggleMutation = useMutation({
    mutationFn: (id: string) => toggleCategory(token as string, id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-categories'] }),
  });

  return (
    <div className="space-y-6">
      <CategoryForm onSubmit={async (payload) => {await createMutation.mutateAsync(payload)}} />

      <SimpleAdminTable
        rows={data}
        columns={[
          { key: 'name', title: 'Nombre', render: (row: any) => row.name },
          { key: 'slug', title: 'Slug', render: (row: any) => row.slug },
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