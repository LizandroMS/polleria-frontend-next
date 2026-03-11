'use client';

import { useState } from 'react';

type Props = {
  onSubmit: (payload: any) => Promise<void>;
};

export function CarouselForm({ onSubmit }: Props) {
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [linkType, setLinkType] = useState('NONE');
  const [linkValue, setLinkValue] = useState('');

  return (
    <form
      className="grid gap-3 rounded-2xl border bg-white p-5"
      onSubmit={async (e) => {
        e.preventDefault();
        await onSubmit({
          title,
          imageUrl,
          linkType,
          linkValue: linkValue || undefined,
        });
        setTitle('');
        setImageUrl('');
        setLinkType('NONE');
        setLinkValue('');
      }}
    >
      <h3 className="text-lg font-semibold">Nuevo banner</h3>

      <input className="rounded-xl border px-4 py-3" placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <input className="rounded-xl border px-4 py-3" placeholder="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />

      <select className="rounded-xl border px-4 py-3" value={linkType} onChange={(e) => setLinkType(e.target.value)}>
        <option value="NONE">NONE</option>
        <option value="PRODUCT">PRODUCT</option>
        <option value="PROMOTION">PROMOTION</option>
        <option value="CATEGORY">CATEGORY</option>
        <option value="EXTERNAL">EXTERNAL</option>
      </select>

      <input className="rounded-xl border px-4 py-3" placeholder="Link value" value={linkValue} onChange={(e) => setLinkValue(e.target.value)} />

      <button className="rounded-xl bg-black px-4 py-3 text-white">Guardar</button>
    </form>
  );
}