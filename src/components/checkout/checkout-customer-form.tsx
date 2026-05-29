'use client';

import { useEffect, useState } from 'react';

type CheckoutCustomerData = {
  firstName: string;
  lastName?: string;
  phone: string;
  email?: string;
  documentNumber?: string;
  businessName?: string;
  addressText?: string;
};

type Props = {
  initialData?: CheckoutCustomerData | null;
  invoiceType?: 'NONE' | 'BOLETA_SIMPLE' | 'FACTURA';
  onSubmit: (data: CheckoutCustomerData) => void;
};

export function CheckoutCustomerForm({
  initialData,
  invoiceType = 'NONE',
  onSubmit,
}: Props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [documentNumber, setDocumentNumber] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [addressText, setAddressText] = useState('');

  useEffect(() => {
    setFirstName(initialData?.firstName ?? '');
    setLastName(initialData?.lastName ?? '');
    setPhone(initialData?.phone ?? '');
    setEmail(initialData?.email ?? '');
    setDocumentNumber(initialData?.documentNumber ?? '');
    setBusinessName(initialData?.businessName ?? '');
    setAddressText(initialData?.addressText ?? '');
  }, [initialData]);

  const syncCustomer = (nextData: CheckoutCustomerData) => {
    // Nota para mí:
    // Sincronizo el formulario con el store solo cuando el usuario cambia un campo.
    // Evito un useEffect que llame setState en cada render porque puede generar
    // bucles de render en producción al combinar React + Zustand persistido.
    onSubmit(nextData);
  };

  const buildCustomer = (overrides: Partial<CheckoutCustomerData> = {}): CheckoutCustomerData => ({
    firstName,
    lastName,
    phone,
    email,
    documentNumber,
    businessName,
    addressText,
    ...overrides,
  });

  return (
    <div
      className="space-y-4 rounded-[28px] border bg-white p-6 shadow-sm"
      style={{ borderColor: 'var(--border-soft)' }}
    >
      <div>
        <p className="section-subtitle">Checkout</p>
        <h3 className="mt-2 text-2xl font-extrabold" style={{ color: 'var(--dark)' }}>
          Datos del cliente
        </h3>
        <p className="mt-2 text-sm" style={{ color: 'var(--text-soft)' }}>
          Completa tus datos para continuar con el pedido.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-semibold">Nombres</label>
          <input
            className="input-soft"
            placeholder="Nombres"
            value={firstName}
            onChange={(e) => {
              const value = e.target.value;
              setFirstName(value);
              syncCustomer(buildCustomer({ firstName: value }));
            }}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold">Apellidos</label>
          <input
            className="input-soft"
            placeholder="Apellidos"
            value={lastName}
            onChange={(e) => {
              const value = e.target.value;
              setLastName(value);
              syncCustomer(buildCustomer({ lastName: value }));
            }}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold">Teléfono</label>
          <input
            className="input-soft"
            placeholder="999999999"
            value={phone}
            onChange={(e) => {
              const value = e.target.value;
              setPhone(value);
              syncCustomer(buildCustomer({ phone: value }));
            }}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold">Correo</label>
          <input
            className="input-soft"
            placeholder="correo@ejemplo.com"
            type="email"
            value={email}
            onChange={(e) => {
              const value = e.target.value;
              setEmail(value);
              syncCustomer(buildCustomer({ email: value }));
            }}
          />
        </div>

        {invoiceType === 'BOLETA_SIMPLE' || invoiceType === 'FACTURA' ? (
          <div className="space-y-2">
            <label className="text-sm font-semibold">
              {invoiceType === 'FACTURA' ? 'RUC' : 'DNI'}
            </label>
            <input
              className="input-soft"
              placeholder={invoiceType === 'FACTURA' ? 'RUC' : 'DNI'}
              value={documentNumber}
              onChange={(e) => {
                const value = e.target.value;
                setDocumentNumber(value);
                syncCustomer(buildCustomer({ documentNumber: value }));
              }}
              required
            />
          </div>
        ) : null}

        {invoiceType === 'FACTURA' ? (
          <div className="space-y-2">
            <label className="text-sm font-semibold">Razón social</label>
            <input
              className="input-soft"
              placeholder="Razón social"
              value={businessName}
              onChange={(e) => {
                const value = e.target.value;
                setBusinessName(value);
                syncCustomer(buildCustomer({ businessName: value }));
              }}
              required
            />
          </div>
        ) : null}

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-semibold">
            Dirección manual de entrega o dirección fiscal
          </label>
          <textarea
            className="input-soft min-h-[110px]"
            placeholder="Dirección manual de entrega o dirección fiscal"
            value={addressText}
            onChange={(e) => {
              const value = e.target.value;
              setAddressText(value);
              syncCustomer(buildCustomer({ addressText: value }));
            }}
          />
        </div>
      </div>
    </div>
  );
}
