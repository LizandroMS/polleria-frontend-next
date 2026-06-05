'use client';

import { CarouselForm } from '@/components/admin/carousel-form';
import { SimpleAdminTable } from '@/components/admin/simple-admin-table';
import { useAdminCarousel } from '@/features/admin/hooks/use-admin-carousel';
import { useCreateCarouselItem } from '@/features/admin/hooks/use-create-carousel-item';
import { useToggleCarouselItem } from '@/features/admin/hooks/use-toggle-carousel-item';
import { useUpdateCarouselItem } from '@/features/admin/hooks/use-update-carousel-item';
import { useAuth } from '@/hooks/use-auth';
import { useState } from 'react';

export default function AdminCarouselPage() {
  const { token } = useAuth();
  const [editingItem, setEditingItem] = useState<any | null>(null);

  const { data = [] } = useAdminCarousel(token);
  const createMutation = useCreateCarouselItem(token);
  const updateMutation = useUpdateCarouselItem(token);
  const toggleMutation = useToggleCarouselItem(token);

  const handleSubmit = async (payload: any) => {
    if (editingItem) {
      await updateMutation.mutateAsync({
        id: editingItem.id,
        payload,
      });
      setEditingItem(null);
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
          Gestión de carrusel
        </h1>
        <p className="mt-2 text-sm" style={{ color: 'var(--text-soft)' }}>
          Administra los banners principales de la página de inicio.
        </p>
      </div>

      <CarouselForm
        initialData={editingItem}
        onSubmit={handleSubmit}
        onCancelEdit={() => setEditingItem(null)}
      />

      <SimpleAdminTable
        rows={data}
        columns={[
          {
            key: 'image',
            title: 'Imagen',
            render: (row: any) =>
              row.image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={row.image_url}
                  alt={row.title}
                  className="h-14 w-20 rounded-xl object-cover"
                />
              ) : (
                <span style={{ color: 'var(--text-soft)' }}>Sin imagen</span>
              ),
          },
          { key: 'title', title: 'Título', render: (row: any) => row.title },
          { key: 'linkType', title: 'Link type', render: (row: any) => row.link_type },
          { key: 'active', title: 'Activo', render: (row: any) => (row.is_active ? 'Sí' : 'No') },
          {
            key: 'actions',
            title: 'Acciones',
            render: (row: any) => (
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setEditingItem(row)}
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