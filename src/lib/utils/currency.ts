export function formatCurrency(value: number | string) {
  const numeric = typeof value === 'string' ? Number(value) : value;

  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN',
  }).format(numeric);
}