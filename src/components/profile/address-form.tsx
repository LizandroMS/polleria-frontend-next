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
      className="grid gap-4"
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
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-semibold">Etiqueta</label>
          <input
            className="input-soft"
            placeholder="Casa, Trabajo..."
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold">Distrito</label>
          <input
            className="input-soft"
            placeholder="Barranca"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-semibold">Dirección</label>
          <input
            className="input-soft"
            placeholder="Av. Principal 123"
            value={addressLine}
            onChange={(e) => setAddressLine(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-semibold">Referencia</label>
          <textarea
            className="input-soft min-h-[110px]"
            placeholder="Frente al parque, al lado de..."
            value={reference}
            onChange={(e) => setReference(e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button className="btn-primary">Guardar dirección</button>
      </div>
    </form>
  );
}