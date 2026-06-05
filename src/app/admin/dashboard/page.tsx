import Link from 'next/link';

const cards = [
  {
    href: '/admin/pedidos',
    label: 'Gestionar pedidos',
    description: 'Monitorea y administra pedidos en tiempo real.',
    icon: '🧾',
  },
  {
    href: '/admin/productos',
    label: 'Gestionar productos',
    description: 'Crea, edita y organiza tus productos.',
    icon: '🍗',
  },
  {
    href: '/admin/categorias',
    label: 'Gestionar categorías',
    description: 'Agrupa y ordena tu catálogo comercial.',
    icon: '📂',
  },
  {
    href: '/admin/promociones',
    label: 'Gestionar promociones',
    description: 'Configura descuentos y campañas activas.',
    icon: '🏷️',
  },
  {
    href: '/admin/carrusel',
    label: 'Gestionar carrusel',
    description: 'Administra banners de la página principal.',
    icon: '🖼️',
  },
  {
    href: '/admin/sucursales',
    label: 'Gestionar sucursales',
    description: 'Mantén actualizadas tus sedes y horarios.',
    icon: '📍',
  },
  {
    href: '/admin/trabajadores',
    label: 'Gestionar trabajadores',
    description: 'Administra personal y asignaciones.',
    icon: '👨‍🍳',
  },
  {
    href: '/admin/comprobantes',
    label: 'Gestionar comprobantes',
    description: 'Consulta, reintenta y anula documentos.',
    icon: '📄',
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <section
        className="rounded-[32px] px-6 py-10 md:px-10"
        style={{
          background: 'linear-gradient(135deg, #f7ede3 0%, #fff7ef 100%)',
          border: '1px solid var(--border-soft)',
        }}
      >
        <p className="section-subtitle">Resumen general</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight" style={{ color: 'var(--dark)' }}>
          Centro de control administrativo
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-7" style={{ color: 'var(--text-soft)' }}>
          Desde aquí puedes gestionar pedidos, productos, promociones, sucursales, trabajadores y comprobantes.
        </p>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="group rounded-[28px] border p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            style={{
              background: 'rgba(255,255,255,0.9)',
              borderColor: 'var(--border-soft)',
            }}
          >
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl text-2xl"
              style={{ background: '#f9e8db' }}
            >
              {card.icon}
            </div>

            <h2 className="text-xl font-bold" style={{ color: 'var(--dark)' }}>
              {card.label}
            </h2>

            <p className="mt-3 text-sm leading-7" style={{ color: 'var(--text-soft)' }}>
              {card.description}
            </p>

            <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold"
              style={{ color: 'var(--primary)' }}
            >
              Ir al módulo
              <span className="transition group-hover:translate-x-1">→</span>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}