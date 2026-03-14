'use client';

import { Suspense, useState } from 'react';
import { useResetPassword } from '@/features/auth/hooks/use-reset-password';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token') ?? '';

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const mutation = useResetPassword();

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-md items-center px-4 py-8">
      <form
        className="soft-card w-full space-y-5 p-6"
        onSubmit={async (e) => {
          e.preventDefault();

          if (!token) {
            alert('El enlace no es válido');
            return;
          }

          if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
          }

          await mutation.mutateAsync({
            token,
            password,
          });

          router.push('/login');
        }}
      >
        <div>
          <p className="section-subtitle">Nueva contraseña</p>
          <h1 className="mt-2 text-3xl font-extrabold" style={{ color: 'var(--dark)' }}>
            Restablecer contraseña
          </h1>
          <p className="mt-2 text-sm" style={{ color: 'var(--text-soft)' }}>
            Define una nueva contraseña para tu cuenta.
          </p>
        </div>

        <input
          className="input-soft"
          type="password"
          placeholder="Nueva contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          className="input-soft"
          type="password"
          placeholder="Confirmar contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        {mutation.isError ? (
          <p className="text-sm text-red-600">{(mutation.error as Error).message}</p>
        ) : null}

        <button className="btn-primary w-full" disabled={mutation.isPending || !token}>
          {mutation.isPending ? 'Actualizando...' : 'Guardar nueva contraseña'}
        </button>

        <p className="text-center text-sm" style={{ color: 'var(--text-soft)' }}>
          <Link href="/login" className="underline">
            Volver al login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto flex min-h-[80vh] max-w-md items-center px-4 py-8">
          <div className="soft-card w-full p-6 text-sm" style={{ color: 'var(--text-soft)' }}>
            Cargando...
          </div>
        </div>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}