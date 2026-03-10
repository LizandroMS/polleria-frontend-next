'use client';

import { usePublicCarousel } from '@/features/carousel/hooks/use-public-carousel';
import Link from 'next/link';

export function HeroCarousel() {
  const { data, isLoading } = usePublicCarousel();

  if (isLoading) {
    return <div className="rounded-2xl bg-white p-10">Cargando carrusel...</div>;
  }

  if (!data?.length) {
    return (
      <div className="rounded-2xl bg-white p-10">
        No hay banners activos por ahora.
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {data.map((item) => {
        const content = (
          <div
            key={item.id}
            className="rounded-2xl bg-cover bg-center p-10 text-white shadow"
            style={{ backgroundImage: `url(${item.image_url})` }}
          >
            <div className="max-w-xl rounded-xl bg-black/45 p-6">
              <h2 className="text-3xl font-bold">{item.title}</h2>
              {item.subtitle ? <p className="mt-3">{item.subtitle}</p> : null}
            </div>
          </div>
        );

        if (item.link_type !== 'NONE' && item.link_value) {
          return (
            <Link key={item.id} href={item.link_value}>
              {content}
            </Link>
          );
        }

        return content;
      })}
    </div>
  );
}