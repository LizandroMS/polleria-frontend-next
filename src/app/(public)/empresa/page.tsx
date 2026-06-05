import Link from 'next/link';
import { companyInfo } from '@/features/legal/constants/company-info';

export default function EmpresaPage() {
  return (
    <div className="app-container py-12">
      <section className="max-w-4xl">
        <span className="chip-soft">Información legal</span>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight md:text-5xl" style={{ color: 'var(--dark)' }}>
          Identificación de la empresa
        </h1>
        <p className="mt-4 text-base leading-8" style={{ color: 'var(--text-soft)' }}>
          Información pública de identificación del proveedor para clientes y consumidores.
          Yo debo mantener estos datos actualizados con la información real de la empresa.
        </p>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="rounded-[32px] border bg-white p-6 shadow-sm md:p-8" style={{ borderColor: 'var(--border-soft)' }}>
          <dl className="grid gap-5 text-sm md:grid-cols-2">
            <div>
              <dt className="font-semibold text-gray-900">Nombre comercial</dt>
              <dd className="mt-1 text-gray-600">{companyInfo.commercialName}</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900">Razón social</dt>
              <dd className="mt-1 text-gray-600">{companyInfo.legalName}</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900">RUC</dt>
              <dd className="mt-1 text-gray-600">{companyInfo.ruc}</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900">Teléfono</dt>
              <dd className="mt-1 text-gray-600">{companyInfo.phone}</dd>
            </div>
            <div className="md:col-span-2">
              <dt className="font-semibold text-gray-900">Dirección fiscal</dt>
              <dd className="mt-1 text-gray-600">{companyInfo.fiscalAddress}</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900">Correo de atención</dt>
              <dd className="mt-1 text-gray-600">{companyInfo.email}</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900">Horario de atención</dt>
              <dd className="mt-1 text-gray-600">{companyInfo.attentionHours}</dd>
            </div>
          </dl>
        </div>

        <aside className="rounded-[32px] border bg-white p-6 shadow-sm" style={{ borderColor: 'var(--border-soft)' }}>
          <h2 className="text-xl font-extrabold" style={{ color: 'var(--dark)' }}>
            Consulta SUNAT
          </h2>
          <p className="mt-3 text-sm leading-7" style={{ color: 'var(--text-soft)' }}>
            Puedes validar el RUC desde la consulta pública de SUNAT. Este enlace se deja como
            acceso indirecto para que el cliente pueda verificar los datos tributarios.
          </p>
          <a
            href={companyInfo.sunatRucUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-primary mt-5 w-full"
          >
            Ir a consulta RUC SUNAT
          </a>
          <Link href="/libro-reclamaciones" className="btn-secondary mt-3 w-full">
            Libro de Reclamaciones
          </Link>
        </aside>
      </section>
    </div>
  );
}
