'use client';

import { CartSummary } from '@/components/cart/cart-summary';
import { CheckoutAuthRequired } from '@/components/checkout/checkout-auth-required';
import { CheckoutCustomerForm } from '@/components/checkout/checkout-customer-form';
import { EmptyState } from '@/components/shared/empty-state';
import { PageHeader } from '@/components/shared/page-header';
import { useMyAddresses } from '@/features/customer-addresses/hooks/use-my-addresses';
import { useCreateOrder } from '@/features/orders/hooks/use-create-order';
import { useAuth } from '@/hooks/use-auth';
import { useCart } from '@/hooks/use-cart';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

export default function CheckoutPage() {
  const router = useRouter();
  const { user, loading, token } = useAuth();
  const createOrderMutation = useCreateOrder(token);

  const {
    items,
    subtotal,
    totalItems,
    selectedBranchId,
    checkoutCustomer,
    hydrated,
    setCheckoutCustomer,
    clearCart,
  } = useCart();

  const { data: rawAddresses = [] } = useMyAddresses(token);
  const addresses = Array.isArray(rawAddresses) ? rawAddresses : [];

  const [orderType, setOrderType] = useState<'DELIVERY' | 'PICKUP' | 'DINE_IN'>('DELIVERY');
  const [paymentMethod, setPaymentMethod] = useState<'CASH' | 'YAPE' | 'PLIN' | 'CARD'>('CASH');
  const [invoiceType, setInvoiceType] = useState<'NONE' | 'BOLETA_SIMPLE' | 'FACTURA'>('NONE');
  const [notes, setNotes] = useState('');
  const [selectedAddressId, setSelectedAddressId] = useState('');

  const selectedAddress = useMemo(
    () => addresses.find((address: any) => address.id === selectedAddressId),
    [addresses, selectedAddressId],
  );

  useEffect(() => {
    if (!user) return;
    if (checkoutCustomer) return;

    setCheckoutCustomer({
      firstName: user.first_name ?? '',
      lastName: user.last_name ?? '',
      phone: user.phone ?? '',
      email: user.email ?? '',
      documentNumber: '',
      businessName: '',
      addressText: '',
    });
  }, [user, checkoutCustomer, setCheckoutCustomer]);

  const safeItems = Array.isArray(items) ? items : [];
  const hasPendingBranch = safeItems.some((item) => item.branchId === 'pending-branch');

  const hasCustomerBasicData =
    !!checkoutCustomer?.firstName?.trim() &&
    !!checkoutCustomer?.phone?.trim();

  const hasDocumentData =
    invoiceType === 'NONE'
      ? true
      : invoiceType === 'BOLETA_SIMPLE'
        ? !!checkoutCustomer?.documentNumber?.trim()
        : !!checkoutCustomer?.documentNumber?.trim() &&
          !!checkoutCustomer?.businessName?.trim();

  const hasDeliveryAddress =
    orderType !== 'DELIVERY' ||
    !!selectedAddressId ||
    !!checkoutCustomer?.addressText?.trim();

  const canSubmit =
    !!user &&
    !!token &&
    !!selectedBranchId &&
    hasCustomerBasicData &&
    hasDocumentData &&
    !hasPendingBranch &&
    hasDeliveryAddress;

  if (!hydrated) {
    return (
      <div className="app-container py-8">
        <EmptyState
          title="Cargando checkout"
          description="Estamos recuperando los productos de tu carrito."
        />
      </div>
    );
  }

  if (!safeItems.length) {
    return (
      <div className="app-container py-8">
        <EmptyState
          title="No hay productos en el carrito"
          description="Agrega productos antes de continuar."
        />
      </div>
    );
  }

  const handleCreateOrder = async () => {
    if (!canSubmit || !checkoutCustomer || !selectedBranchId) return;

    const addressText =
      orderType === 'DELIVERY'
        ? selectedAddress?.address_line || checkoutCustomer.addressText || undefined
        : undefined;

    const data = await createOrderMutation.mutateAsync({
      branchId: selectedBranchId,
      orderType,
      paymentMethod,
      invoiceType,
      addressId: selectedAddressId || undefined,
      notes,
      deliveryFee: orderType === 'DELIVERY' ? 0 : 0,
      customer: {
        firstName: checkoutCustomer.firstName,
        lastName: checkoutCustomer.lastName,
        phone: checkoutCustomer.phone,
        email: checkoutCustomer.email,
        documentType:
          invoiceType === 'BOLETA_SIMPLE'
            ? '1'
            : invoiceType === 'FACTURA'
              ? '6'
              : undefined,
        documentNumber: checkoutCustomer.documentNumber?.trim() || undefined,
        businessName: checkoutCustomer.businessName?.trim() || undefined,
        addressText,
      },
      items: safeItems.map((item) => ({
        productId: item.productId,
        branchId: item.branchId,
        quantity: item.quantity,
        promotionId: item.promotionId,
      })),
    });

    clearCart();
    router.push(`/profile/pedidos/${data.id}`);
  };

  return (
    <div
      className="page-shell"
    >
      <div className="app-container space-y-8">
        <section
          className="page-hero"
        >
          <PageHeader
            eyebrow="Confirmación"
            title="Checkout"
            description="Completa tus datos para confirmar tu pedido."
          />
        </section>

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="space-y-5">
            {!selectedBranchId ? (
              <EmptyState
                title="Selecciona una sucursal"
                description="Debes elegir una sucursal desde el carrito para continuar."
              />
            ) : (
              <CheckoutCustomerForm
                initialData={checkoutCustomer}
                onSubmit={setCheckoutCustomer}
                invoiceType={invoiceType}
              />
            )}

            {!loading && !user ? <CheckoutAuthRequired /> : null}

            {orderType === 'DELIVERY' && user ? (
              <section className="soft-card space-y-4 p-6">
                <div>
                  <p className="section-subtitle">Entrega</p>
                  <h3 className="mt-2 text-2xl font-extrabold" style={{ color: 'var(--dark)' }}>
                    Dirección de entrega
                  </h3>
                </div>

                {addresses.length ? (
                  <select
                    className="input-soft"
                    value={selectedAddressId}
                    onChange={(e) => setSelectedAddressId(e.target.value)}
                  >
                    <option value="">Selecciona una dirección guardada</option>
                    {addresses.map((address: any) => (
                      <option key={address.id} value={address.id}>
                        {address.label || 'Dirección'} - {address.address_line}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p className="text-sm" style={{ color: 'var(--text-soft)' }}>
                    No tienes direcciones guardadas. Puedes registrar una en tu perfil o usar la
                    dirección escrita en tus datos del cliente.
                  </p>
                )}
              </section>
            ) : null}

            <section className="soft-card space-y-4 p-6">
              <div>
                <p className="section-subtitle">Configuración</p>
                <h3 className="mt-2 text-2xl font-extrabold" style={{ color: 'var(--dark)' }}>
                  Datos del pedido
                </h3>
              </div>

              <select
                className="input-soft"
                value={orderType}
                onChange={(e) => {
                  const nextValue = e.target.value as 'DELIVERY' | 'PICKUP' | 'DINE_IN';
                  setOrderType(nextValue);

                  if (nextValue !== 'DELIVERY') {
                    setSelectedAddressId('');
                  }
                }}
              >
                <option value="DELIVERY">Delivery</option>
                <option value="PICKUP">Recojo</option>
                <option value="DINE_IN">Consumo en local</option>
              </select>

              <select
                className="input-soft"
                value={paymentMethod}
                onChange={(e) =>
                  setPaymentMethod(e.target.value as 'CASH' | 'YAPE' | 'PLIN' | 'CARD')
                }
              >
                <option value="CASH">Efectivo</option>
                <option value="YAPE">Yape</option>
                <option value="PLIN">Plin</option>
                <option value="CARD">Tarjeta</option>
              </select>

              <select
                className="input-soft"
                value={invoiceType}
                onChange={(e) =>
                  setInvoiceType(e.target.value as 'NONE' | 'BOLETA_SIMPLE' | 'FACTURA')
                }
              >
                <option value="NONE">Sin comprobante</option>
                <option value="BOLETA_SIMPLE">Boleta simple</option>
                <option value="FACTURA">Factura</option>
              </select>

              <textarea
                className="input-soft min-h-[110px]"
                placeholder="Notas del pedido"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />

              {!selectedBranchId ? (
                <p className="text-sm text-red-600">Debes seleccionar una sucursal.</p>
              ) : null}

              {hasPendingBranch ? (
                <p className="text-sm text-red-600">
                  Hay productos en el carrito sin sucursal asignada.
                </p>
              ) : null}

              {!hasCustomerBasicData ? (
                <p className="text-sm text-red-600">
                  Completa los datos básicos del cliente.
                </p>
              ) : null}

              {invoiceType === 'BOLETA_SIMPLE' && !checkoutCustomer?.documentNumber?.trim() ? (
                <p className="text-sm text-red-600">
                  Debes ingresar el DNI para emitir boleta simple.
                </p>
              ) : null}

              {invoiceType === 'FACTURA' &&
              (!checkoutCustomer?.documentNumber?.trim() ||
                !checkoutCustomer?.businessName?.trim()) ? (
                <p className="text-sm text-red-600">
                  Debes ingresar RUC y razón social para emitir factura.
                </p>
              ) : null}

              {orderType === 'DELIVERY' && !selectedAddressId && !checkoutCustomer?.addressText?.trim() ? (
                <p className="text-sm text-red-600">
                  Para delivery debes seleccionar una dirección o escribir una manualmente.
                </p>
              ) : null}

              {!user ? (
                <p className="text-sm text-red-600">
                  Debes iniciar sesión o registrarte para continuar.
                </p>
              ) : null}

              {createOrderMutation.isError ? (
                <p className="text-sm text-red-600">
                  {(createOrderMutation.error as Error).message}
                </p>
              ) : null}

              <div className="flex justify-end">
                <button
                  type="button"
                  disabled={!canSubmit || createOrderMutation.isPending}
                  onClick={handleCreateOrder}
                  className="btn-primary disabled:opacity-50"
                >
                  {createOrderMutation.isPending ? 'Creando pedido...' : 'Confirmar pedido'}
                </button>
              </div>
            </section>
          </div>

          <div>
            <CartSummary subtotal={subtotal} totalItems={totalItems} />
          </div>
        </div>
      </div>
    </div>
  );
}
