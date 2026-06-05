import Link from 'next/link';
import { companyInfo } from '@/features/legal/constants/company-info';

const deliveryPhone = companyInfo.phone || '+51 914 934 631';

export default function TerminosPage() {
  return (
    <div className="app-container py-12">
      <section className="overflow-hidden rounded-[36px] border bg-white shadow-sm" style={{ borderColor: 'var(--border-soft)' }}>
        <div className="bg-gradient-to-br from-[#2b1c14] via-[#7c3f1e] to-[#d89a4d] px-6 py-12 text-white md:px-10 md:py-16">
          <span className="inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-bold backdrop-blur">
            Términos y condiciones
          </span>
          <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-tight md:text-6xl">
            Condiciones del servicio online de {companyInfo.commercialName}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-white/85">
            Este documento informa las reglas principales para usar nuestra plataforma,
            registrar pedidos, solicitar delivery o recojo en tienda, y gestionar cambios,
            incidencias o devoluciones.
          </p>
        </div>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="h-fit rounded-[28px] border bg-white p-5 shadow-sm" style={{ borderColor: 'var(--border-soft)' }}>
          <h2 className="text-sm font-black uppercase tracking-[0.2em]" style={{ color: 'var(--primary)' }}>
            Contenido
          </h2>
          <nav className="mt-4 space-y-2 text-sm font-semibold text-gray-600">
            <a className="block rounded-2xl px-3 py-2 hover:bg-orange-50" href="#servicio">1. Condición del servicio</a>
            <a className="block rounded-2xl px-3 py-2 hover:bg-orange-50" href="#aceptacion">2. Aceptación</a>
            <a className="block rounded-2xl px-3 py-2 hover:bg-orange-50" href="#importante">3. Información importante</a>
            <a className="block rounded-2xl px-3 py-2 hover:bg-orange-50" href="#cambios">4. Cambios y devoluciones</a>
            <a className="block rounded-2xl px-3 py-2 hover:bg-orange-50" href="#ofertas">5. Ofertas y precios</a>
          </nav>
        </aside>

        <div className="space-y-6 rounded-[32px] border bg-white p-6 leading-8 shadow-sm md:p-8" style={{ borderColor: 'var(--border-soft)' }}>
          <section id="servicio">
            <h2 className="text-3xl font-black" style={{ color: 'var(--dark)' }}>
              1. Condición de nuestro servicio
            </h2>
            <p className="mt-4 text-gray-600">
              En nuestro sitio web de {companyInfo.commercialName}, ponemos a disposición de
              nuestros clientes un canal online para revisar productos, promociones, registrar
              pedidos y elegir modalidad de atención. Al utilizar la plataforma, usted acepta
              estos términos y condiciones. Si no está de acuerdo, le solicitamos no utilizar el
              sitio web ni registrar pedidos a través de este medio.
            </p>
            <p className="mt-4 text-gray-600">
              El servicio online está dirigido al público en general y busca brindar información
              clara para que el cliente pueda elegir su pedido de forma responsable y segura.
            </p>
          </section>

          <section id="aceptacion" className="border-t pt-6" style={{ borderColor: 'var(--border-soft)' }}>
            <h2 className="text-3xl font-black" style={{ color: 'var(--dark)' }}>
              2. Aceptación de términos
            </h2>
            <p className="mt-4 text-gray-600">
              El servicio online de {companyInfo.commercialName} está disponible para los clientes
              bajo responsabilidad de uso adecuado. Si detecta una falla en la plataforma, le
              pedimos reportarla a nuestro canal de atención: {deliveryPhone}.
            </p>
            <p className="mt-4 rounded-2xl bg-orange-50 px-4 py-3 text-sm font-bold text-orange-800">
              Nota: El costo de delivery no siempre está incluido en el precio del producto y puede
              variar según ubicación, cobertura y condiciones operativas.
            </p>
          </section>

          <section id="importante" className="border-t pt-6" style={{ borderColor: 'var(--border-soft)' }}>
            <h2 className="text-3xl font-black" style={{ color: 'var(--dark)' }}>
              3. Información importante
            </h2>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <article className="rounded-3xl bg-[#fff7ed] p-5">
                <h3 className="text-xl font-black text-orange-900">3.1 Zona de reparto</h3>
                <p className="mt-3 text-sm leading-7 text-orange-900/75">
                  Las zonas de reparto deben ser validadas con la dirección registrada por cada
                  cliente. La atención está sujeta a cobertura y disponibilidad de la sucursal.
                </p>
              </article>

              <article className="rounded-3xl bg-[#f7f4ef] p-5">
                <h3 className="text-xl font-black text-gray-900">3.2 Costo de delivery</h3>
                <p className="mt-3 text-sm leading-7 text-gray-600">
                  El costo de delivery puede iniciar desde S/ 4.00 y variar según ubicación,
                  distancia, zona de reparto o condiciones del servicio.
                </p>
              </article>

              <article className="rounded-3xl bg-[#fff2d9] p-5">
                <h3 className="text-xl font-black text-yellow-900">3.3 Programación</h3>
                <p className="mt-3 text-sm leading-7 text-yellow-900/75">
                  El tiempo promedio de entrega puede variar entre 35 y 50 minutos. Este plazo es
                  referencial y puede cambiar por alta demanda, tráfico o fechas festivas.
                </p>
              </article>
            </div>
          </section>

          <section id="cambios" className="border-t pt-6" style={{ borderColor: 'var(--border-soft)' }}>
            <h2 className="text-3xl font-black" style={{ color: 'var(--dark)' }}>
              4. Política de cambios y/o devoluciones
            </h2>
            <p className="mt-4 text-gray-600">
              {companyInfo.commercialName} evaluará las solicitudes de cambio o devolución según
              el estado del pedido, producto entregado, tiempo transcurrido y causa reportada.
            </p>

            <div className="mt-5 space-y-5">
              <div className="rounded-3xl border p-5" style={{ borderColor: 'var(--border-soft)' }}>
                <h3 className="text-2xl font-black text-gray-900">4.1 Producto entregado</h3>
                <ul className="mt-3 list-disc space-y-2 pl-6 text-gray-600">
                  <li>Si el producto no corresponde a lo solicitado, el caso será revisado.</li>
                  <li>Si el error corresponde al cliente, no procederá el cambio.</li>
                  <li>Si el error corresponde a la empresa, se gestionará el cambio del producto.</li>
                  <li>Si el producto entregado es correcto, no se realizará cambio.</li>
                </ul>
              </div>

              <div className="rounded-3xl border p-5" style={{ borderColor: 'var(--border-soft)' }}>
                <h3 className="text-2xl font-black text-gray-900">4.2 Producto no entregado</h3>
                <p className="mt-3 text-gray-600">
                  El cliente puede solicitar una modificación dentro de los 15 minutos posteriores
                  al registro del pedido, comunicándose al número {deliveryPhone}. La atención de
                  la solicitud dependerá del estado de preparación del pedido.
                </p>
              </div>

              <div className="rounded-3xl border p-5" style={{ borderColor: 'var(--border-soft)' }}>
                <h3 className="text-2xl font-black text-gray-900">4.3 Devoluciones</h3>
                <ul className="mt-3 list-disc space-y-2 pl-6 text-gray-600">
                  <li>Si el producto no corresponde a lo solicitado, el caso será analizado.</li>
                  <li>Si el error corresponde al cliente, no procederá cambio ni devolución.</li>
                  <li>Si el error corresponde a la empresa, procederá cambio o devolución según evaluación.</li>
                  <li>Si el producto es correcto, no se realizará devolución.</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="ofertas" className="border-t pt-6" style={{ borderColor: 'var(--border-soft)' }}>
            <h2 className="text-3xl font-black" style={{ color: 'var(--dark)' }}>
              5. Ofertas y precios bajos
            </h2>
            <p className="mt-4 text-gray-600">
              Las ofertas, descuentos y precios especiales publicados en el sitio web aplican solo
              para compras o pedidos online, salvo comunicación expresa. Los precios en tienda
              física pueden variar por sucursal, stock o condiciones comerciales.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/politicas" className="btn-secondary">Ver políticas</Link>
              <Link href="/libro-reclamaciones" className="btn-primary">Libro de Reclamaciones</Link>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
