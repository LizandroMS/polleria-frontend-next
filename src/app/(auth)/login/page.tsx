'use client';

import { useLogin } from '@/features/auth/hooks/use-login';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const { loginSession } = useAuth();
  const loginMutation = useLogin();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-md items-center px-4 py-8">
      <form
        className="w-full rounded-2xl border bg-white p-6 shadow-sm"
        onSubmit={async (e) => {
          e.preventDefault();

          try {
            const data = await loginMutation.mutateAsync({ email, password });
            await loginSession(data.accessToken, data.user);
            router.push('/checkout');
          } catch (error) {
            console.error(error);
          }
        }}
      >
        <h1 className="text-2xl font-bold">Iniciar sesión</h1>

        <div className="mt-4 space-y-4">
          <input
            className="w-full rounded-xl border px-4 py-3"
            placeholder="Correo"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="w-full rounded-xl border px-4 py-3"
            placeholder="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {loginMutation.isError ? (
            <p className="text-sm text-red-600">
              {(loginMutation.error as Error).message}
            </p>
          ) : null}

          <button
            disabled={loginMutation.isPending}
            className="w-full rounded-xl bg-black px-5 py-3 text-white"
          >
            {loginMutation.isPending ? 'Ingresando...' : 'Ingresar'}
          </button>
        </div>
      </form>
    </div>
  );
}