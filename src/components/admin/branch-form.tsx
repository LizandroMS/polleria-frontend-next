'use client';

import { useState } from 'react';

type Props = {
  onSubmit: (payload: any) => Promise<void>;
};

export function BranchForm({ onSubmit }: Props) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [district, setDistrict] = useState('');
  const [phone, setPhone] = useState('');
  const [reference, setReference] = useState('');

  return (
    <form
      className="soft-card space-y-5 p-6 md:p-7"
      onSubmit={async (e) => {
        e.preventDefault();
        await onSubmit({
          name,
          address,
          district,
          phone,
          reference,
        });
        setName('');
        setAddress('');
        setDistrict('');
        setPhone('');
        setReference('');
      }}
    >
      <div>
        <p className="section-subtitle">Sucursales</p>
        <h3 className="mt-2 text-2xl font-extrabold" style={{ color: 'var(--dark)' }}>
          Nueva sucursal
        </h3>
        <p className="mt-2 text-sm" style={{ color: 'var(--text-soft)' }}>
          Registra una nueva sede con su información básica.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-semibold">Nombre</label>
          <input
            className="input-soft"
            placeholder="Ej. Barranca Centro"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold">Distrito</label>
          <input
            className="input-soft"
            placeholder="Ej. Barranca"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-semibold">Dirección</label>
          <input
            className="input-soft"
            placeholder="Av. Principal 123"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold">Teléfono</label>
          <input
            className="input-soft"
            placeholder="987654321"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold">Referencia</label>
          <input
            className="input-soft"
            placeholder="Frente a la plaza"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button className="btn-primary">Guardar sucursal</button>
      </div>
    </form>
  );
}