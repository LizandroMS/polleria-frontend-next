'use client';

import { ProductCard } from '@/components/menu/product-card';
import { EmptyState } from '@/components/shared/empty-state';
import { usePublicProducts } from '@/features/products/hooks/use-public-products';

export function FeaturedProducts() {
  const { data, isLoading } = usePublicProducts();

  if (isLoading) {
    return <div>Cargando productos...</div>;
  }

  const featured = (data ?? []).filter((product) => product.is_featured);

  if (!featured.length) {
    return <EmptyState title="No hay productos destacados" />;
  }

  return (
    <section>
      <h2 className="mb-4 text-2xl font-bold">Productos destacados</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {featured.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}