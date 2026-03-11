'use client';

import { PromotionForm } from '@/components/admin/promotion-form';
import { SimpleAdminTable } from '@/components/admin/simple-admin-table';
import { createPromotion } from '@/features/admin/api/create-promotion';
import { getAdminPromotions } from '@/features/admin/api/get-admin-promotions';
import { togglePromotion } from '@/features/admin/api/toggle-promotion';
import { useAuth } from '@/hooks/use-auth';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export default function AdminPromotionsPage() {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  const { data = [] } = useQuery({
    queryKey: ['admin-promotions'],
    queryFn: () => getAdminPromotions(token as string),
    enabled: !!token,
  });

  const createMutation = useMutation({
    mutationFn: (payload: any) => createPromotion(token as string, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-promotions'] }),
  });

  const toggleMutation = useMutation({
    mutationFn: (id: string) => togglePromotion(token as string, id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-promotions'] }),
  });

  return (
    <div className="space-y-6">
      <PromotionForm onSubmit={async (payload) => { await createMutation.mutateAsync(payload); }} />

      <SimpleAdminTable
        rows={data}
        columns={[
          { key: 'title', title: 'Título', render: (row: any) => row.title },
          { key: 'type', title: 'Tipo', render: (row: any) => row.discount_type },
          { key: 'value', title: 'Valor', render: (row: any) => row.discount_value },
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