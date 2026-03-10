'use client';

import { CategoryFilter } from '@/components/menu/category-filter';
import { ProductGrid } from '@/components/menu/product-grid';
import { PageHeader } from '@/components/shared/page-header';
import { usePublicCategories } from '@/features/categories/hooks/use-public-categories';
import { usePublicProducts } from '@/features/products/hooks/use-public-products';
import { useState } from 'react';

export default function MenuPage() {
  const [selectedSlug, setSelectedSlug] = useState<string | undefined>(undefined);

  const { data: categories = [], isLoading: loadingCategories } = usePublicCategories();
  const { data: products = [], isLoading: loadingProducts } = usePublicProducts({
    categorySlug: selectedSlug,
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <PageHeader
        title="Nuestra carta"
        description="Explora nuestros pollos, complementos, bebidas y promociones."
      />

      {!loadingCategories && (
        <CategoryFilter
          categories={categories}
          selectedSlug={selectedSlug}
          onChange={setSelectedSlug}
        />
      )}

      {loadingProducts ? <div>Cargando productos...</div> : <ProductGrid products={products} />}
    </div>
  );
}