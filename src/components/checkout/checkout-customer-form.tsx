'use client';

import { CheckoutCustomerData } from '@/features/cart/types';
import { useState } from 'react';

type Props = {
  initialData?: CheckoutCustomerData | null;
  onSubmit: (data: CheckoutCustomerData) => void;
};

export function CheckoutCustomerForm({ initialData, onSubmit }: Props) {
  const [firstName, setFirstName] = useState(initialData?.firstName ?? '');
  const [lastName, setLastName] = useState(initialData?.lastName ?? '');
  const [phone, setPhone] = useState(initialData?.phone ?? '');
  const [email, setEmail] = useState(initialData?.email ?? '');

  return (
    <form
      className="space-y-4 rounded-2xl border bg-white p-5"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ firstName, lastName, phone, email });
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

      <button className="rounded-xl bg-black px-5 py-3 text-white">
        Guardar datos
      </button>
    </form>
  );
}