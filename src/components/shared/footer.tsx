import Link from 'next/link';
import { companyInfo } from '@/features/legal/constants/company-info';

export function Footer() {
  return (
    <footer className="border-t" style={{ background: '#2a1810', borderColor: 'rgba(255,255,255,0.08)' }}>
      <div className="app-container py-10 text-white">
        <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
          <div>
            <div className="inline-flex rounded-full bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#f2b85b]">
              Pollería digital
            </div>
            <h3 className="mt-4 text-2xl font-black">{companyInfo.commercialName}</h3>
            <p className="mt-3 text-sm leading-7 text-white/70">
              Pedidos rápidos, promociones activas y atención clara para que tus clientes compren con confianza.
            </p>
            <p className="mt-4 text-xs leading-5 text-white/55">RUC: {companyInfo.ruc}</p>
          </div>

          <div>
            <h4 className="text-sm font-extrabold uppercase tracking-wide text-white">Navegación</h4>
            <div className="mt-4 space-y-3 text-sm text-white/70">
              <Link className="block transition hover:text-white" href="/">Inicio</Link>
              <Link className="block transition hover:text-white" href="/menu">Carta</Link>
              <Link className="block transition hover:text-white" href="/promociones">Promociones</Link>
              <Link className="block transition hover:text-white" href="/carrito">Carrito</Link>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-extrabold uppercase tracking-wide text-white">Atención</h4>
            <div className="mt-4 space-y-3 text-sm text-white/70">
              <p>Delivery y recojo</p>
              <p>Promociones por sucursal</p>
              <p>{companyInfo.phone}</p>
              <p>{companyInfo.attentionHours}</p>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-extrabold uppercase tracking-wide text-white">Legal y consumidor</h4>
            <div className="mt-4 space-y-3 text-sm text-white/70">
              <Link className="block font-bold text-[#f2b85b] transition hover:text-white" href="/libro-reclamaciones">
                Libro de Reclamaciones Virtual
              </Link>
              <Link className="block transition hover:text-white" href="/empresa">Identificación de la Empresa</Link>
              <Link className="block transition hover:text-white" href="/politicas">Políticas de atención y privacidad</Link>
              <Link className="block transition hover:text-white" href="/terminos">Términos y condiciones</Link>
              <a className="block transition hover:text-white" href={companyInfo.sunatRucUrl} target="_blank" rel="noreferrer">
                Consulta RUC SUNAT
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-white/10 pt-6 text-sm text-white/55 md:flex-row md:items-center md:justify-between">
          <span>© 2026 {companyInfo.commercialName}. Todos los derechos reservados.</span>
          <span>{companyInfo.legalName}</span>
        </div>
      </div>
    </footer>
  );
}
