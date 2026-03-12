'use client';

import { EmptyState } from '@/components/shared/empty-state';
import { usePublicPromotions } from '@/features/promotions/hooks/use-public-promotions';

const fallbackPromotionImage =
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop';

export function FeaturedPromotions() {
  const { data, isLoading } = usePublicPromotions();

  if (isLoading) {
    return (
      <div className="py-6 text-sm" style={{ color: 'var(--text-soft)' }}>
        Cargando promociones...
      </div>
    );
  }

  if (!data?.length) {
    return <EmptyState title="No hay promociones activas" />;
  }

  return (
    <section className="space-y-7">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="section-subtitle">Ofertas</p>
          <h2 className="section-title mt-2">Promociones destacadas</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7" style={{ color: 'var(--text-soft)' }}>
            Aprovecha nuestras mejores campañas, combos y descuentos especiales.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {data.map((promotion) => (
          <article
            key={promotion.id}
            className="group overflow-hidden rounded-[30px] border shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            style={{
              background: 'rgba(255,255,255,0.95)',
              borderColor: 'var(--border-soft)',
            }}
          >
            <div className="relative h-56 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={promotion.image_url || fallbackPromotionImage}
                alt={promotion.title}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              <div className="absolute left-4 top-4">
                <span
                  className="inline-flex rounded-full px-3 py-1 text-xs font-semibold text-white shadow-sm"
                  style={{ background: 'rgba(201, 106, 61, 0.92)' }}
                >
                  Promo activa
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <h3 className="text-2xl font-extrabold tracking-tight">{promotion.title}</h3>

                {promotion.description ? (
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/90">
                    {promotion.description}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="flex items-center justify-between p-5">
              <div className="flex items-center gap-2">
                <span
                  className="rounded-full px-3 py-2 text-xs font-semibold text-white"
                  style={{ background: 'var(--primary)' }}
                >
                  {promotion.discount_type}
                </span>
              </div>

              <div className="text-right">
                <p className="text-xs uppercase tracking-wide" style={{ color: 'var(--text-soft)' }}>
                  Valor
                </p>
                <p className="text-2xl font-extrabold" style={{ color: 'var(--dark)' }}>
                  {promotion.discount_value}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}