'use client';

import { ProductForm } from '@/components/admin/product-form';
import { SimpleAdminTable } from '@/components/admin/simple-admin-table';
import { useAdminCategories } from '@/features/admin/hooks/use-admin-categories';
import { useAdminProducts } from '@/features/admin/hooks/use-admin-products';
import { useCreateProduct } from '@/features/admin/hooks/use-create-product';
import { useToggleProduct } from '@/features/admin/hooks/use-toggle-product';
import { useUpdateProduct } from '@/features/admin/hooks/use-update-product';
import { useAuth } from '@/hooks/use-auth';
import { useState } from 'react';

export default function AdminProductsPage() {
  const { token } = useAuth();
  const [editingProduct, setEditingProduct] = useState<any | null>(null);

  const { data: categories = [] } = useAdminCategories(token);
  const { data: products = [] } = useAdminProducts(token);
  const createProductMutation = useCreateProduct(token);
  const updateProductMutation = useUpdateProduct(token);
  const toggleProductMutation = useToggleProduct(token);

  const handleSubmit = async (payload: any) => {
    if (editingProduct) {
      await updateProductMutation.mutateAsync({
        id: editingProduct.id,
        payload,
      });
      setEditingProduct(null);
      return;
    }

    await createProductMutation.mutateAsync(payload);
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
          Gestión de productos
        </h1>
        <p className="mt-2 text-sm" style={{ color: 'var(--text-soft)' }}>
          Crea, edita y organiza los productos de la carta.
        </p>
      </div>

      <ProductForm
        categories={categories}
        initialData={editingProduct}
        onSubmit={handleSubmit}
        onCancelEdit={() => setEditingProduct(null)}
      />

      <SimpleAdminTable
        rows={products}
        columns={[
          {
            key: 'image',
            title: 'Imagen',
            render: (row: any) =>
              row.image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={row.image_url}
                  alt={row.name}
                  className="h-14 w-14 rounded-xl object-cover"
                />
              ) : (
                <span style={{ color: 'var(--text-soft)' }}>Sin imagen</span>
              ),
          },
          { key: 'name', title: 'Nombre', render: (row: any) => row.name },
          { key: 'category', title: 'Categoría', render: (row: any) => row.category_name },
          { key: 'price', title: 'Precio base', render: (row: any) => `S/ ${row.base_price}` },
          { key: 'active', title: 'Activo', render: (row: any) => (row.is_active ? 'Sí' : 'No') },
          {
            key: 'actions',
            title: 'Acciones',
            render: (row: any) => (
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setEditingProduct(row)}
                  className="btn-secondary"
                >
                  Editar
                </button>
                <button
                  onClick={() => toggleProductMutation.mutate(row.id)}
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