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
    <div
      className="page-shell"
    >
      <div className="app-container space-y-8">
        <div
          className="page-hero"
        >
          <PageHeader
            eyebrow="Carta"
            title="Nuestra carta"
            description="Explora nuestros pollos, complementos, bebidas y promociones."
          />
        </div>

        {!loadingCategories ? (
          <div className="soft-card p-5">
            <CategoryFilter
              categories={categories}
              selectedSlug={selectedSlug}
              onChange={setSelectedSlug}
            />
          </div>
        ) : null}

        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="section-subtitle">Carta</p>
              <h2 className="section-title mt-2">
                {selectedSlug ? 'Productos filtrados' : 'Todos los productos'}
              </h2>
            </div>

            <div
              className="rounded-full px-4 py-2 text-sm font-medium"
              style={{ background: '#fff', border: '1px solid var(--border-soft)', color: 'var(--text-soft)' }}
            >
              {products.length} productos
            </div>
          </div>

          {loadingProducts ? (
            <div className="loading-panel">Cargando productos...</div>
          ) : (
            <ProductGrid products={products} />
          )}
        </div>
      </div>
    </div>
  );
}