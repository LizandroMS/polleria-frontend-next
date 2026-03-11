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
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="h-fit rounded-[30px] border p-5 shadow-sm"
      style={{
        background: 'rgba(255,255,255,0.82)',
        borderColor: 'var(--border-soft)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <div className="mb-5">
        <p className="text-sm font-semibold uppercase tracking-[0.16em]" style={{ color: 'var(--primary)' }}>
          Administración
        </p>
        <h2 className="mt-2 text-xl font-extrabold" style={{ color: 'var(--dark)' }}>
          Menú principal
        </h2>
      </div>

      <nav className="flex flex-col gap-2">
        {links.map((link) => {
          const active = pathname === link.href || pathname.startsWith(`${link.href}/`);

          return (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition"
              style={
                active
                  ? {
                      background: 'linear-gradient(135deg, var(--primary), #d98250)',
                      color: 'white',
                      boxShadow: '0 10px 24px rgba(201, 106, 61, 0.18)',
                    }
                  : {
                      color: 'var(--text-main)',
                    }
              }
            >
              <span className="text-base">{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}