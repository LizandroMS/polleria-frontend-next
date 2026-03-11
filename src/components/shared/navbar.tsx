'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';

export function Navbar() {
  const { user } = useAuth();

  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-bold">
          POLLERIA EL SABROSITO
        </Link>

        <nav className="flex gap-6 text-sm font-medium">
          <Link href="/">Inicio</Link>
          <Link href="/menu">Carta</Link>
          <Link href="/promociones">Promociones</Link>
          <Link href="/carrito">Carrito</Link>

          {user?.role === 'CUSTOMER' ? <Link href="/profile/pedidos">Mis pedidos</Link> : null}
          {user?.role === 'CUSTOMER' ? <Link href="/profile/direcciones">Direcciones</Link> : null}
          {user?.role === 'WORKER' ? <Link href="/worker/pedidos">Worker</Link> : null}
          {user?.role === 'ADMIN' ? <Link href="/admin/dashboard">Admin</Link> : null}

          {!user ? <Link href="/login">Ingresar</Link> : null}
        </nav>
      </div>
    </header>
  );
}