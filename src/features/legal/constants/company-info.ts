/**
 * Datos comerciales mostrados en páginas legales y constancias PDF.
 * Yo debo reemplazar estos valores en Vercel usando variables NEXT_PUBLIC_* cuando tenga los datos reales de la empresa.
 */
export const companyInfo = {
  commercialName:
    process.env.NEXT_PUBLIC_COMPANY_COMMERCIAL_NAME ?? 'Pollería el Sabrosito',
  legalName:
    process.env.NEXT_PUBLIC_COMPANY_LEGAL_NAME ?? 'Razón Social de la Empresa S.A.C.',
  ruc: process.env.NEXT_PUBLIC_COMPANY_RUC ?? '00000000000',
  fiscalAddress:
    process.env.NEXT_PUBLIC_COMPANY_FISCAL_ADDRESS ??
    'Dirección fiscal pendiente de configurar',
  phone: process.env.NEXT_PUBLIC_COMPANY_PHONE ?? '999 999 999',
  email: process.env.NEXT_PUBLIC_COMPANY_EMAIL ?? 'atencion@polleria.com',
  attentionHours:
    process.env.NEXT_PUBLIC_COMPANY_ATTENTION_HOURS ??
    'Lunes a domingo de 11:00 a.m. a 10:00 p.m.',
  sunatRucUrl: 'https://e-consultaruc.sunat.gob.pe/',
};
