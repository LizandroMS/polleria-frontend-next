import Link from 'next/link';

const cards = [
  { href: '/admin/pedidos', label: 'Gestionar pedidos' },
  { href: '/admin/productos', label: 'Gestionar productos' },
  { href: '/admin/categorias', label: 'Gestionar categorías' },
  { href: '/admin/promociones', label: 'Gestionar promociones' },
  { href: '/admin/carrusel', label: 'Gestionar carrusel' },
  { href: '/admin/sucursales', label: 'Gestionar sucursales' },
  { href: '/admin/trabajadores', label: 'Gestionar trabajadores' },
];

export default function AdminDashboardPage() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {cards.map((card) => (
        <Link
          key={card.href}
          href={card.href}
          className="rounded-2xl border bg-white p-6 shadow-sm"
        >
          <h2 className="text-lg font-semibold">{card.label}</h2>
        </Link>
      ))}
    </div>
  );
}