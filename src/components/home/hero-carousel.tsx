'use client';

import { usePublicCarousel } from '@/features/carousel/hooks/use-public-carousel';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

export function HeroCarousel() {
  const { data, isLoading } = usePublicCarousel();
  const [currentIndex, setCurrentIndex] = useState(0);

  const items = useMemo(() => {
    return [...(data ?? [])].sort((a, b) => {
      const aOrder = Number(a.sort_order ?? 0);
      const bOrder = Number(b.sort_order ?? 0);
      return aOrder - bOrder;
    });
  }, [data]);

  useEffect(() => {
    if (!items.length) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [items]);

  useEffect(() => {
    if (currentIndex >= items.length) {
      setCurrentIndex(0);
    }
  }, [items, currentIndex]);

  if (isLoading) {
    return (
      <div className="flex h-[430px] items-center justify-center rounded-[30px] bg-white">
        <p className="text-sm" style={{ color: 'var(--text-soft)' }}>
          Cargando carrusel...
        </p>
      </div>
    );
  }

  if (!items.length) {
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

  const currentItem = items[currentIndex];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const slideContent = (
    <div
      className="relative h-[430px] overflow-hidden rounded-[30px] shadow-lg"
      style={{
        backgroundImage: `url(${currentItem.image_url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
        <span className="mb-4 inline-flex rounded-full bg-white/15 px-4 py-2 text-xs font-semibold backdrop-blur">
          Destacado
        </span>

        <h2 className="max-w-xl text-4xl font-extrabold tracking-tight">
          {currentItem.title}
        </h2>

        {currentItem.subtitle ? (
          <p className="mt-3 max-w-lg text-sm leading-6 text-white/90 md:text-base">
            {currentItem.subtitle}
          </p>
        ) : null}
      </div>

      {items.length > 1 ? (
        <>
          <button
            type="button"
            onClick={prevSlide}
            className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition hover:bg-white/30"
          >
            ‹
          </button>

          <button
            type="button"
            onClick={nextSlide}
            className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition hover:bg-white/30"
          >
            ›
          </button>

          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
            {items.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentIndex(index)}
                className={`h-2.5 rounded-full transition ${
                  index === currentIndex ? 'w-8 bg-white' : 'w-2.5 bg-white/50'
                }`}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );

  if (currentItem.link_type !== 'NONE' && currentItem.link_value) {
    let href = '#';

    if (currentItem.link_type === 'PROMOTION') {
      href = '/promociones';
    } else if (currentItem.link_type === 'PRODUCT') {
      href = '/menu';
    } else if (currentItem.link_type === 'CATEGORY') {
      href = '/menu';
    } else if (currentItem.link_type === 'EXTERNAL') {
      href = currentItem.link_value;
    }

    return <Link href={href}>{slideContent}</Link>;
  }

  return slideContent;
}
