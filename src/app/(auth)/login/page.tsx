'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useLogin } from '@/features/auth/hooks/use-login';
import { useAuth } from '@/hooks/use-auth';

export default function LoginPage() {
  const router = useRouter();
  const { loginSession } = useAuth();
  const loginMutation = useLogin();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div
      className="min-h-screen py-10"
      style={{
        background:
          'radial-gradient(circle at top left, #fff6eb 0%, #fffaf5 45%, #fffaf5 100%)',
      }}
    >
      <div className="app-container">
        <div className="grid overflow-hidden rounded-[36px] border shadow-xl lg:grid-cols-[1.05fr_0.95fr]">
          <section
            className="relative hidden min-h-[720px] overflow-hidden p-10 lg:block"
            style={{
              background: 'linear-gradient(135deg, #2f2118 0%, #4a3428 100%)',
            }}
          >
            <div
              className="absolute -left-12 top-10 h-40 w-40 rounded-full blur-3xl"
              style={{ background: 'rgba(232, 184, 109, 0.18)' }}
            />
            <div
              className="absolute bottom-10 right-0 h-56 w-56 rounded-full blur-3xl"
              style={{ background: 'rgba(201, 106, 61, 0.22)' }}
            />

            <div className="relative z-10 flex h-full flex-col justify-between text-white">
              <div>
                <span className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur">
                  Bienvenido nuevamente
                </span>

                <h1 className="mt-6 max-w-lg text-5xl font-extrabold leading-[1.02] tracking-tight">
                  Ingresa y continúa con tus pedidos favoritos
                </h1>

                <p className="mt-5 max-w-xl text-base leading-8 text-white/80">
                  Accede a tu cuenta para revisar tus pedidos, guardar direcciones,
                  aprovechar promociones y comprar más rápido.
                </p>
              </div>

              <div className="grid gap-4">
                <div className="rounded-[24px] bg-white/10 p-5 backdrop-blur">
                  <h3 className="text-lg font-semibold">Pedidos más rápidos</h3>
                  <p className="mt-2 text-sm text-white/80">
                    Guarda tus datos y realiza compras en menos pasos.
                  </p>
                </div>

                <div className="rounded-[24px] bg-white/10 p-5 backdrop-blur">
                  <h3 className="text-lg font-semibold">Historial y seguimiento</h3>
                  <p className="mt-2 text-sm text-white/80">
                    Revisa el estado de tus pedidos cuando quieras.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white p-6 md:p-10 lg:p-12">
            <div className="mx-auto flex min-h-[620px] max-w-md flex-col justify-center">
              <div className="mb-8">
                <p className="section-subtitle">Acceso</p>
                <h2
                  className="mt-2 text-4xl font-extrabold tracking-tight"
                  style={{ color: 'var(--dark)' }}
                >
                  Iniciar sesión
                </h2>
                <p className="mt-3 text-sm leading-7" style={{ color: 'var(--text-soft)' }}>
                  Ingresa con tu correo y contraseña para continuar.
                </p>
              </div>

              <form
                className="space-y-5"
                onSubmit={async (e) => {
                  e.preventDefault();

                  try {
                    const data = await loginMutation.mutateAsync({
                      email,
                      password,
                    });

                    await loginSession(data.accessToken, data.user);
                    router.push('/');
                  } catch (error) {
                    console.error(error);
                  }
                }}
              >
                <div className="space-y-2">
                  <label className="text-sm font-semibold" style={{ color: 'var(--text-main)' }}>
                    Correo electrónico
                  </label>
                  <input
                    className="input-soft"
                    type="email"
                    placeholder="tucorreo@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-3">
                    <label className="text-sm font-semibold" style={{ color: 'var(--text-main)' }}>
                      Contraseña
                    </label>

                    <Link
                      href="/forgot-password"
                      className="text-sm underline"
                      style={{ color: 'var(--primary)' }}
                    >
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </div>

                  <input
                    className="input-soft"
                    type="password"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                {loginMutation.isError ? (
                  <div
                    className="rounded-2xl border px-4 py-3 text-sm"
                    style={{
                      borderColor: '#f3c7c7',
                      background: '#fff4f4',
                      color: '#b42318',
                    }}
                  >
                    {(loginMutation.error as Error).message}
                  </div>
                ) : null}

                <button
                  disabled={loginMutation.isPending}
                  className="btn-primary w-full"
                >
                  {loginMutation.isPending ? 'Ingresando...' : 'Ingresar'}
                </button>
              </form>

              <div className="mt-6 rounded-[24px] border p-5" style={{ borderColor: 'var(--border-soft)' }}>
                <p className="text-sm" style={{ color: 'var(--text-soft)' }}>
                  ¿Aún no tienes cuenta?
                </p>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                  <p className="text-sm font-medium" style={{ color: 'var(--text-main)' }}>
                    Crea una cuenta y guarda tus pedidos y direcciones.
                  </p>

                  <Link href="/registro" className="btn-secondary">
                    Registrarme
                  </Link>
                </div>
              </div>

              <div className="mt-8 text-center text-xs" style={{ color: 'var(--text-soft)' }}>
                Al iniciar sesión aceptas continuar dentro de la experiencia digital de
                Pollería el Sabrosito.
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}