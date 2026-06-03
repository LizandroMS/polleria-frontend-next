import Link from 'next/link';
import { companyInfo } from '@/features/legal/constants/company-info';

export default function TerminosPage() {
  return (
    <div className="page-shell">
      <div className="app-container py-10">
      <section className="max-w-4xl">
        <span className="chip-soft">Términos y condiciones</span>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight md:text-5xl" style={{ color: 'var(--dark)' }}>
          Términos y condiciones de compra
        </h1>
        <p className="mt-4 text-base leading-8" style={{ color: 'var(--text-soft)' }}>
          Al usar esta plataforma, el cliente acepta las condiciones básicas de compra,
          preparación, entrega y atención establecidas por {companyInfo.commercialName}.
        </p>
      </section>

      <section className="mt-8 space-y-5 rounded-[32px] border bg-white p-6 leading-8 shadow-sm md:p-8" style={{ borderColor: 'var(--border-soft)' }}>
        <div>
          <h2 className="text-2xl font-extrabold" style={{ color: 'var(--dark)' }}>1. Uso de la plataforma</h2>
          <p className="mt-2 text-gray-600">
            La plataforma permite consultar productos, promociones, registrar pedidos y dar
            seguimiento a la atención del pedido según disponibilidad del servicio.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-extrabold" style={{ color: 'var(--dark)' }}>2. Confirmación del pedido</h2>
          <p className="mt-2 text-gray-600">
            El pedido queda sujeto a validación de stock, datos de contacto, dirección,
            método de pago y cobertura de la sucursal seleccionada.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-extrabold" style={{ color: 'var(--dark)' }}>3. Precios y comprobantes</h2>
          <p className="mt-2 text-gray-600">
            Los precios mostrados pueden variar por sucursal o promoción. El comprobante se
            emite según los datos proporcionados por el cliente y el tipo de comprobante elegido.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-extrabold" style={{ color: 'var(--dark)' }}>4. Responsabilidad del cliente</h2>
          <p className="mt-2 text-gray-600">
            El cliente debe registrar información correcta para la atención del pedido,
            emisión de comprobante y comunicación posterior.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-extrabold" style={{ color: 'var(--dark)' }}>5. Reclamos y quejas</h2>
          <p className="mt-2 text-gray-600">
            El cliente puede presentar reclamos o quejas mediante el Libro de Reclamaciones
            Virtual disponible en el pie de página del sitio.
          </p>
        </div>

        <div className="pt-2">
          <Link href="/politicas" className="btn-secondary mr-3">
            Ver políticas
          </Link>
          <Link href="/libro-reclamaciones" className="btn-primary">
            Libro de Reclamaciones
          </Link>
        </div>
      </section>
      </div>
    </div>
  );
}
