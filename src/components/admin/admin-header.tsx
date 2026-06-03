'use client';

import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';

export function AdminHeader() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <header
      className="sticky top-0 z-40 border-b backdrop-blur-xl"
      style={{
        background: 'rgba(255, 250, 245, 0.92)',
        borderColor: 'var(--border-soft)',
      }}
    >
      <div className="app-container flex items-center justify-between gap-4 py-4">
        <div className="flex min-w-0 items-center gap-4">
          <div
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-xl font-black text-white shadow-sm"
            style={{ background: 'linear-gradient(135deg, var(--primary), #e08a4e)' }}
          >
            A
          </div>

          <div className="min-w-0">
            <p className="section-subtitle">Panel interno</p>
            <h1 className="truncate text-xl font-extrabold tracking-tight md:text-2xl" style={{ color: 'var(--dark)' }}>
              Administración de la pollería
            </h1>
            <p className="truncate text-sm" style={{ color: 'var(--text-soft)' }}>
              {user?.email}
            </p>
          </div>
        </div>

        <button onClick={handleLogout} className="btn-secondary shrink-0">
          Cerrar sesión
        </button>
      </div>
    </header>
  );
}
