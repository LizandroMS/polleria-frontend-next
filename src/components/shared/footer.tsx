import Link from 'next/link';
import { companyInfo } from '@/features/legal/constants/company-info';

export function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900">{companyInfo.commercialName}</h3>
            <p className="mt-3 text-sm leading-6 text-gray-600">
              Pedidos rápidos, promociones activas y una experiencia moderna para tus clientes.
            </p>
            <p className="mt-3 text-xs leading-5 text-gray-500">
              RUC: {companyInfo.ruc}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-900">
              Navegación
            </h4>
            <div className="mt-3 space-y-2 text-sm text-gray-600">
              <Link className="block transition hover:text-gray-900" href="/">
                Inicio
              </Link>
              <Link className="block transition hover:text-gray-900" href="/menu">
                Carta
              </Link>
              <Link className="block transition hover:text-gray-900" href="/promociones">
                Promociones
              </Link>
              <Link className="block transition hover:text-gray-900" href="/carrito">
                Carrito
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-900">
              Atención
            </h4>
            <div className="mt-3 space-y-2 text-sm text-gray-600">
              <p>Pedidos por delivery</p>
              <p>Recojo en tienda</p>
              <p>Promociones por sucursal</p>
              <p>{companyInfo.phone}</p>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-900">
              Legal y consumidor
            </h4>
            <div className="mt-3 space-y-2 text-sm text-gray-600">
              <Link className="block font-semibold transition hover:text-gray-900" href="/libro-reclamaciones">
                Libro de Reclamaciones Virtual
              </Link>
              <Link className="block transition hover:text-gray-900" href="/empresa">
                Identificación de la Empresa
              </Link>
              <Link className="block transition hover:text-gray-900" href="/politicas">
                Políticas de atención y privacidad
              </Link>
              <Link className="block transition hover:text-gray-900" href="/terminos">
                Términos y condiciones
              </Link>
              <a
                className="block transition hover:text-gray-900"
                href={companyInfo.sunatRucUrl}
                target="_blank"
                rel="noreferrer"
              >
                Consulta RUC SUNAT
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t pt-6 text-sm text-gray-500 md:flex-row md:items-center md:justify-between">
          <span>© 2026 {companyInfo.commercialName}. Todos los derechos reservados.</span>
          <span>{companyInfo.legalName}</span>
        </div>
      </div>
    </footer>
  );
}
