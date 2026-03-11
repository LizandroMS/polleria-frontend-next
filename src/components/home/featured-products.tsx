'use client';

import { ProductCard } from '@/components/menu/product-card';
import { EmptyState } from '@/components/shared/empty-state';
import { usePublicProducts } from '@/features/products/hooks/use-public-products';

export function FeaturedProducts() {
  const { data, isLoading } = usePublicProducts();

  if (isLoading) {
    return <div className="py-6 text-sm" style={{ color: 'var(--text-soft)' }}>Cargando productos...</div>;
  }

  const featured = (data ?? []).filter((product) => product.is_featured);

  if (!featured.length) {
    return <EmptyState title="No hay productos destacados" />;
  }

  return (
    <section>
      <div className="mb-7">
        <p className="section-subtitle">Recomendados</p>
        <h2 className="section-title mt-2">Nuestros favoritos</h2>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {featured.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}