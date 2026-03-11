'use client';

import { useAuth } from '@/hooks/use-auth';

export function AdminHeader() {
  const { user, logout } = useAuth();

  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <div>
          <h1 className="text-xl font-bold">Panel administrador</h1>
          <p className="text-sm text-gray-600">{user?.email}</p>
        </div>

        <button onClick={logout} className="rounded-xl border px-4 py-2 text-sm">
          Cerrar sesión
        </button>
      </div>
    </header>
  );
}