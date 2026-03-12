'use client';

import { EmptyState } from '@/components/shared/empty-state';
import { PageHeader } from '@/components/shared/page-header';
import { usePublicPromotions } from '@/features/promotions/hooks/use-public-promotions';

const fallbackPromotionImage =
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop';

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
        <section
          className="rounded-[32px] px-6 py-10 md:px-10"
          style={{
            background: 'linear-gradient(135deg, #f7ede3 0%, #fff7ef 100%)',
            border: '1px solid var(--border-soft)',
          }}
        >
          <PageHeader
            title="Promociones"
            description="Descubre nuestras mejores ofertas, combos y descuentos especiales."
          />
        </section>

        {isLoading ? (
          <div className="py-10 text-sm" style={{ color: 'var(--text-soft)' }}>
            Cargando promociones...
          </div>
        ) : !data.length ? (
          <EmptyState title="No hay promociones activas" />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {data.map((promotion) => (
              <article
                key={promotion.id}
                className="group overflow-hidden rounded-[30px] border shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                style={{
                  background: 'rgba(255,255,255,0.96)',
                  borderColor: 'var(--border-soft)',
                }}
              >
                <div className="relative h-64 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={promotion.image_url || fallbackPromotionImage}
                    alt={promotion.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                  <div className="absolute left-4 top-4">
                    <span
                      className="inline-flex rounded-full px-3 py-1 text-xs font-semibold text-white shadow-sm"
                      style={{ background: 'rgba(201, 106, 61, 0.92)' }}
                    >
                      Promo activa
                    </span>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    <h2 className="text-2xl font-extrabold tracking-tight">{promotion.title}</h2>
                  </div>
                </div>

                <div className="space-y-4 p-5">
                  {promotion.description ? (
                    <p className="text-sm leading-7" style={{ color: 'var(--text-soft)' }}>
                      {promotion.description}
                    </p>
                  ) : null}

                  <div className="flex items-center justify-between">
                    <span
                      className="rounded-full px-3 py-2 text-xs font-semibold text-white"
                      style={{ background: 'var(--primary)' }}
                    >
                      {promotion.discount_type}
                    </span>

                    <div className="text-right">
                      <p className="text-xs uppercase tracking-wide" style={{ color: 'var(--text-soft)' }}>
                        Valor
                      </p>
                      <p className="text-2xl font-extrabold" style={{ color: 'var(--dark)' }}>
                        {promotion.discount_value}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}