'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/admin/pedidos', label: 'Pedidos', icon: '🧾' },
  { href: '/admin/productos', label: 'Productos', icon: '🍗' },
  { href: '/admin/categorias', label: 'Categorías', icon: '📂' },
  { href: '/admin/promociones', label: 'Promociones', icon: '🏷️' },
  { href: '/admin/carrusel', label: 'Carrusel', icon: '🖼️' },
  { href: '/admin/sucursales', label: 'Sucursales', icon: '📍' },
  { href: '/admin/trabajadores', label: 'Trabajadores', icon: '👨‍🍳' },
  { href: '/admin/comprobantes', label: 'Comprobantes', icon: '📄' },
  { href: '/admin/series-comprobantes', label: 'Series', icon: '🔢' },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="glass-card h-fit p-5 lg:sticky lg:top-24">
      <div className="mb-5 rounded-[24px] p-4" style={{ background: 'linear-gradient(135deg, #fff0e5, #fffaf5)' }}>
        <p className="section-subtitle">Administración</p>
        <h2 className="mt-2 text-xl font-extrabold" style={{ color: 'var(--dark)' }}>
          Menú principal
        </h2>
        <p className="mt-2 text-xs leading-5" style={{ color: 'var(--text-soft)' }}>
          Gestiona tu operación diaria desde un solo lugar.
        </p>
      </div>

      <nav className="flex flex-col gap-2">
        {links.map((link) => {
          const active = pathname === link.href || pathname.startsWith(`${link.href}/`);

          return (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition duration-200"
              style={
                active
                  ? {
                      background: 'linear-gradient(135deg, var(--primary), #d98250)',
                      color: 'white',
                      boxShadow: '0 14px 30px rgba(201, 106, 61, 0.2)',
                    }
                  : {
                      color: 'var(--text-main)',
                    }
              }
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-xl text-base" style={!active ? { background: 'var(--primary-soft)' } : { background: 'rgba(255,255,255,0.18)' }}>
                {link.icon}
              </span>
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
