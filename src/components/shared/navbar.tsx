'use client';

import { useAuth } from '@/hooks/use-auth';
import { useCart } from '@/hooks/use-cart';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import LogoImg from '../../../public/logo.png';

type NavItemProps = {
  href: string;
  label: string;
  active: boolean;
  badge?: number;
};

function NavItem({ href, label, active, badge }: NavItemProps) {
  return (
    <Link
      href={href}
      className={`relative inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${active
        ? 'text-white shadow-sm'
        : 'text-gray-700 hover:bg-white hover:text-gray-900'
        }`}
      style={active ? { background: 'var(--primary)' } : {}}
    >
      <span>{label}</span>

      {badge && badge > 0 ? (
        <span
          className={`inline-flex min-h-[22px] min-w-[22px] items-center justify-center rounded-full px-1 text-xs font-bold ${active ? 'bg-white text-black' : 'text-white'
            }`}
          style={!active ? { background: 'var(--primary)' } : {}}
        >
          {badge}
        </span>
      ) : null}
    </Link>
  );
}

export function Navbar() {
  const { user, logout } = useAuth();
  const { totalItems, hydrated } = useCart();
  const carBadge = hydrated ? totalItems : 0;
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur-xl"
      style={{
        background: 'rgba(255, 250, 245, 0.88)',
        borderColor: 'var(--border-soft)',
      }}
    >
      <div className="app-container flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src={LogoImg} // Usa la variable importada en lugar de un string
            alt="Pollería el Sabrosito"
            width={60}
            height={60}
            className="rounded-full object-cover"
            priority // Agrega esto para que el logo cargue de inmediato
          />

          <div className="leading-tight">
            <p className="text-2xl font-extrabold tracking-tight" style={{ color: 'var(--dark)' }}>
              Pollería el Sabrosito
            </p>
            <p className="text-xs" style={{ color: 'var(--text-soft)' }}>
              Sabor peruano directo a tu mesa
            </p>
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
          <NavItem
            href="/carrito"
            label="Carrito"
            active={pathname === '/carrito'}
            badge={carBadge}
          />

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
              <Link href="/login" className="btn-secondary">
                Ingresar
              </Link>
              <Link href="/registro" className="btn-primary">
                Registrarme
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <div
                className="hidden rounded-full px-4 py-2 text-sm xl:block"
                style={{
                  background: '#fff',
                  color: 'var(--text-soft)',
                  border: '1px solid var(--border-soft)',
                }}
              >
                {user.first_name}
              </div>

              <Link href="/carrito" className="btn-primary relative">
                Ver carrito
                {carBadge > 0 ? (
                  <span className="ml-2 inline-flex min-h-[22px] min-w-[22px] items-center justify-center rounded-full bg-white px-1 text-xs font-bold text-black">
                    {carBadge}
                  </span>
                ) : null}
              </Link>
              <button onClick={handleLogout} className="btn-secondary">
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}