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
      className="min-h-screen py-10"
      style={{
        background:
          'radial-gradient(circle at top left, #fff6eb 0%, #fffaf5 45%, #fffaf5 100%)',
      }}
    >
      <div className="app-container space-y-8">
        <div
          className="rounded-[32px] px-6 py-10 md:px-10"
          style={{
            background: 'linear-gradient(135deg, #f7ede3 0%, #fff7ef 100%)',
            border: '1px solid var(--border-soft)',
          }}
        >
          <PageHeader
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
            <div className="py-10 text-sm" style={{ color: 'var(--text-soft)' }}>
              Cargando productos...
            </div>
          ) : (
            <ProductGrid products={products} />
          )}
        </div>
      </div>
    </div>
  );
}