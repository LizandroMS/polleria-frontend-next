'use client';

import { EmptyState } from '@/components/shared/empty-state';
import { PageHeader } from '@/components/shared/page-header';
import { usePublicPromotions } from '@/features/promotions/hooks/use-public-promotions';

export default function PromotionsPage() {
  const { data = [], isLoading } = usePublicPromotions();

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
            title="Promociones"
            description="Descubre nuestras ofertas activas y aprovecha los mejores combos."
          />
        </div>

        {isLoading ? (
          <div className="py-10 text-sm" style={{ color: 'var(--text-soft)' }}>
            Cargando promociones...
          </div>
        ) : !data.length ? (
          <EmptyState title="No hay promociones activas" />
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {data.map((promotion) => (
              <article
                key={promotion.id}
                className="soft-card p-6 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div
                  className="mb-4 inline-flex rounded-full px-3 py-1 text-xs font-semibold"
                  style={{ background: '#f9e8db', color: 'var(--primary)' }}
                >
                  Promo activa
                </div>

                <h2 className="text-xl font-bold" style={{ color: 'var(--dark)' }}>
                  {promotion.title}
                </h2>

                {promotion.description ? (
                  <p className="mt-3 text-sm leading-7" style={{ color: 'var(--text-soft)' }}>
                    {promotion.description}
                  </p>
                ) : null}

                <div className="mt-5 flex items-center justify-between">
                  <span
                    className="rounded-full px-3 py-2 text-xs font-semibold text-white"
                    style={{ background: 'var(--primary)' }}
                  >
                    {promotion.discount_type}
                  </span>

                  <span className="text-lg font-extrabold" style={{ color: 'var(--dark)' }}>
                    {promotion.discount_value}
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}