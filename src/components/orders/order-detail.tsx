import type { OrderDetailResponse } from '@/features/orders/types';
import { formatCurrency } from '@/lib/utils/currency';

type Props = {
  data: OrderDetailResponse;
};

const ORDER_STATUS_LABELS: Record<OrderDetailResponse['order']['status'], string> = {
  PENDING: 'Pendiente',
  CONFIRMED: 'Confirmado',
  PREPARING: 'En preparación',
  READY: 'Listo',
  OUT_FOR_DELIVERY: 'En camino',
  DELIVERED: 'Entregado',
  CANCELLED: 'Cancelado',
};

const ORDER_STATUS_STYLES: Record<OrderDetailResponse['order']['status'], string> = {
  PENDING: 'bg-amber-100 text-amber-800',
  CONFIRMED: 'bg-blue-100 text-blue-800',
  PREPARING: 'bg-orange-100 text-orange-800',
  READY: 'bg-violet-100 text-violet-800',
  OUT_FOR_DELIVERY: 'bg-sky-100 text-sky-800',
  DELIVERED: 'bg-emerald-100 text-emerald-800',
  CANCELLED: 'bg-rose-100 text-rose-800',
};

const EMISSION_STATUS_LABELS: Record<OrderDetailResponse['order']['invoice_emission_status'], string> = {
  NOT_REQUIRED: 'No requerido',
  PENDING: 'Pendiente de emisión',
  PROCESSING: 'Procesando emisión',
  ISSUED: 'Emitido',
  FAILED: 'Error de emisión',
};

const EMISSION_STATUS_STYLES: Record<OrderDetailResponse['order']['invoice_emission_status'], string> = {
  NOT_REQUIRED: 'bg-gray-100 text-gray-700',
  PENDING: 'bg-amber-100 text-amber-800',
  PROCESSING: 'bg-blue-100 text-blue-800',
  ISSUED: 'bg-emerald-100 text-emerald-800',
  FAILED: 'bg-rose-100 text-rose-800',
};

const ORDER_TYPE_LABELS: Record<OrderDetailResponse['order']['order_type'], string> = {
  DELIVERY: 'Delivery',
  PICKUP: 'Recojo en tienda',
  DINE_IN: 'Consumo en local',
};

const PAYMENT_METHOD_LABELS: Record<OrderDetailResponse['order']['payment_method'], string> = {
  CASH: 'Efectivo',
  YAPE: 'Yape',
  PLIN: 'Plin',
  CARD: 'Tarjeta',
};

const PAYMENT_STATUS_LABELS: Record<OrderDetailResponse['order']['payment_status'], string> = {
  PENDING: 'Pendiente',
  PAID: 'Pagado',
  FAILED: 'Fallido',
};

const INVOICE_TYPE_LABELS: Record<OrderDetailResponse['order']['invoice_type'], string> = {
  NONE: 'Sin comprobante',
  BOLETA_SIMPLE: 'Boleta',
  FACTURA: 'Factura',
};

function formatDateTime(value?: string | null) {
  if (!value) return '—';

  return new Intl.DateTimeFormat('es-PE', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

function formatCorrelative(value?: number | null) {
  if (!value) return '—';
  return value.toString().padStart(8, '0');
}

function InfoRow({ label, value }: { label: string; value: string | null | undefined }) {
  return (
    <div className="space-y-1">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">{label}</p>
      <p className="text-sm text-gray-800">{value && value.trim() ? value : '—'}</p>
    </div>
  );
}

export function OrderDetail({ data }: Props) {
  const { order, items, history, branch, address, electronicDocument } = data;

  const customerName = order.customer_business_name_snapshot || order.customer_name_snapshot;
  const deliveryAddress =
    address?.address_line || order.customer_address_snapshot || branch?.address || 'No se registró dirección';

  const invoiceDisplayNumber = electronicDocument
    ? `${electronicDocument.series}-${formatCorrelative(electronicDocument.correlative)}`
    : 'Aún no generado';

  const canOpenPdf = Boolean(electronicDocument?.pdf_url);
  const canOpenXml = Boolean(electronicDocument?.xml_url);
  const canOpenCdr = Boolean(electronicDocument?.cdr_url);

  return (
    <div className="space-y-6">
      <section className="soft-card overflow-hidden">
        <div className="bg-[var(--surface-warm)] px-6 py-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <span className="chip-soft">Pedido {order.order_number}</span>
                <span className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${ORDER_STATUS_STYLES[order.status]}`}>
                  {ORDER_STATUS_LABELS[order.status]}
                </span>
                <span
                  className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${EMISSION_STATUS_STYLES[order.invoice_emission_status]}`}
                >
                  {EMISSION_STATUS_LABELS[order.invoice_emission_status]}
                </span>
              </div>

              <div>
                <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">Detalle del pedido</h1>
                <p className="mt-2 text-sm text-gray-600">
                  Creado el {formatDateTime(order.created_at)}
                  {order.delivered_at ? ` · Entregado el ${formatDateTime(order.delivered_at)}` : ''}
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-[var(--border-soft)] bg-white p-5 shadow-sm lg:min-w-[280px]">
              <p className="text-sm text-gray-500">Total del pedido</p>
              <p className="mt-2 text-3xl font-extrabold text-gray-900">{formatCurrency(order.total)}</p>
              <p className="mt-2 text-sm text-gray-600">
                {ORDER_TYPE_LABELS[order.order_type]} · {PAYMENT_METHOD_LABELS[order.payment_method]}
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-5 px-6 py-6 lg:grid-cols-2 xl:grid-cols-4">
          <article className="rounded-3xl border border-[var(--border-soft)] bg-white p-5 shadow-sm">
            <h2 className="text-base font-bold text-gray-900">Cliente</h2>
            <div className="mt-4 space-y-4">
              <InfoRow label="Nombre o razón social" value={customerName} />
              <InfoRow label="Teléfono" value={order.customer_phone_snapshot || order.guest_phone} />
              <InfoRow label="Correo" value={order.customer_email_snapshot || order.guest_email} />
              <InfoRow
                label="Documento"
                value={
                  order.customer_document_type_snapshot && order.customer_document_number_snapshot
                    ? `${order.customer_document_type_snapshot}: ${order.customer_document_number_snapshot}`
                    : order.customer_document_number_snapshot
                }
              />
            </div>
          </article>

          <article className="rounded-3xl border border-[var(--border-soft)] bg-white p-5 shadow-sm">
            <h2 className="text-base font-bold text-gray-900">Entrega y sucursal</h2>
            <div className="mt-4 space-y-4">
              <InfoRow label="Tipo de pedido" value={ORDER_TYPE_LABELS[order.order_type]} />
              <InfoRow label="Dirección" value={deliveryAddress} />
              <InfoRow label="Referencia" value={address?.reference || branch?.reference || order.notes} />
              <InfoRow label="Sucursal" value={branch?.name || 'Sucursal no disponible'} />
              <InfoRow label="Ubicación de sucursal" value={branch?.address || null} />
            </div>
          </article>

          <article className="rounded-3xl border border-[var(--border-soft)] bg-white p-5 shadow-sm">
            <h2 className="text-base font-bold text-gray-900">Pago y comprobante</h2>
            <div className="mt-4 space-y-4">
              <InfoRow label="Método de pago" value={PAYMENT_METHOD_LABELS[order.payment_method]} />
              <InfoRow label="Estado del pago" value={PAYMENT_STATUS_LABELS[order.payment_status]} />
              <InfoRow label="Comprobante solicitado" value={INVOICE_TYPE_LABELS[order.invoice_type]} />
              <InfoRow label="Número de comprobante" value={invoiceDisplayNumber} />
              {electronicDocument?.sunat_status ? (
                <InfoRow label="Estado SUNAT" value={electronicDocument.sunat_status} />
              ) : null}
            </div>

            {order.invoice_type === 'NONE' ? (
              <div className="mt-4 rounded-2xl bg-gray-50 p-4 text-sm text-gray-600">
                Este pedido no requiere boleta ni factura.
              </div>
            ) : order.invoice_emission_status === 'ISSUED' ? (
              <div className="mt-4 rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-800">
                Tu comprobante ya fue emitido. Aquí puedes revisarlo apenas esté disponible el archivo.
              </div>
            ) : order.invoice_emission_status === 'FAILED' ? (
              <div className="mt-4 rounded-2xl bg-rose-50 p-4 text-sm text-rose-800">
                Hubo un problema al emitir el comprobante.
                {electronicDocument?.error_message ? ` ${electronicDocument.error_message}` : ''}
              </div>
            ) : (
              <div className="mt-4 rounded-2xl bg-amber-50 p-4 text-sm text-amber-800">
                El comprobante todavía no está disponible. Se mostrará aquí cuando el sistema termine la emisión.
              </div>
            )}

            {(canOpenPdf || canOpenXml || canOpenCdr) && (
              <div className="mt-4 flex flex-wrap gap-3">
                {canOpenPdf ? (
                  <a className="btn-primary" href={electronicDocument?.pdf_url ?? '#'} target="_blank" rel="noreferrer">
                    Ver PDF
                  </a>
                ) : null}
                {canOpenXml ? (
                  <a className="btn-secondary" href={electronicDocument?.xml_url ?? '#'} target="_blank" rel="noreferrer">
                    Ver XML
                  </a>
                ) : null}
                {canOpenCdr ? (
                  <a className="btn-secondary" href={electronicDocument?.cdr_url ?? '#'} target="_blank" rel="noreferrer">
                    Ver CDR
                  </a>
                ) : null}
              </div>
            )}
          </article>

          <article className="rounded-3xl border border-[var(--border-soft)] bg-white p-5 shadow-sm">
            <h2 className="text-base font-bold text-gray-900">Resumen de cobro</h2>
            <div className="mt-4 space-y-3 text-sm text-gray-700">
              <div className="flex items-center justify-between gap-4">
                <span>Subtotal</span>
                <strong>{formatCurrency(order.subtotal)}</strong>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span>Descuento</span>
                <strong>{formatCurrency(order.discount_total)}</strong>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span>Costo de delivery</span>
                <strong>{formatCurrency(order.delivery_fee)}</strong>
              </div>
              <div className="flex items-center justify-between gap-4 border-t border-dashed border-[var(--border-soft)] pt-3 text-base">
                <span className="font-semibold text-gray-900">Total</span>
                <strong className="text-lg text-gray-900">{formatCurrency(order.total)}</strong>
              </div>
            </div>

            {order.notes ? (
              <div className="mt-4 rounded-2xl bg-gray-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">Notas del pedido</p>
                <p className="mt-2 text-sm text-gray-700">{order.notes}</p>
              </div>
            ) : null}
          </article>
        </div>
      </section>

      <section className="soft-card p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Productos del pedido</h2>
            <p className="mt-1 text-sm text-gray-600">Revisa cantidades, precios y observaciones registradas.</p>
          </div>
          <span className="rounded-full bg-[var(--surface-warm)] px-4 py-2 text-sm font-semibold text-[var(--primary)]">
            {items.length} producto{items.length === 1 ? '' : 's'}
          </span>
        </div>

        <div className="mt-5 space-y-4">
          {items.map((item) => (
            <article
              key={item.id}
              className="rounded-3xl border border-[var(--border-soft)] bg-white p-5 shadow-sm"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-gray-900">{item.product_name_snapshot}</h3>
                  {item.product_description_snapshot ? (
                    <p className="text-sm text-gray-600">{item.product_description_snapshot}</p>
                  ) : null}
                  <div className="flex flex-wrap gap-2 pt-1 text-sm text-gray-600">
                    <span className="rounded-full bg-gray-100 px-3 py-1">Cantidad: {item.quantity}</span>
                    <span className="rounded-full bg-gray-100 px-3 py-1">Unidad: {item.unit_of_measure}</span>
                    {Number(item.discount_amount) > 0 ? (
                      <span className="rounded-full bg-emerald-100 px-3 py-1 text-emerald-800">
                        Descuento: {formatCurrency(item.discount_amount)}
                      </span>
                    ) : null}
                  </div>
                  {item.notes ? (
                    <div className="rounded-2xl bg-gray-50 px-4 py-3 text-sm text-gray-700">
                      <span className="font-semibold">Observación:</span> {item.notes}
                    </div>
                  ) : null}
                </div>

                <div className="grid min-w-[220px] gap-3 rounded-3xl bg-[var(--surface-warm)] p-4 text-sm text-gray-700">
                  <div className="flex items-center justify-between gap-3">
                    <span>Precio unitario</span>
                    <strong>{formatCurrency(item.unit_price_snapshot)}</strong>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span>IGV</span>
                    <strong>{item.igv_percentage}%</strong>
                  </div>
                  <div className="flex items-center justify-between gap-3 border-t border-dashed border-[var(--border-soft)] pt-3 text-base text-gray-900">
                    <span>Subtotal</span>
                    <strong>{formatCurrency(item.subtotal)}</strong>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="soft-card p-6">
        <h2 className="text-xl font-bold text-gray-900">Seguimiento del pedido</h2>
        <p className="mt-1 text-sm text-gray-600">Historial de cambios registrados para esta orden.</p>

        <div className="mt-6 space-y-4">
          {history.map((row, index) => (
            <div key={row.id} className="flex gap-4">
              <div className="flex flex-col items-center">
                <span className="mt-1 h-3 w-3 rounded-full bg-[var(--primary)]" />
                {index < history.length - 1 ? <span className="mt-2 h-full w-px bg-[var(--border-soft)]" /> : null}
              </div>

              <article className="flex-1 rounded-3xl border border-[var(--border-soft)] bg-white p-5 shadow-sm">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-base font-bold text-gray-900">{ORDER_STATUS_LABELS[row.status]}</p>
                    <p className="mt-1 text-sm text-gray-500">{formatDateTime(row.created_at)}</p>
                  </div>
                  <span className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${ORDER_STATUS_STYLES[row.status]}`}>
                    {ORDER_STATUS_LABELS[row.status]}
                  </span>
                </div>
                {row.comment ? <p className="mt-3 text-sm text-gray-700">{row.comment}</p> : null}
              </article>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
