'use client';

import { EmptyState } from '@/components/shared/empty-state';
import { usePublicPromotions } from '@/features/promotions/hooks/use-public-promotions';

export function FeaturedPromotions() {
  const { data, isLoading } = usePublicPromotions();

  if (isLoading) {
    return <div className="py-6 text-sm" style={{ color: 'var(--text-soft)' }}>Cargando promociones...</div>;
  }

  if (!data?.length) {
    return <EmptyState title="No hay promociones activas" />;
  }

  return (
    <section>
      <div className="mb-7">
        <p className="section-subtitle">Ofertas</p>
        <h2 className="section-title mt-2">Promociones destacadas</h2>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {data.map((promotion) => (
          <article
            key={promotion.id}
            className="soft-card group p-6 transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="mb-4 inline-flex rounded-full px-3 py-1 text-xs font-semibold"
              style={{ background: '#f9e8db', color: 'var(--primary)' }}
            >
              Promo activa
            </div>

            <h3 className="text-xl font-bold" style={{ color: 'var(--dark)' }}>
              {promotion.title}
            </h3>

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
    </section>
  );
}