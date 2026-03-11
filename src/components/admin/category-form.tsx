'use client';

import { useState } from 'react';

type Props = {
  onSubmit: (payload: any) => Promise<void>;
};

export function CategoryForm({ onSubmit }: Props) {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');

  return (
    <form
      className="grid gap-3 rounded-2xl border bg-white p-5"
      onSubmit={async (e) => {
        e.preventDefault();
        await onSubmit({ name, slug });
        setName('');
        setSlug('');
      }}
    >
      <h3 className="text-lg font-semibold">Nueva categoría</h3>

      <input className="rounded-xl border px-4 py-3" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} required />
      <input className="rounded-xl border px-4 py-3" placeholder="Slug" value={slug} onChange={(e) => setSlug(e.target.value)} required />

      <button className="rounded-xl bg-black px-4 py-3 text-white">Guardar</button>
    </form>
  );
}