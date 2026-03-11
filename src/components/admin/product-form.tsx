'use client';

import { useState } from 'react';

type Props = {
  categories: any[];
  onSubmit: (payload: any) => Promise<void>;
};

export function ProductForm({ categories, onSubmit }: Props) {
  const [categoryId, setCategoryId] = useState('');
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [basePrice, setBasePrice] = useState('');

  return (
    <form
      className="grid gap-3 rounded-2xl border bg-white p-5"
      onSubmit={async (e) => {
        e.preventDefault();
        await onSubmit({
          categoryId,
          name,
          slug,
          basePrice: Number(basePrice),
        });
        setCategoryId('');
        setName('');
        setSlug('');
        setBasePrice('');
      }}
    >
      <h3 className="text-lg font-semibold">Nuevo producto</h3>

      <select className="rounded-xl border px-4 py-3" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
        <option value="">Selecciona categoría</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>

      <input className="rounded-xl border px-4 py-3" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} required />
      <input className="rounded-xl border px-4 py-3" placeholder="Slug" value={slug} onChange={(e) => setSlug(e.target.value)} required />
      <input className="rounded-xl border px-4 py-3" placeholder="Precio base" type="number" step="0.01" value={basePrice} onChange={(e) => setBasePrice(e.target.value)} required />

      <button className="rounded-xl bg-black px-4 py-3 text-white">Guardar</button>
    </form>
  );
}