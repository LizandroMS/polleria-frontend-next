'use client';

import { useRegister } from '@/features/auth/hooks/use-register';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function RegisterPage() {
  const router = useRouter();
  const { loginSession } = useAuth();
  const registerMutation = useRegister();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-md items-center px-4 py-8">
      <form
        className="w-full rounded-2xl border bg-white p-6 shadow-sm"
        onSubmit={async (e) => {
          e.preventDefault();

          try {
            const data = await registerMutation.mutateAsync({
              firstName,
              lastName,
              phone,
              email,
              password,
            });

            await loginSession(data.accessToken, data.user);
            router.push('/checkout');
          } catch (error) {
            console.error(error);
          }
        }}
      >
        <h1 className="text-2xl font-bold">Crear cuenta</h1>

        <div className="mt-4 space-y-4">
          <input
            className="w-full rounded-xl border px-4 py-3"
            placeholder="Nombres"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />

          <input
            className="w-full rounded-xl border px-4 py-3"
            placeholder="Apellidos"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <input
            className="w-full rounded-xl border px-4 py-3"
            placeholder="Teléfono"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

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

          {registerMutation.isError ? (
            <p className="text-sm text-red-600">
              {(registerMutation.error as Error).message}
            </p>
          ) : null}

          <button
            disabled={registerMutation.isPending}
            className="w-full rounded-xl bg-black px-5 py-3 text-white"
          >
            {registerMutation.isPending ? 'Registrando...' : 'Registrarme'}
          </button>
        </div>
      </form>
    </div>
  );
}