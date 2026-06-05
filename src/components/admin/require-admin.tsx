'use client';

import { useAuth } from '@/hooks/use-auth';

type Props = {
  children: React.ReactNode;
};

export function RequireAdmin({ children }: Props) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="mx-auto max-w-7xl px-4 py-8">Cargando...</div>;
  }

  if (!user || user.role !== 'ADMIN') {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="rounded-2xl border bg-white p-6">
          <h2 className="text-xl font-semibold">No autorizado</h2>
          <p className="mt-2 text-sm text-gray-600">
            No tienes permisos para acceder a esta sección.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}