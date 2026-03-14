'use client';

import { useAuth } from '@/hooks/use-auth';

type Props = {
  children: React.ReactNode;
};

export function RequireCustomer({ children }: Props) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="app-container py-10">Cargando...</div>;
  }

  if (!user || user.role !== 'CUSTOMER') {
    return (
      <div className="app-container py-10">
        <div className="soft-card p-6">
          <h2 className="text-xl font-bold" style={{ color: 'var(--dark)' }}>
            No autorizado
          </h2>
          <p className="mt-2 text-sm" style={{ color: 'var(--text-soft)' }}>
            Debes iniciar sesión como cliente para acceder a esta sección.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}