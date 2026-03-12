'use client';

import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';

export function WorkerHeader() {
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
        background: 'rgba(255, 250, 245, 0.9)',
        borderColor: 'var(--border-soft)',
      }}
    >
      <div className="app-container flex items-center justify-between py-5">
        <div className="flex items-center gap-4">
          <div
            className="flex h-14 w-14 items-center justify-center rounded-2xl text-xl font-bold text-white shadow-sm"
            style={{ background: 'linear-gradient(135deg, #6b4f3b, #8b684e)' }}
          >
            W
          </div>

          <div>
            <h1 className="text-2xl font-extrabold tracking-tight" style={{ color: 'var(--dark)' }}>
              Panel de trabajador
            </h1>
            <p className="text-sm" style={{ color: 'var(--text-soft)' }}>
              {user?.first_name} {user?.last_name ?? ''} · {user?.email}
            </p>
          </div>
        </div>

        <button onClick={handleLogout} className="btn-secondary">
          Cerrar sesión
        </button>
      </div>
    </header>
  );
}