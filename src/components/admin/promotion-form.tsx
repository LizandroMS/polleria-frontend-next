'use client';

import { useState } from 'react';

type Props = {
  onSubmit: (payload: any) => Promise<void>;
};

export function PromotionForm({ onSubmit }: Props) {
  const [title, setTitle] = useState('');
  const [discountType, setDiscountType] = useState('PERCENTAGE');
  const [discountValue, setDiscountValue] = useState('');

  return (
    <form
      className="grid gap-3 rounded-2xl border bg-white p-5"
      onSubmit={async (e) => {
        e.preventDefault();
        await onSubmit({
          title,
          discountType,
          discountValue: Number(discountValue),
        });
        setTitle('');
        setDiscountType('PERCENTAGE');
        setDiscountValue('');
      }}
    >
      <h3 className="text-lg font-semibold">Nueva promoción</h3>

      <input className="rounded-xl border px-4 py-3" placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} required />

      <select className="rounded-xl border px-4 py-3" value={discountType} onChange={(e) => setDiscountType(e.target.value)}>
        <option value="PERCENTAGE">PERCENTAGE</option>
        <option value="FIXED">FIXED</option>
        <option value="SPECIAL_PRICE">SPECIAL_PRICE</option>
      </select>

      <input className="rounded-xl border px-4 py-3" placeholder="Valor descuento" type="number" step="0.01" value={discountValue} onChange={(e) => setDiscountValue(e.target.value)} required />

      <button className="rounded-xl bg-black px-4 py-3 text-white">Guardar</button>
    </form>
  );
}