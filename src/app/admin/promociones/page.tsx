'use client';

import { PromotionForm } from '@/components/admin/promotion-form';
import { SimpleAdminTable } from '@/components/admin/simple-admin-table';
import { useAdminPromotions } from '@/features/admin/hooks/use-admin-promotions';
import { useCreatePromotion } from '@/features/admin/hooks/use-create-promotion';
import { useTogglePromotion } from '@/features/admin/hooks/use-toggle-promotion';
import { useUpdatePromotion } from '@/features/admin/hooks/use-update-promotion';
import { useAuth } from '@/hooks/use-auth';
import { useState } from 'react';

export default function AdminPromotionsPage() {
  const { token } = useAuth();
  const [editingPromotion, setEditingPromotion] = useState<any | null>(null);

  const { data = [] } = useAdminPromotions(token);
  const createMutation = useCreatePromotion(token);
  const updateMutation = useUpdatePromotion(token);
  const toggleMutation = useTogglePromotion(token);

  const handleSubmit = async (payload: any) => {
    if (editingPromotion) {
      await updateMutation.mutateAsync({
        id: editingPromotion.id,
        payload,
      });
      setEditingPromotion(null);
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
          Gestión de promociones
        </h1>
        <p className="mt-2 text-sm" style={{ color: 'var(--text-soft)' }}>
          Crea y edita promociones visibles para los clientes.
        </p>
      </div>

      <PromotionForm
        initialData={editingPromotion}
        onSubmit={handleSubmit}
        onCancelEdit={() => setEditingPromotion(null)}
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
                  className="h-14 w-14 rounded-xl object-cover"
                />
              ) : (
                <span style={{ color: 'var(--text-soft)' }}>Sin imagen</span>
              ),
          },
          { key: 'title', title: 'Título', render: (row: any) => row.title },
          { key: 'type', title: 'Tipo', render: (row: any) => row.discount_type },
          { key: 'value', title: 'Valor', render: (row: any) => row.discount_value },
          { key: 'active', title: 'Activo', render: (row: any) => (row.is_active ? 'Sí' : 'No') },
          {
            key: 'actions',
            title: 'Acciones',
            render: (row: any) => (
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setEditingPromotion(row)}
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