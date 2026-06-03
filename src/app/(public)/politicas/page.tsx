import Link from 'next/link';
import { companyInfo } from '@/features/legal/constants/company-info';

export default function PoliticasPage() {
  return (
    <div className="page-shell">
      <div className="app-container py-10">
      <section className="max-w-4xl">
        <span className="chip-soft">Políticas del servicio</span>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight md:text-5xl" style={{ color: 'var(--dark)' }}>
          Políticas de atención, delivery y privacidad
        </h1>
        <p className="mt-4 text-base leading-8" style={{ color: 'var(--text-soft)' }}>
          Estas políticas explican cómo {companyInfo.commercialName} atiende pedidos,
          promociones, cambios, reclamos y tratamiento básico de datos de contacto.
        </p>
      </section>

      <section className="mt-8 space-y-5 rounded-[32px] border bg-white p-6 leading-8 shadow-sm md:p-8" style={{ borderColor: 'var(--border-soft)' }}>
        <div>
          <h2 className="text-2xl font-extrabold" style={{ color: 'var(--dark)' }}>1. Atención de pedidos</h2>
          <p className="mt-2 text-gray-600">
            Los pedidos se atienden según disponibilidad de productos, cobertura de la sucursal,
            horario de atención y confirmación del pago cuando corresponda.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-extrabold" style={{ color: 'var(--dark)' }}>2. Delivery y recojo en tienda</h2>
          <p className="mt-2 text-gray-600">
            Los tiempos de entrega son referenciales y pueden variar por demanda, distancia,
            clima, tráfico o causas ajenas a la operación de la pollería.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-extrabold" style={{ color: 'var(--dark)' }}>3. Promociones</h2>
          <p className="mt-2 text-gray-600">
            Las promociones están sujetas a vigencia, stock y disponibilidad por sucursal. Una
            promoción puede no aplicar junto con otros descuentos salvo comunicación expresa.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-extrabold" style={{ color: 'var(--dark)' }}>4. Cambios o incidencias</h2>
          <p className="mt-2 text-gray-600">
            Si existe una incidencia con el pedido, el cliente puede comunicarse mediante los
            canales de atención o registrar una solicitud en el Libro de Reclamaciones Virtual.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-extrabold" style={{ color: 'var(--dark)' }}>5. Datos personales</h2>
          <p className="mt-2 text-gray-600">
            Los datos de contacto se utilizan para gestionar pedidos, comprobantes, atención al
            cliente, reclamos y comunicaciones relacionadas con el servicio solicitado.
          </p>
        </div>

        <div className="pt-2">
          <Link href="/libro-reclamaciones" className="btn-primary">
            Registrar reclamo o queja
          </Link>
        </div>
      </section>
      </div>
    </div>
  );
}
