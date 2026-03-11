'use client';

import { useAuth } from '@/hooks/use-auth';

export function AdminHeader() {
  const { user, logout } = useAuth();

  return (
    <header
      className="sticky top-0 z-40 border-b backdrop-blur-xl"
      style={{
        background: 'rgba(255, 250, 245, 0.9)',
        borderColor: 'var(--border-soft)',
      }}
    >
      <div className="app-container flex items-center justify-between py-5">
        <div className="flex items-center gap-4">
          <div
            className="flex h-14 w-14 items-center justify-center rounded-2xl text-xl font-bold text-white shadow-sm"
            style={{ background: 'linear-gradient(135deg, var(--primary), #e08a4e)' }}
          >
            A
          </div>

          <div>
            <h1 className="text-2xl font-extrabold tracking-tight" style={{ color: 'var(--dark)' }}>
              Panel administrador
            </h1>
            <p className="text-sm" style={{ color: 'var(--text-soft)' }}>
              {user?.email}
            </p>
          </div>
        </div>

        <button onClick={logout} className="btn-secondary">
          Cerrar sesión
        </button>
      </div>
    </header>
  );
}