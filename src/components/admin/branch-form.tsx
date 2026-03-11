'use client';

import { useState } from 'react';

type Props = {
  onSubmit: (payload: any) => Promise<void>;
};

export function BranchForm({ onSubmit }: Props) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [district, setDistrict] = useState('');

  return (
    <form
      className="grid gap-3 rounded-2xl border bg-white p-5"
      onSubmit={async (e) => {
        e.preventDefault();
        await onSubmit({ name, address, district });
        setName('');
        setAddress('');
        setDistrict('');
      }}
    >
      <h3 className="text-lg font-semibold">Nueva sucursal</h3>

      <input className="rounded-xl border px-4 py-3" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} required />
      <input className="rounded-xl border px-4 py-3" placeholder="Dirección" value={address} onChange={(e) => setAddress(e.target.value)} required />
      <input className="rounded-xl border px-4 py-3" placeholder="Distrito" value={district} onChange={(e) => setDistrict(e.target.value)} />

      <button className="rounded-xl bg-black px-4 py-3 text-white">Guardar</button>
    </form>
  );
}