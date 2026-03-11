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
import { useMemo, useState } from 'react';

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
    setCheckoutCustomer,
    clearCart,
  } = useCart();

  const { data: addresses = [] } = useMyAddresses(token);

  const [orderType, setOrderType] = useState<'DELIVERY' | 'PICKUP' | 'DINE_IN'>('DELIVERY');
  const [paymentMethod, setPaymentMethod] = useState<'CASH' | 'YAPE' | 'PLIN' | 'CARD'>('CASH');
  const [invoiceType, setInvoiceType] = useState<'NONE' | 'BOLETA_SIMPLE' | 'FACTURA'>('NONE');
  const [notes, setNotes] = useState('');
  const [selectedAddressId, setSelectedAddressId] = useState<string>('');

  const selectedAddress = useMemo(
    () => addresses.find((address: any) => address.id === selectedAddressId),
    [addresses, selectedAddressId],
  );

  const canSubmit =
    !!user &&
    !!token &&
    !!selectedBranchId &&
    !!checkoutCustomer &&
    !items.some((item) => item.branchId === 'pending-branch') &&
    (orderType !== 'DELIVERY' || !!selectedAddressId || !!checkoutCustomer?.addressText);

  if (!items.length) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8">
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
        documentNumber: checkoutCustomer.documentNumber,
        businessName: checkoutCustomer.businessName,
        addressText,
      },
      items: items.map((item) => ({
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
    <div className="mx-auto max-w-7xl px-4 py-8">
      <PageHeader
        title="Checkout"
        description="Completa tus datos para confirmar tu pedido."
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="space-y-4">
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
            <div className="rounded-2xl border bg-white p-5 space-y-3">
              <h3 className="text-lg font-semibold">Dirección de entrega</h3>

              {addresses.length ? (
                <select
                  className="w-full rounded-xl border px-4 py-3"
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
                <p className="text-sm text-gray-600">
                  No tienes direcciones guardadas. Puedes registrar una en tu perfil o usar la
                  dirección escrita en tus datos del cliente.
                </p>
              )}
            </div>
          ) : null}

          <div className="rounded-2xl border bg-white p-5 space-y-4">
            <h3 className="text-lg font-semibold">Configuración del pedido</h3>

            <select
              className="w-full rounded-xl border px-4 py-3"
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
              className="w-full rounded-xl border px-4 py-3"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value as 'CASH' | 'YAPE' | 'PLIN' | 'CARD')}
            >
              <option value="CASH">Efectivo</option>
              <option value="YAPE">Yape</option>
              <option value="PLIN">Plin</option>
              <option value="CARD">Tarjeta</option>
            </select>

            <select
              className="w-full rounded-xl border px-4 py-3"
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
              className="w-full rounded-xl border px-4 py-3"
              placeholder="Notas del pedido"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />

            {createOrderMutation.isError ? (
              <p className="text-sm text-red-600">
                {(createOrderMutation.error as Error).message}
              </p>
            ) : null}

            <button
              disabled={!canSubmit || createOrderMutation.isPending}
              onClick={handleCreateOrder}
              className="rounded-xl bg-black px-5 py-3 text-white disabled:opacity-50"
            >
              {createOrderMutation.isPending ? 'Creando pedido...' : 'Confirmar pedido'}
            </button>
          </div>
        </div>

        <div>
          <CartSummary subtotal={subtotal} totalItems={totalItems} />
        </div>
      </div>
    </div>
  );
}