'use client';

import { useAuth } from '@/hooks/use-auth';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavItemProps = {
  href: string;
  label: string;
  active: boolean;
};

function NavItem({ href, label, active }: NavItemProps) {
  return (
    <Link
      href={href}
      className={`rounded-full px-4 py-2 text-sm font-medium transition ${
        active
          ? 'bg-black text-white shadow-sm'
          : 'text-gray-700 hover:bg-gray-100 hover:text-black'
      }`}
    >
      {label}
    </Link>
  );
}

export function Navbar() {
  const { user } = useAuth();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-black text-lg font-bold text-white shadow-sm">
            P
          </div>

          <div className="leading-tight">
            <p className="text-xl font-extrabold tracking-tight text-gray-900">
              Pollería el Sabrosito
            </p>
            <p className="text-xs text-gray-500">Sabor peruano directo a tu mesa</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 lg:flex">
          <NavItem href="/" label="Inicio" active={pathname === '/'} />
          <NavItem href="/menu" label="Carta" active={pathname === '/menu'} />
          <NavItem
            href="/promociones"
            label="Promociones"
            active={pathname === '/promociones'}
          />
          <NavItem href="/carrito" label="Carrito" active={pathname === '/carrito'} />

          {user?.role === 'CUSTOMER' ? (
            <>
              <NavItem
                href="/profile/pedidos"
                label="Mis pedidos"
                active={pathname.startsWith('/profile/pedidos')}
              />
              <NavItem
                href="/profile/direcciones"
                label="Direcciones"
                active={pathname.startsWith('/profile/direcciones')}
              />
            </>
          ) : null}

          {user?.role === 'WORKER' ? (
            <NavItem
              href="/worker/pedidos"
              label="Worker"
              active={pathname.startsWith('/worker')}
            />
          ) : null}

          {user?.role === 'ADMIN' ? (
            <NavItem
              href="/admin/dashboard"
              label="Admin"
              active={pathname.startsWith('/admin')}
            />
          ) : null}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {!user ? (
            <>
              <Link
                href="/login"
                className="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-800 transition hover:bg-gray-50"
              >
                Ingresar
              </Link>

              <Link
                href="/registro"
                className="rounded-full bg-orange-500 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600"
              >
                Registrarme
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <div className="hidden rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-700 xl:block">
                {user.first_name}
              </div>
              <Link
                href="/carrito"
                className="rounded-full bg-black px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:scale-[1.02]"
              >
                Ver carrito
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}