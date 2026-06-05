import Link from 'next/link';
import { companyInfo } from '@/features/legal/constants/company-info';

export default function EmpresaPage() {
  return (
    <div className="app-container py-12">
      <section className="overflow-hidden rounded-[36px] border bg-white shadow-sm" style={{ borderColor: 'var(--border-soft)' }}>
        <div className="relative px-6 py-16 text-white md:px-10 md:py-24">
          <div className="absolute inset-0 bg-[url('/images/Todo_personal.jpg')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-black/55 to-[#c96a3d]/70" />
          <div className="relative z-10 max-w-4xl">
            <span className="inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-bold backdrop-blur">
              Sobre nosotros
            </span>
            <h1 className="mt-5 text-4xl font-black tracking-tight md:text-6xl">
              Nuestra historia, compromiso y evolución
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-white/85">
              {companyInfo.commercialName} es una empresa peruana que busca brindar sabor,
              calidad y buena atención en cada pedido.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <article className="rounded-[32px] border bg-white p-6 shadow-sm md:p-8" style={{ borderColor: 'var(--border-soft)' }}>
            <h2 className="text-3xl font-black text-green-700">Nuestra historia</h2>
            <div className="mt-5 grid gap-6 md:grid-cols-[1.2fr_0.8fr] md:items-center">
              <div className="space-y-4 text-gray-600 leading-8">
                <p>
                  Somos una empresa peruana con más de 10 años de experiencia, con un sabor ya
                  conocido por nuestros clientes. {companyInfo.commercialName} es mucho más que
                  una pollería. Nuestro primer local abrió en Jr. Alfonso Ugarte - Barranca en el
                  año 2014.
                </p>
                <p>
                  Iniciamos con un equipo de 7 trabajadores, incluidos 2 horneros, un lavaplatos,
                  un cajero y 3 encargados de atención al público. Desde entonces, hemos seguido
                  expandiéndonos con el apoyo de nuestros clientes.
                </p>
                <p>
                  Nos sentimos profundamente agradecidos con nuestros antiguos y nuevos clientes,
                  quienes nos han permitido seguir adelante con esfuerzo y dedicación, siempre
                  buscando mejorar nuestra atención.
                </p>
              </div>
              <div className="min-h-[260px] rounded-[28px] bg-[url('/images/Mascota_Tienda.jpg')] bg-cover bg-center shadow-inner" />
            </div>
          </article>

          <article className="rounded-[32px] border bg-white p-6 shadow-sm md:p-8" style={{ borderColor: 'var(--border-soft)' }}>
            <h2 className="text-3xl font-black text-yellow-600">Nuestra evolución</h2>
            <p className="mt-5 leading-8 text-gray-600">
              Desde nuestro primer local en Barranca, hemos crecido gracias a la preferencia de
              nuestros clientes. No solo hemos ampliado nuestro menú, incluyendo platos a la carta,
              chifa y parrillas, sino que también hemos buscado llegar a nuevas zonas manteniendo
              nuestra calidad en productos y atención.
            </p>
            <p className="mt-4 leading-8 text-gray-600">
              A lo largo de estos años hemos invertido en modernizar nuestras instalaciones,
              capacitar al equipo de trabajo y mejorar la experiencia del cliente en cada una de
              nuestras sucursales.
            </p>
          </article>

          <article className="rounded-[32px] border bg-white p-6 shadow-sm md:p-8" style={{ borderColor: 'var(--border-soft)' }}>
            <h2 className="text-3xl font-black text-blue-600">Agradecimiento a nuestros clientes</h2>
            <p className="mt-5 leading-8 text-gray-600">
              Nada de esto sería posible sin el apoyo incondicional de nuestros clientes.
              Agradecemos sus visitas, sus pedidos por delivery y recojo en tienda, así como sus
              comentarios en persona y redes sociales. Nos inspiran a ser mejores cada día.
            </p>
          </article>
        </div>

        <aside className="h-fit rounded-[32px] border bg-white p-6 shadow-sm" style={{ borderColor: 'var(--border-soft)' }}>
          <h2 className="text-xl font-black" style={{ color: 'var(--dark)' }}>
            Identificación de la empresa
          </h2>
          <p className="mt-3 text-sm leading-7" style={{ color: 'var(--text-soft)' }}>
            Información pública de identificación del proveedor para clientes y consumidores.
          </p>

          <dl className="mt-5 space-y-4 text-sm">
            <div>
              <dt className="font-bold text-gray-900">Nombre comercial</dt>
              <dd className="mt-1 text-gray-600">{companyInfo.commercialName}</dd>
            </div>
            <div>
              <dt className="font-bold text-gray-900">Razón social</dt>
              <dd className="mt-1 text-gray-600">{companyInfo.legalName}</dd>
            </div>
            <div>
              <dt className="font-bold text-gray-900">RUC</dt>
              <dd className="mt-1 text-gray-600">{companyInfo.ruc}</dd>
            </div>
            <div>
              <dt className="font-bold text-gray-900">Dirección fiscal</dt>
              <dd className="mt-1 text-gray-600">{companyInfo.fiscalAddress}</dd>
            </div>
            <div>
              <dt className="font-bold text-gray-900">Correo</dt>
              <dd className="mt-1 text-gray-600">{companyInfo.email}</dd>
            </div>
            <div>
              <dt className="font-bold text-gray-900">Teléfono</dt>
              <dd className="mt-1 text-gray-600">{companyInfo.phone}</dd>
            </div>
          </dl>

          <a href={companyInfo.sunatRucUrl} target="_blank" rel="noreferrer" className="btn-primary mt-6 w-full">
            Consulta RUC SUNAT
          </a>
          <Link href="/libro-reclamaciones" className="btn-secondary mt-3 w-full">
            Libro de Reclamaciones
          </Link>
        </aside>
      </section>
    </div>
  );
}
