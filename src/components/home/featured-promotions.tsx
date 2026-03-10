'use client';

import { EmptyState } from '@/components/shared/empty-state';
import { usePublicPromotions } from '@/features/promotions/hooks/use-public-promotions';

export function FeaturedPromotions() {
  const { data, isLoading } = usePublicPromotions();

  if (isLoading) {
    return <div>Cargando promociones...</div>;
  }

  if (!data?.length) {
    return <EmptyState title="No hay promociones activas" />;
  }

  return (
    <section>
      <h2 className="mb-4 text-2xl font-bold">Promociones</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data.map((promotion) => (
          <article key={promotion.id} className="rounded-2xl border bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold">{promotion.title}</h3>
            {promotion.description ? (
              <p className="mt-2 text-sm text-gray-600">{promotion.description}</p>
            ) : null}
            <p className="mt-3 text-sm font-medium">
              Tipo: {promotion.discount_type} / Valor: {promotion.discount_value}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}