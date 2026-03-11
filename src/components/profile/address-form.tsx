'use client';

import { useState } from 'react';

type Props = {
  onSubmit: (payload: any) => Promise<void>;
};

export function AddressForm({ onSubmit }: Props) {
  const [label, setLabel] = useState('');
  const [addressLine, setAddressLine] = useState('');
  const [district, setDistrict] = useState('');
  const [reference, setReference] = useState('');

  return (
    <form
      className="grid gap-3 rounded-2xl border bg-white p-5"
      onSubmit={async (e) => {
        e.preventDefault();
        await onSubmit({
          label,
          addressLine,
          district,
          reference,
        });
        setLabel('');
        setAddressLine('');
        setDistrict('');
        setReference('');
      }}
    >
      <h3 className="text-lg font-semibold">Nueva dirección</h3>

      <input className="rounded-xl border px-4 py-3" placeholder="Etiqueta (Casa, Trabajo)" value={label} onChange={(e) => setLabel(e.target.value)} />
      <input className="rounded-xl border px-4 py-3" placeholder="Dirección" value={addressLine} onChange={(e) => setAddressLine(e.target.value)} required />
      <input className="rounded-xl border px-4 py-3" placeholder="Distrito" value={district} onChange={(e) => setDistrict(e.target.value)} />
      <input className="rounded-xl border px-4 py-3" placeholder="Referencia" value={reference} onChange={(e) => setReference(e.target.value)} />

      <button className="rounded-xl bg-black px-4 py-3 text-white">Guardar dirección</button>
    </form>
  );
}