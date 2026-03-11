import Link from 'next/link';

const links = [
  { href: '/admin/dashboard', label: 'Dashboard' },
  { href: '/admin/pedidos', label: 'Pedidos' },
  { href: '/admin/productos', label: 'Productos' },
  { href: '/admin/categorias', label: 'Categorías' },
  { href: '/admin/promociones', label: 'Promociones' },
  { href: '/admin/carrusel', label: 'Carrusel' },
  { href: '/admin/sucursales', label: 'Sucursales' },
  { href: '/admin/trabajadores', label: 'Trabajadores' },
];

export function AdminSidebar() {
  return (
    <aside className="rounded-2xl border bg-white p-4 shadow-sm">
      <nav className="flex flex-col gap-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-xl px-4 py-3 text-sm hover:bg-gray-100"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}