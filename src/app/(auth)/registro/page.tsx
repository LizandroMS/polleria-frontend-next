'use client';

import Link from 'next/link';
import { useRegister } from '@/features/auth/hooks/use-register';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function getSafeRedirect(defaultPath: string) {
  if (typeof window === 'undefined') return defaultPath;

  const redirect = new URLSearchParams(window.location.search).get('redirect');

  // Nota para mí: solo permito rutas internas para evitar redirecciones externas.
  if (!redirect || !redirect.startsWith('/') || redirect.startsWith('//')) {
    return defaultPath;
  }

  return redirect;
}

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
    <div className="page-shell">
      <div className="app-container">
        <div className="mx-auto grid max-w-6xl overflow-hidden rounded-[36px] border shadow-xl lg:grid-cols-[0.95fr_1.05fr]" style={{ borderColor: 'var(--border-soft)', background: 'white' }}>
          <section className="relative hidden overflow-hidden p-10 text-white lg:block" style={{ background: 'linear-gradient(135deg, #2f2118 0%, #4a3428 100%)' }}>
            <div className="absolute -left-16 top-10 h-52 w-52 rounded-full bg-white/10 blur-3xl" />
            <div className="relative z-10 flex h-full min-h-[620px] flex-col justify-between">
              <div>
                <span className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-bold backdrop-blur">
                  Cuenta de cliente
                </span>
                <h1 className="mt-6 max-w-lg text-5xl font-black leading-tight tracking-tight">
                  Crea tu cuenta y compra más rápido
                </h1>
                <p className="mt-5 max-w-lg text-base leading-8 text-white/78">
                  Guarda tus datos, direcciones y revisa el estado de tus pedidos cuando lo necesites.
                </p>
              </div>

              <div className="grid gap-4">
                <div className="rounded-[24px] bg-white/10 p-5 backdrop-blur">
                  <h3 className="text-lg font-bold">Seguimiento de pedidos</h3>
                  <p className="mt-2 text-sm text-white/75">Consulta el avance de cada pedido desde tu perfil.</p>
                </div>
                <div className="rounded-[24px] bg-white/10 p-5 backdrop-blur">
                  <h3 className="text-lg font-bold">Direcciones guardadas</h3>
                  <p className="mt-2 text-sm text-white/75">Ahorra tiempo en cada compra usando tus datos frecuentes.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="p-6 md:p-10 lg:p-12">
            <form
              className="mx-auto flex min-h-[620px] max-w-xl flex-col justify-center space-y-5"
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
                  router.push(getSafeRedirect('/checkout'));
                } catch (error) {
                  console.error(error);
                }
              }}
            >
              <div>
                <p className="section-subtitle">Registro</p>
                <h1 className="mt-2 text-4xl font-black tracking-tight" style={{ color: 'var(--dark)' }}>
                  Crear cuenta
                </h1>
                <p className="section-description">
                  Completa tus datos para finalizar pedidos y recibir atención más rápida.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <input className="input-soft" placeholder="Nombres" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                <input className="input-soft" placeholder="Apellidos" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                <input className="input-soft" placeholder="Teléfono" value={phone} onChange={(e) => setPhone(e.target.value)} />
                <input className="input-soft" placeholder="Correo" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input className="input-soft md:col-span-2" placeholder="Contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>

              {registerMutation.isError ? (
                <div className="rounded-2xl border px-4 py-3 text-sm" style={{ borderColor: '#fecaca', background: '#fff5f5', color: 'var(--danger)' }}>
                  {(registerMutation.error as Error).message}
                </div>
              ) : null}

              <button disabled={registerMutation.isPending} className="btn-primary w-full">
                {registerMutation.isPending ? 'Registrando...' : 'Crear mi cuenta'}
              </button>

              <p className="text-center text-sm" style={{ color: 'var(--text-soft)' }}>
                ¿Ya tienes cuenta?{' '}
                <Link href="/login" className="font-bold underline" style={{ color: 'var(--primary)' }}>
                  Inicia sesión
                </Link>
              </p>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
