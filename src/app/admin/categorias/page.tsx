'use client';

import { CategoryForm } from '@/components/admin/category-form';
import { SimpleAdminTable } from '@/components/admin/simple-admin-table';
import { useAdminCategories } from '@/features/admin/hooks/use-admin-categories';
import { useCreateCategory } from '@/features/admin/hooks/use-create-category';
import { useToggleCategory } from '@/features/admin/hooks/use-toggle-category';
import { useUpdateCategory } from '@/features/admin/hooks/use-update-category';
import { useAuth } from '@/hooks/use-auth';
import { useState } from 'react';

export default function AdminCategoriesPage() {
  const { token } = useAuth();
  const [editingCategory, setEditingCategory] = useState<any | null>(null);

  const { data = [] } = useAdminCategories(token);
  const createMutation = useCreateCategory(token);
  const updateMutation = useUpdateCategory(token);
  const toggleMutation = useToggleCategory(token);

  const handleSubmit = async (payload: any) => {
    if (editingCategory) {
      await updateMutation.mutateAsync({
        id: editingCategory.id,
        payload,
      });
      setEditingCategory(null);
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
          Gestión de categorías
        </h1>
        <p className="mt-2 text-sm" style={{ color: 'var(--text-soft)' }}>
          Organiza las secciones de la carta para mejorar la experiencia del cliente.
        </p>
      </div>

      <CategoryForm
        initialData={editingCategory}
        onSubmit={handleSubmit}
        onCancelEdit={() => setEditingCategory(null)}
      />

      <SimpleAdminTable
        rows={data}
        columns={[
          { key: 'name', title: 'Nombre', render: (row: any) => row.name },
          { key: 'slug', title: 'Slug', render: (row: any) => row.slug },
          { key: 'description', title: 'Descripción', render: (row: any) => row.description || '-' },
          { key: 'active', title: 'Activo', render: (row: any) => (row.is_active ? 'Sí' : 'No') },
          {
            key: 'actions',
            title: 'Acciones',
            render: (row: any) => (
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setEditingCategory(row)}
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