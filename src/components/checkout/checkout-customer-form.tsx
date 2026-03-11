'use client';

import { useState } from 'react';

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
  const [firstName, setFirstName] = useState(initialData?.firstName ?? '');
  const [lastName, setLastName] = useState(initialData?.lastName ?? '');
  const [phone, setPhone] = useState(initialData?.phone ?? '');
  const [email, setEmail] = useState(initialData?.email ?? '');
  const [documentNumber, setDocumentNumber] = useState(initialData?.documentNumber ?? '');
  const [businessName, setBusinessName] = useState(initialData?.businessName ?? '');
  const [addressText, setAddressText] = useState(initialData?.addressText ?? '');

  return (
    <form
      className="space-y-4 rounded-2xl border bg-white p-5"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({
          firstName,
          lastName,
          phone,
          email,
          documentNumber,
          businessName,
          addressText,
        });
      }}
    >
      <h3 className="text-lg font-semibold">Datos del cliente</h3>

      <input
        className="w-full rounded-xl border px-4 py-3"
        placeholder="Nombres"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />

      <input
        className="w-full rounded-xl border px-4 py-3"
        placeholder="Apellidos"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />

      <input
        className="w-full rounded-xl border px-4 py-3"
        placeholder="Teléfono"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />

      <input
        className="w-full rounded-xl border px-4 py-3"
        placeholder="Correo"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {invoiceType === 'BOLETA_SIMPLE' || invoiceType === 'FACTURA' ? (
        <input
          className="w-full rounded-xl border px-4 py-3"
          placeholder={invoiceType === 'FACTURA' ? 'RUC' : 'DNI'}
          value={documentNumber}
          onChange={(e) => setDocumentNumber(e.target.value)}
          required
        />
      ) : null}

      {invoiceType === 'FACTURA' ? (
        <input
          className="w-full rounded-xl border px-4 py-3"
          placeholder="Razón social"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          required
        />
      ) : null}

      <textarea
        className="w-full rounded-xl border px-4 py-3"
        placeholder="Dirección manual de entrega o dirección fiscal"
        value={addressText}
        onChange={(e) => setAddressText(e.target.value)}
      />

      <button className="rounded-xl bg-black px-5 py-3 text-white">
        Guardar datos
      </button>
    </form>
  );
}