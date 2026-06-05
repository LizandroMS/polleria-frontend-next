import Link from 'next/link';
import { companyInfo } from '@/features/legal/constants/company-info';

const dataBlocks = [
  {
    title: 'Compras',
    items: [
      'Procesar la compra o pedido realizado con el consentimiento del cliente.',
      'Establecer un canal de comunicación sobre el estado del pedido.',
      'Crear un historial de ventas para fines operativos y estadísticos.',
    ],
  },
  {
    title: 'Contáctenos',
    items: ['Atender comentarios, consultas, dudas o solicitudes enviadas por el cliente.'],
  },
  {
    title: 'Quejas y reclamos',
    items: [
      'Responder quejas y/o reclamos del titular de datos personales.',
      'Registrar y cumplir con la normativa de protección al consumidor.',
    ],
  },
  {
    title: 'Proveedores',
    items: [
      'Gestionar órdenes de pago, compras y operaciones relacionadas con proveedores.',
    ],
  },
];

export default function PoliticasPage() {
  return (
    <div className="app-container py-12">
      <section className="overflow-hidden rounded-[36px] border bg-white shadow-sm" style={{ borderColor: 'var(--border-soft)' }}>
        <div className="bg-gradient-to-br from-[#112018] via-[#42633a] to-[#d6a14d] px-6 py-12 text-white md:px-10 md:py-16">
          <span className="inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-bold backdrop-blur">
            Políticas y privacidad
          </span>
          <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-tight md:text-6xl">
            Tratamiento de datos y políticas de atención
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-white/85">
            Conoce cómo {companyInfo.commercialName} usa los datos necesarios para atender
            pedidos, consultas, reclamos y comunicaciones relacionadas con el servicio.
          </p>
        </div>
      </section>

      <section className="mt-8 space-y-6 rounded-[32px] border bg-white p-6 leading-8 shadow-sm md:p-8" style={{ borderColor: 'var(--border-soft)' }}>
        <div>
          <h2 className="text-3xl font-black" style={{ color: 'var(--dark)' }}>
            1. Finalidad
          </h2>
          <p className="mt-3 text-gray-600">
            Los datos personales se utilizan para gestionar la atención comercial y operativa de
            la plataforma. Las finalidades principales son las siguientes:
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {dataBlocks.map((block) => (
              <article key={block.title} className="rounded-3xl border p-5" style={{ borderColor: 'var(--border-soft)' }}>
                <h3 className="text-xl font-black text-gray-900">{block.title}</h3>
                <ul className="mt-3 list-disc space-y-2 pl-6 text-sm leading-7 text-gray-600">
                  {block.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>

        <div className="border-t pt-6" style={{ borderColor: 'var(--border-soft)' }}>
          <h2 className="text-3xl font-black" style={{ color: 'var(--dark)' }}>
            2. Datos personales obligatorios
          </h2>
          <p className="mt-3 text-gray-600">
            Para cumplir las finalidades anteriores, puede ser necesario solicitar nombres,
            apellidos, DNI, pasaporte o carné de extranjería, RUC, domicilio, correo electrónico,
            teléfono, firma, voz, cargo, razón social o cuentas bancarias, según corresponda al
            tipo de relación con el cliente o proveedor.
          </p>
        </div>

        <div className="border-t pt-6" style={{ borderColor: 'var(--border-soft)' }}>
          <h2 className="text-3xl font-black" style={{ color: 'var(--dark)' }}>
            3. Consecuencias de no proporcionar datos
          </h2>
          <p className="mt-3 text-gray-600">
            De no proporcionar los datos obligatorios, no se podrá brindar el servicio solicitado,
            atender pedidos, emitir comprobantes, responder consultas o gestionar reclamos.
          </p>
        </div>

        <div className="border-t pt-6" style={{ borderColor: 'var(--border-soft)' }}>
          <h2 className="text-3xl font-black" style={{ color: 'var(--dark)' }}>
            4. Destinatarios
          </h2>
          <p className="mt-3 text-gray-600">
            Los datos pueden ser compartidos con proveedores tecnológicos, servicios de hosting,
            pasarelas o canales de comunicación, la empresa responsable del servicio y autoridades
            administrativas cuando la legislación vigente lo requiera.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-gray-600">
            <li>Servicios de infraestructura y hosting, como Railway u otros proveedores.</li>
            <li>{companyInfo.legalName} como empresa responsable de la atención.</li>
            <li>Administración pública, cuando exista obligación legal.</li>
          </ul>
        </div>

        <div className="border-t pt-6" style={{ borderColor: 'var(--border-soft)' }}>
          <h2 className="text-3xl font-black" style={{ color: 'var(--dark)' }}>
            5. Transferencias
          </h2>
          <p className="mt-3 text-gray-600">
            Según los proveedores tecnológicos utilizados, cierta información puede alojarse o
            procesarse en servicios de nube ubicados fuera del Perú, cumpliendo las medidas de
            seguridad disponibles por dichos proveedores.
          </p>
        </div>

        <div className="border-t pt-6" style={{ borderColor: 'var(--border-soft)' }}>
          <h2 className="text-3xl font-black" style={{ color: 'var(--dark)' }}>
            6. Banco de datos
          </h2>
          <p className="mt-3 text-gray-600">
            Los datos pueden incorporarse a bancos de datos de clientes, usuarios de la página web,
            quejas y reclamos, o proveedores, según corresponda. Yo debo mantener estos registros
            actualizados con la información legal real de la empresa.
          </p>
        </div>

        <div className="border-t pt-6" style={{ borderColor: 'var(--border-soft)' }}>
          <h2 className="text-3xl font-black" style={{ color: 'var(--dark)' }}>
            7. Tiempo de conservación
          </h2>
          <p className="mt-3 text-gray-600">
            Los datos se conservarán mientras sean necesarios para cumplir las finalidades del
            servicio, obligaciones legales, atención de reclamos o hasta que el titular solicite su
            cancelación cuando corresponda.
          </p>
        </div>

        <div className="border-t pt-6" style={{ borderColor: 'var(--border-soft)' }}>
          <Link href="/libro-reclamaciones" className="btn-primary">
            Registrar reclamo o queja
          </Link>
        </div>
      </section>
    </div>
  );
}
