'use client';

import { ImageUploadField } from '@/components/admin/image-upload-field';
import { useEffect, useState } from 'react';

type Props = {
  onSubmit: (payload: any) => Promise<void>;
  initialData?: any | null;
  onCancelEdit?: () => void;
};

export function PromotionForm({
  onSubmit,
  initialData,
  onCancelEdit,
}: Props) {
  const [title, setTitle] = useState('');
  const [discountType, setDiscountType] = useState('PERCENTAGE');
  const [discountValue, setDiscountValue] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const isEditing = !!initialData;

  useEffect(() => {
    if (!initialData) {
      setTitle('');
      setDiscountType('PERCENTAGE');
      setDiscountValue('');
      setDescription('');
      setImageUrl('');
      return;
    }

    setTitle(initialData.title ?? '');
    setDiscountType(initialData.discount_type ?? 'PERCENTAGE');
    setDiscountValue(initialData.discount_value?.toString() ?? '');
    setDescription(initialData.description ?? '');
    setImageUrl(initialData.image_url ?? '');
  }, [initialData]);

  const resetForm = () => {
    setTitle('');
    setDiscountType('PERCENTAGE');
    setDiscountValue('');
    setDescription('');
    setImageUrl('');
  };

  return (
    <form
      className="soft-card space-y-5 p-6 md:p-7"
      onSubmit={async (e) => {
        e.preventDefault();
        await onSubmit({
          title,
          discountType,
          discountValue: Number(discountValue),
          description: description || undefined,
          imageUrl: imageUrl || undefined,
        });

        if (!isEditing) {
          resetForm();
        }
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="section-subtitle">Promociones</p>
          <h3 className="mt-2 text-2xl font-extrabold" style={{ color: 'var(--dark)' }}>
            {isEditing ? 'Editar promoción' : 'Nueva promoción'}
          </h3>
          <p className="mt-2 text-sm" style={{ color: 'var(--text-soft)' }}>
            {isEditing
              ? 'Actualiza la información de la promoción seleccionada.'
              : 'Define campañas comerciales, descuentos o precios especiales.'}
          </p>
        </div>

        {isEditing ? (
          <button
            type="button"
            className="btn-secondary"
            onClick={() => {
              resetForm();
              onCancelEdit?.();
            }}
          >
            Cancelar
          </button>
        ) : null}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-semibold">Título</label>
          <input
            className="input-soft"
            placeholder="Ej. Combo familiar"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold">Tipo de descuento</label>
          <select
            className="input-soft"
            value={discountType}
            onChange={(e) => setDiscountType(e.target.value)}
          >
            <option value="PERCENTAGE">PERCENTAGE</option>
            <option value="FIXED">FIXED</option>
            <option value="SPECIAL_PRICE">SPECIAL_PRICE</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold">Valor</label>
          <input
            className="input-soft"
            placeholder="0.00"
            type="number"
            step="0.01"
            value={discountValue}
            onChange={(e) => setDiscountValue(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-semibold">Descripción</label>
          <textarea
            className="input-soft min-h-[120px]"
            placeholder="Describe la promoción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
        <div>
          <ImageUploadField
            bucket="promotion-images"
            folder="promotions"
            label="Imagen de la promoción"
            onUploaded={setImageUrl}
          />
        </div>

        <div className="warm-card flex min-h-[220px] items-center justify-center p-4">
          {imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageUrl}
              alt="preview-promotion"
              className="h-full max-h-[200px] w-full rounded-2xl object-cover"
            />
          ) : (
            <p className="text-center text-sm" style={{ color: 'var(--text-soft)' }}>
              Vista previa de la promoción
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <button className="btn-primary">
          {isEditing ? 'Actualizar promoción' : 'Guardar promoción'}
        </button>
      </div>
    </form>
  );
}