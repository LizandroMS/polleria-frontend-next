'use client';

import { ImageUploadField } from '@/components/admin/image-upload-field';
import { useState } from 'react';

type Props = {
  onSubmit: (payload: any) => Promise<void>;
};

export function CarouselForm({ onSubmit }: Props) {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [linkType, setLinkType] = useState('NONE');
  const [linkValue, setLinkValue] = useState('');

  return (
    <form
      className="soft-card space-y-6 p-6 md:p-7"
      onSubmit={async (e) => {
        e.preventDefault();
        await onSubmit({
          title,
          subtitle: subtitle || undefined,
          imageUrl,
          linkType,
          linkValue: linkValue || undefined,
        });
        setTitle('');
        setSubtitle('');
        setImageUrl('');
        setLinkType('NONE');
        setLinkValue('');
      }}
    >
      <div>
        <p className="section-subtitle">Carrusel</p>
        <h3 className="mt-2 text-2xl font-extrabold" style={{ color: 'var(--dark)' }}>
          Nuevo banner
        </h3>
        <p className="mt-2 text-sm" style={{ color: 'var(--text-soft)' }}>
          Agrega un banner atractivo para destacar promociones o campañas.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-semibold">Título</label>
          <input
            className="input-soft"
            placeholder="Ej. Gran apertura"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-semibold">Subtítulo</label>
          <textarea
            className="input-soft min-h-[110px]"
            placeholder="Texto complementario del banner"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold">Tipo de enlace</label>
          <select
            className="input-soft"
            value={linkType}
            onChange={(e) => setLinkType(e.target.value)}
          >
            <option value="NONE">NONE</option>
            <option value="PRODUCT">PRODUCT</option>
            <option value="PROMOTION">PROMOTION</option>
            <option value="CATEGORY">CATEGORY</option>
            <option value="EXTERNAL">EXTERNAL</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold">Valor del enlace</label>
          <input
            className="input-soft"
            placeholder="/promociones o URL"
            value={linkValue}
            onChange={(e) => setLinkValue(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
        <div>
          <ImageUploadField
            bucket="carousel-images"
            folder="banners"
            label="Imagen del banner"
            onUploaded={setImageUrl}
          />
        </div>

        <div className="warm-card flex min-h-[220px] items-center justify-center p-4">
          {imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageUrl}
              alt="preview-banner"
              className="h-full max-h-[200px] w-full rounded-2xl object-cover"
            />
          ) : (
            <p className="text-sm text-center" style={{ color: 'var(--text-soft)' }}>
              Vista previa del banner
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <button className="btn-primary">Guardar banner</button>
      </div>
    </form>
  );
}