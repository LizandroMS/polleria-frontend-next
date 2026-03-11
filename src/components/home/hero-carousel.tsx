'use client';

import { usePublicCarousel } from '@/features/carousel/hooks/use-public-carousel';
import Link from 'next/link';

export function HeroCarousel() {
  const { data, isLoading } = usePublicCarousel();

  if (isLoading) {
    return (
      <div className="flex h-[430px] items-center justify-center rounded-[30px] bg-white">
        <p className="text-sm" style={{ color: 'var(--text-soft)' }}>
          Cargando carrusel...
        </p>
      </div>
    );
  }

  if (!data?.length) {
    return (
      <div
        className="flex h-[430px] items-center justify-center rounded-[30px] p-8 text-center"
        style={{
          background: 'linear-gradient(135deg, #f7ede3, #fff6ec)',
          border: '1px solid var(--border-soft)',
        }}
      >
        <div>
          <span className="chip-soft">Especial del día</span>
          <h2 className="mt-4 text-3xl font-extrabold" style={{ color: 'var(--dark)' }}>
            Bienvenido a Pollería el Sabrosito
          </h2>
          <p className="mt-3 max-w-md text-sm leading-6" style={{ color: 'var(--text-soft)' }}>
            Muy pronto verás aquí banners promocionales, combos y novedades destacadas.
          </p>
        </div>
      </div>
    );
  }

  const firstItem = data[0];

  const content = (
    <div
      className="relative h-[460px] overflow-hidden rounded-[30px] bg-cover bg-center shadow-lg"
      style={{ backgroundImage: `url(${firstItem.image_url})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
        <span className="mb-4 inline-flex rounded-full bg-white/15 px-4 py-2 text-xs font-semibold backdrop-blur">
          Destacado
        </span>

        <h2 className="max-w-xl text-4xl font-extrabold tracking-tight">
          {firstItem.title}
        </h2>

        {firstItem.subtitle ? (
          <p className="mt-3 max-w-lg text-sm leading-6 text-white/90 md:text-base">
            {firstItem.subtitle}
          </p>
        ) : null}
      </div>
    </div>
  );

  if (firstItem.link_type !== 'NONE' && firstItem.link_value) {
    return <Link href={firstItem.link_value}>{content}</Link>;
  }

  return content;
}