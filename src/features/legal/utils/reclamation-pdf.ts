import { companyInfo } from '../constants/company-info';
import { Reclamation } from '../types';

type PdfLine = {
  text: string;
  size?: number;
  gapAfter?: number;
};

const PAGE_WIDTH = 595;
const PAGE_HEIGHT = 842;
const MARGIN_X = 48;
const START_Y = 795;
const END_Y = 58;

function toDisplayDate(value: string) {
  return new Intl.DateTimeFormat('es-PE', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

function formatMoney(value: string | null) {
  if (!value) return 'No indicado';
  const amount = Number(value);

  if (Number.isNaN(amount)) return value;

  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN',
  }).format(amount);
}

function labelGoodType(value: Reclamation['good_type']) {
  return value === 'PRODUCT' ? 'Producto' : 'Servicio';
}

function labelClaimType(value: Reclamation['claim_type']) {
  return value === 'RECLAMO' ? 'Reclamo' : 'Queja';
}

function sanitizePdfText(value: string) {
  return value
    .replace(/–|—/g, '-')
    .replace(/“|”/g, '"')
    .replace(/‘|’/g, "'")
    .replace(/•/g, '-')
    .replace(/[^	\n\r\x20-\xFF]/g, '')
    .trim();
}

function escapePdfText(value: string) {
  return sanitizePdfText(value).replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
}

function wrapText(text: string, maxChars = 88) {
  const cleanText = sanitizePdfText(text);
  const words = cleanText.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = '';

  words.forEach((word) => {
    const next = current ? `${current} ${word}` : word;

    if (next.length > maxChars && current) {
      lines.push(current);
      current = word;
      return;
    }

    current = next;
  });

  if (current) lines.push(current);

  return lines.length > 0 ? lines : ['-'];
}

function createLines(reclamation: Reclamation): PdfLine[] {
  return [
    { text: 'LIBRO DE RECLAMACIONES VIRTUAL', size: 17, gapAfter: 16 },
    { text: `Código de reclamo: ${reclamation.claim_code}`, size: 12 },
    { text: `Fecha de registro: ${toDisplayDate(reclamation.created_at)}`, size: 10, gapAfter: 12 },

    { text: '1. Identificación del proveedor', size: 13, gapAfter: 8 },
    { text: `Nombre comercial: ${companyInfo.commercialName}` },
    { text: `Razón social: ${companyInfo.legalName}` },
    { text: `RUC: ${companyInfo.ruc}` },
    { text: `Dirección fiscal: ${companyInfo.fiscalAddress}` },
    { text: `Correo de atención: ${companyInfo.email}`, gapAfter: 12 },

    { text: '2. Identificación del consumidor', size: 13, gapAfter: 8 },
    { text: `Nombres y apellidos: ${reclamation.consumer_full_name}` },
    {
      text: `Documento: ${reclamation.consumer_document_type} ${reclamation.consumer_document_number}`,
    },
    { text: `Correo: ${reclamation.consumer_email}` },
    { text: `Teléfono: ${reclamation.consumer_phone ?? 'No indicado'}` },
    { text: `Dirección: ${reclamation.consumer_address ?? 'No indicada'}` },
    {
      text: `Menor de edad: ${reclamation.is_minor ? 'Sí' : 'No'}`,
    },
    {
      text: `Apoderado: ${reclamation.guardian_full_name ?? 'No aplica'}`,
      gapAfter: 12,
    },

    { text: '3. Bien contratado', size: 13, gapAfter: 8 },
    { text: `Tipo: ${labelGoodType(reclamation.good_type)}` },
    { text: `Sucursal: ${reclamation.branch_name_snapshot ?? 'No indicada'}` },
    { text: `Pedido asociado: ${reclamation.order_number ?? 'No indicado'}` },
    { text: `Monto reclamado: ${formatMoney(reclamation.amount)}` },
    { text: `Descripción: ${reclamation.description}`, gapAfter: 12 },

    { text: '4. Detalle de la reclamación', size: 13, gapAfter: 8 },
    { text: `Tipo de solicitud: ${labelClaimType(reclamation.claim_type)}` },
    { text: `Detalle: ${reclamation.detail}` },
    { text: `Pedido del consumidor: ${reclamation.requested_solution}`, gapAfter: 12 },

    { text: '5. Constancia', size: 13, gapAfter: 8 },
    {
      text:
        'La presentación de este reclamo o queja no impide acudir a otros medios de solución de controversias ni limita el ejercicio de derechos reconocidos por la normativa peruana.',
    },
    {
      text:
        'Esta constancia fue generada automáticamente desde el Libro de Reclamaciones Virtual.',
    },
  ];
}

function paginate(lines: PdfLine[]) {
  const pages: PdfLine[][] = [];
  let currentPage: PdfLine[] = [];
  let y = START_Y;

  lines.forEach((line) => {
    const wrapped = wrapText(line.text, line.size && line.size >= 13 ? 72 : 88).map((text) => ({
      ...line,
      text,
    }));

    wrapped.forEach((wrappedLine, index) => {
      const lineHeight = (wrappedLine.size ?? 10) + 5;
      const gapAfter = index === wrapped.length - 1 ? wrappedLine.gapAfter ?? 4 : 2;

      if (y - lineHeight < END_Y) {
        pages.push(currentPage);
        currentPage = [];
        y = START_Y;
      }

      currentPage.push({ ...wrappedLine, gapAfter });
      y -= lineHeight + gapAfter;
    });
  });

  if (currentPage.length > 0) pages.push(currentPage);

  return pages;
}

function buildContentStream(lines: PdfLine[], pageIndex: number, totalPages: number) {
  let y = START_Y;
  let content = '';

  lines.forEach((line) => {
    const size = line.size ?? 10;
    content += `BT /F1 ${size} Tf ${MARGIN_X} ${y} Td (${escapePdfText(line.text)}) Tj ET\n`;
    y -= size + 5 + (line.gapAfter ?? 4);
  });

  content += `BT /F1 8 Tf ${MARGIN_X} 34 Td (${escapePdfText(
    `${companyInfo.commercialName} - Página ${pageIndex + 1} de ${totalPages}`,
  )}) Tj ET\n`;

  return content;
}

function toLatin1Bytes(value: string) {
  const bytes = new Uint8Array(value.length);

  for (let index = 0; index < value.length; index += 1) {
    bytes[index] = value.charCodeAt(index) & 0xff;
  }

  return bytes;
}

function buildPdf(lines: PdfLine[]) {
  const pages = paginate(lines);
  const objects: string[] = [];
  const pageObjectIds: number[] = [];

  objects[0] = '<< /Type /Catalog /Pages 2 0 R >>';
  objects[2] = '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>';

  pages.forEach((pageLines, index) => {
    const pageObjectId = 4 + index * 2;
    const contentObjectId = pageObjectId + 1;
    const content = buildContentStream(pageLines, index, pages.length);

    pageObjectIds.push(pageObjectId);
    objects[pageObjectId - 1] = `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_WIDTH} ${PAGE_HEIGHT}] /Resources << /Font << /F1 3 0 R >> >> /Contents ${contentObjectId} 0 R >>`;
    objects[contentObjectId - 1] = `<< /Length ${content.length} >>\nstream\n${content}endstream`;
  });

  objects[1] = `<< /Type /Pages /Count ${pages.length} /Kids [${pageObjectIds
    .map((id) => `${id} 0 R`)
    .join(' ')}] >>`;

  let pdf = '%PDF-1.4\n';
  const offsets = [0];

  objects.forEach((object, index) => {
    offsets[index + 1] = pdf.length;
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });

  
  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += '0000000000 65535 f \n';
  offsets.slice(1).forEach((offset) => {
    pdf += `${String(offset).padStart(10, '0')} 00000 n \n`;
  });
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

  return toLatin1Bytes(pdf);
}

export function downloadReclamationPdf(reclamation: Reclamation) {
  const pdfBytes = buildPdf(createLines(reclamation));
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = `libro-reclamaciones-${reclamation.claim_code}.pdf`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
