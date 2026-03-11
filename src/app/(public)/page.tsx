import { FeaturedProducts } from '@/components/home/featured-products';
import { FeaturedPromotions } from '@/components/home/featured-promotions';
import { HeroCarousel } from '@/components/home/hero-carousel';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div
      style={{
        background:
          'radial-gradient(circle at top left, #fff6eb 0%, #fffaf5 45%, #fffaf5 100%)',
      }}
    >
      <section className="relative overflow-hidden">
        <div className="app-container grid items-center gap-12 py-14 lg:grid-cols-2 lg:py-20">
          <div className="space-y-7">
            <span className="chip-soft">Sabor peruano, pedidos rápidos</span>

            <div className="space-y-5">
              <h1
                className="text-5xl font-extrabold leading-[0.95] tracking-tight md:text-6xl"
                style={{ color: 'var(--dark)' }}
              >
                El mejor pollo a la brasa, directo a tu mesa
              </h1>

              <p
                className="max-w-xl text-base leading-8 md:text-lg"
                style={{ color: 'var(--text-soft)' }}
              >
                Explora nuestra carta, aprovecha promociones exclusivas y haz tu pedido
                desde cualquier sucursal de forma rápida y sencilla.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/menu" className="btn-primary">
                Ver carta
              </Link>

              <Link href="/promociones" className="btn-secondary">
                Ver promociones
              </Link>
            </div>

            <div className="grid max-w-xl grid-cols-3 gap-4 pt-3">
              <div className="soft-card p-5 text-center">
                <p className="text-3xl font-extrabold" style={{ color: 'var(--dark)' }}>
                  +100
                </p>
                <p className="mt-1 text-sm" style={{ color: 'var(--text-soft)' }}>
                  Pedidos felices
                </p>
              </div>

              <div className="soft-card p-5 text-center">
                <p className="text-3xl font-extrabold" style={{ color: 'var(--dark)' }}>
                  Rápido
                </p>
                <p className="mt-1 text-sm" style={{ color: 'var(--text-soft)' }}>
                  Atención ágil
                </p>
              </div>

              <div className="soft-card p-5 text-center">
                <p className="text-3xl font-extrabold" style={{ color: 'var(--dark)' }}>
                  Calidad
                </p>
                <p className="mt-1 text-sm" style={{ color: 'var(--text-soft)' }}>
                  Sabor garantizado
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div
              className="absolute -left-10 -top-10 h-40 w-40 rounded-full blur-3xl"
              style={{ background: 'rgba(232, 184, 109, 0.25)' }}
            />
            <div
              className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full blur-3xl"
              style={{ background: 'rgba(201, 106, 61, 0.18)' }}
            />
            <div className="relative">
              <HeroCarousel />
            </div>
          </div>
        </div>
      </section>

      <section className="app-container py-8">
        <FeaturedPromotions />
      </section>

      <section className="app-container py-6">
        <div
          className="rounded-[32px] px-6 py-10 md:px-10"
          style={{
            background: 'linear-gradient(135deg, #2f2118 0%, #433127 100%)',
          }}
        >
          <div className="grid gap-5 md:grid-cols-3">
            <div className="rounded-[24px] bg-white/10 p-5 text-white backdrop-blur">
              <h3 className="text-lg font-semibold">Pedidos rápidos</h3>
              <p className="mt-2 text-sm text-white/80">
                Haz tu pedido en pocos pasos y sigue el estado de atención.
              </p>
            </div>

            <div className="rounded-[24px] bg-white/10 p-5 text-white backdrop-blur">
              <h3 className="text-lg font-semibold">Promociones activas</h3>
              <p className="mt-2 text-sm text-white/80">
                Aprovecha combos y descuentos especiales según disponibilidad.
              </p>
            </div>

            <div className="rounded-[24px] bg-white/10 p-5 text-white backdrop-blur">
              <h3 className="text-lg font-semibold">Múltiples sucursales</h3>
              <p className="mt-2 text-sm text-white/80">
                Elige la sucursal que prefieras para delivery o recojo.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="app-container py-10">
        <FeaturedProducts />
      </section>

      <section className="app-container pb-14">
        <div
          className="rounded-[32px] px-6 py-12 shadow-sm md:px-10"
          style={{
            background: 'linear-gradient(135deg, #f9eadb 0%, #fff7ef 100%)',
            border: '1px solid var(--border-soft)',
          }}
        >
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h2 className="text-3xl font-extrabold" style={{ color: 'var(--dark)' }}>
                ¿Listo para hacer tu pedido?
              </h2>
              <p className="mt-2 max-w-2xl leading-7" style={{ color: 'var(--text-soft)' }}>
                Revisa nuestra carta, elige tus favoritos y completa tu compra en minutos.
              </p>
            </div>

            <Link href="/menu" className="btn-primary">
              Pedir ahora
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}