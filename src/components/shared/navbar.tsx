'use client';

import { useAuth } from '@/hooks/use-auth';
import { useCart } from '@/hooks/use-cart';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import LogoImg from '../../../public/logo.png';

type NavItemProps = {
  href: string;
  label: string;
  active: boolean;
  badge?: number;
  onClick?: () => void;
};

function CartIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="9" cy="20" r="1" />
      <circle cx="20" cy="20" r="1" />
      <path d="M1 1h4l2.68 13.39A2 2 0 0 0 9.64 16H19a2 2 0 0 0 1.94-1.5L23 6H6" />
    </svg>
  );
}

function NavItem({ href, label, active, badge, onClick }: NavItemProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`relative inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
        active
          ? 'text-white shadow-sm'
          : 'text-gray-700 hover:bg-white hover:text-gray-900'
      }`}
      style={active ? { background: 'var(--primary)' } : {}}
    >
      <span>{label}</span>

      {badge && badge > 0 ? (
        <span
          className={`inline-flex min-h-[22px] min-w-[22px] items-center justify-center rounded-full px-1 text-xs font-bold ${
            active ? 'bg-white text-black' : 'text-white'
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
  const pathname = usePathname();
  const router = useRouter();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartBadge = hydrated ? totalItems : 0;

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    router.push('/');
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const showCustomerLinks = user?.role === 'CUSTOMER';

  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur-xl"
      style={{
        background: 'rgba(255, 250, 245, 0.94)',
        borderColor: 'var(--border-soft)',
      }}
    >
      <div className="app-container py-4">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <Image
              src={LogoImg}
              alt="Pollería el Sabrosito"
              width={58}
              height={58}
              className="rounded-full object-cover"
              priority
            />

            <div className="min-w-0 leading-tight">
              <p
                className="truncate text-lg font-extrabold tracking-tight sm:text-2xl"
                style={{ color: 'var(--dark)' }}
              >
                Pollería el Sabrosito
              </p>
              <p
                className="hidden text-xs sm:block"
                style={{ color: 'var(--text-soft)' }}
              >
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

            {showCustomerLinks ? (
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
            ) : !user ? (
              <NavItem
                href="/carrito"
                label="Carrito"
                active={pathname === '/carrito'}
                badge={cartBadge}
              />
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
                  className="hidden items-center rounded-full px-4 py-2 text-sm xl:flex"
                  style={{
                    background: '#fff',
                    color: 'var(--text-soft)',
                    border: '1px solid var(--border-soft)',
                  }}
                >
                  Hola, <span className="ml-1 font-semibold" style={{ color: 'var(--text-main)' }}>{user.first_name}</span>
                </div>

                <Link
                  href="/carrito"
                  className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white transition hover:opacity-95"
                  style={{ background: 'var(--primary)' }}
                >
                  <CartIcon />
                  <span>Carrito</span>
                  {cartBadge > 0 ? (
                    <span className="inline-flex min-h-[22px] min-w-[22px] items-center justify-center rounded-full bg-white px-1 text-xs font-bold text-black">
                      {cartBadge}
                    </span>
                  ) : null}
                </Link>

                <button onClick={handleLogout} className="btn-secondary">
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="flex h-11 w-11 items-center justify-center rounded-2xl border lg:hidden"
            style={{
              borderColor: 'var(--border-soft)',
              background: '#fff',
              color: 'var(--dark)',
            }}
            aria-label="Abrir menú"
          >
            <span className="text-xl">{mobileMenuOpen ? '✕' : '☰'}</span>
          </button>
        </div>

        {mobileMenuOpen ? (
          <div
            className="mt-4 rounded-[28px] border p-4 shadow-sm lg:hidden"
            style={{
              background: 'rgba(255,255,255,0.97)',
              borderColor: 'var(--border-soft)',
            }}
          >
            <div className="grid gap-3">
              <NavItem
                href="/"
                label="Inicio"
                active={pathname === '/'}
                onClick={closeMobileMenu}
              />
              <NavItem
                href="/menu"
                label="Carta"
                active={pathname === '/menu'}
                onClick={closeMobileMenu}
              />
              <NavItem
                href="/promociones"
                label="Promociones"
                active={pathname === '/promociones'}
                onClick={closeMobileMenu}
              />
              <NavItem
                href="/carrito"
                label="Carrito"
                active={pathname === '/carrito'}
                badge={cartBadge}
                onClick={closeMobileMenu}
              />

              {showCustomerLinks ? (
                <>
                  <NavItem
                    href="/profile/pedidos"
                    label="Mis pedidos"
                    active={pathname.startsWith('/profile/pedidos')}
                    onClick={closeMobileMenu}
                  />
                  <NavItem
                    href="/profile/direcciones"
                    label="Direcciones"
                    active={pathname.startsWith('/profile/direcciones')}
                    onClick={closeMobileMenu}
                  />
                </>
              ) : null}

              {user?.role === 'WORKER' ? (
                <NavItem
                  href="/worker/pedidos"
                  label="Worker"
                  active={pathname.startsWith('/worker')}
                  onClick={closeMobileMenu}
                />
              ) : null}

              {user?.role === 'ADMIN' ? (
                <NavItem
                  href="/admin/dashboard"
                  label="Admin"
                  active={pathname.startsWith('/admin')}
                  onClick={closeMobileMenu}
                />
              ) : null}

              <div
                className="my-1 border-t"
                style={{ borderColor: 'var(--border-soft)' }}
              />

              {!user ? (
                <div className="grid gap-3">
                  <Link
                    href="/login"
                    onClick={closeMobileMenu}
                    className="btn-secondary w-full"
                  >
                    Ingresar
                  </Link>
                  <Link
                    href="/registro"
                    onClick={closeMobileMenu}
                    className="btn-primary w-full"
                  >
                    Registrarme
                  </Link>
                </div>
              ) : (
                <div className="grid gap-3">
                  <div
                    className="rounded-2xl px-4 py-3 text-sm"
                    style={{
                      background: '#fff',
                      color: 'var(--text-soft)',
                      border: '1px solid var(--border-soft)',
                    }}
                  >
                    Hola, <span style={{ color: 'var(--text-main)' }}>{user.first_name}</span>
                  </div>

                  <button onClick={handleLogout} className="btn-secondary w-full">
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
