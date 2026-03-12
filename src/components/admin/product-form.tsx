'use client';

import { ImageUploadField } from '@/components/admin/image-upload-field';
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
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);

  return (
    <form
      className="soft-card space-y-6 p-6 md:p-7"
      onSubmit={async (e) => {
        e.preventDefault();
        await onSubmit({
          categoryId,
          name,
          slug,
          basePrice: Number(basePrice),
          description: description || undefined,
          imageUrl: imageUrl || undefined,
          isFeatured,
        });
        setCategoryId('');
        setName('');
        setSlug('');
        setBasePrice('');
        setDescription('');
        setImageUrl('');
        setIsFeatured(false);
      }}
    >
      <div>
        <p className="section-subtitle">Productos</p>
        <h3 className="mt-2 text-2xl font-extrabold" style={{ color: 'var(--dark)' }}>
          Nuevo producto
        </h3>
        <p className="mt-2 text-sm" style={{ color: 'var(--text-soft)' }}>
          Agrega productos que luego aparecerán en la carta y promociones.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-semibold">Categoría</label>
          <select
            className="input-soft"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
          >
            <option value="">Selecciona categoría</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold">Precio base</label>
          <input
            className="input-soft"
            placeholder="0.00"
            type="number"
            step="0.01"
            value={basePrice}
            onChange={(e) => setBasePrice(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold">Nombre</label>
          <input
            className="input-soft"
            placeholder="Ej. 1/4 de pollo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold">Slug</label>
          <input
            className="input-soft"
            placeholder="ej. cuarto-pollo"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-semibold">Descripción</label>
          <textarea
            className="input-soft min-h-[120px]"
            placeholder="Describe el producto"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_280px]">
        <div className="space-y-3">
          <ImageUploadField
            bucket="product-images"
            folder="products"
            label="Imagen del producto"
            onUploaded={setImageUrl}
          />

          <label className="flex items-center gap-3 rounded-2xl border bg-white px-4 py-3 text-sm"
            style={{ borderColor: 'var(--border-soft)' }}
          >
            <input
              type="checkbox"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
            />
            Marcar como producto destacado
          </label>
        </div>

        <div
          className="warm-card flex min-h-[220px] items-center justify-center p-4"
        >
          {imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageUrl}
              alt="preview"
              className="h-full max-h-[200px] w-full rounded-2xl object-cover"
            />
          ) : (
            <p className="text-sm text-center" style={{ color: 'var(--text-soft)' }}>
              Aquí verás la vista previa de la imagen
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <button className="btn-primary">Guardar producto</button>
      </div>
    </form>
  );
}