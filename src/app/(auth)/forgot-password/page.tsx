'use client';

import { useForgotPassword } from '@/features/auth/hooks/use-forgot-password';
import Link from 'next/link';
import { useState } from 'react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const mutation = useForgotPassword();
  const [success, setSuccess] = useState(false);

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-md items-center px-4 py-8">
      <form
        className="soft-card w-full space-y-5 p-6"
        onSubmit={async (e) => {
          e.preventDefault();
          await mutation.mutateAsync(email);
          setSuccess(true);
        }}
      >
        <div>
          <p className="section-subtitle">Recuperación</p>
          <h1 className="mt-2 text-3xl font-extrabold" style={{ color: 'var(--dark)' }}>
            ¿Olvidaste tu contraseña?
          </h1>
          <p className="mt-2 text-sm" style={{ color: 'var(--text-soft)' }}>
            Ingresa tu correo y te enviaremos un enlace para restablecerla.
          </p>
        </div>

        <input
          className="input-soft"
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {mutation.isError ? (
          <p className="text-sm text-red-600">{(mutation.error as Error).message}</p>
        ) : null}

        {success ? (
          <p className="text-sm text-green-700">
            Si el correo existe, te enviamos un enlace de recuperación.
          </p>
        ) : null}

        <button className="btn-primary w-full" disabled={mutation.isPending}>
          {mutation.isPending ? 'Enviando...' : 'Enviar enlace'}
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