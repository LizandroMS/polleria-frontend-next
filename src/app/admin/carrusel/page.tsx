'use client';

import { CarouselForm } from '@/components/admin/carousel-form';
import { SimpleAdminTable } from '@/components/admin/simple-admin-table';
import { createCarouselItem } from '@/features/admin/api/create-carousel-item';
import { getAdminCarousel } from '@/features/admin/api/get-admin-carousel';
import { toggleCarouselItem } from '@/features/admin/api/toggle-carousel-item';
import { useAuth } from '@/hooks/use-auth';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export default function AdminCarouselPage() {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  const { data = [] } = useQuery({
    queryKey: ['admin-carousel'],
    queryFn: () => getAdminCarousel(token as string),
    enabled: !!token,
  });

  const createMutation = useMutation({
    mutationFn: (payload: any) => createCarouselItem(token as string, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-carousel'] }),
  });

  const toggleMutation = useMutation({
    mutationFn: (id: string) => toggleCarouselItem(token as string, id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-carousel'] }),
  });

  return (
    <div className="space-y-6">
      <CarouselForm
        onSubmit={async (payload) => {
          await createMutation.mutateAsync(payload);
        }}
      />

      <SimpleAdminTable
        rows={data}
        columns={[
          { key: 'title', title: 'Título', render: (row: any) => row.title },
          { key: 'linkType', title: 'Link type', render: (row: any) => row.link_type },
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