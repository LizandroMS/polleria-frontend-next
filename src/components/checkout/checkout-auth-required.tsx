import Link from 'next/link';

export function CheckoutAuthRequired() {
  return (
    <section className="warm-card p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="section-subtitle">Cuenta requerida</p>
          <h3 className="mt-2 text-2xl font-extrabold" style={{ color: 'var(--dark)' }}>
            Inicia sesión para continuar
          </h3>
          <p className="mt-2 text-sm leading-6" style={{ color: 'var(--text-soft)' }}>
            Necesitamos tus datos para registrar el pedido, enviar comprobantes y darte seguimiento.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/login?redirect=/checkout" className="btn-primary">
            Iniciar sesión
          </Link>
          <Link href="/registro?redirect=/checkout" className="btn-secondary">
            Crear cuenta
          </Link>
        </div>
      </div>
    </section>
  );
}
