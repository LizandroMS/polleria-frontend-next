'use client';

import { ProductForm } from '@/components/admin/product-form';
import { SimpleAdminTable } from '@/components/admin/simple-admin-table';
import { createProduct } from '@/features/admin/api/create-product';
import { getAdminCategories } from '@/features/admin/api/get-admin-categories';
import { getAdminProducts } from '@/features/admin/api/get-admin-products';
import { toggleProduct } from '@/features/admin/api/toggle-product';
import { useAuth } from '@/hooks/use-auth';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export default function AdminProductsPage() {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  const { data: categories = [] } = useQuery({
    queryKey: ['admin-categories'],
    queryFn: () => getAdminCategories(token as string),
    enabled: !!token,
  });

  const { data: products = [] } = useQuery({
    queryKey: ['admin-products'],
    queryFn: () => getAdminProducts(token as string),
    enabled: !!token,
  });

  const createMutation = useMutation({
    mutationFn: (payload: any) => createProduct(token as string, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-products'] }),
  });

  const toggleMutation = useMutation({
    mutationFn: (id: string) => toggleProduct(token as string, id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-products'] }),
  });

  return (
    <div className="space-y-6">
      <ProductForm
        categories={categories}
        onSubmit={async (payload) => createMutation.mutateAsync(payload)}
      />

      <SimpleAdminTable
        rows={products}
        columns={[
          { key: 'name', title: 'Nombre', render: (row: any) => row.name },
          { key: 'category', title: 'Categoría', render: (row: any) => row.category_name },
          { key: 'price', title: 'Precio base', render: (row: any) => `S/ ${row.base_price}` },
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