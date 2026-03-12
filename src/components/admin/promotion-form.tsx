'use client';

import { useState } from 'react';

type Props = {
  onSubmit: (payload: any) => Promise<void>;
};

export function PromotionForm({ onSubmit }: Props) {
  const [title, setTitle] = useState('');
  const [discountType, setDiscountType] = useState('PERCENTAGE');
  const [discountValue, setDiscountValue] = useState('');
  const [description, setDescription] = useState('');

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
        });
        setTitle('');
        setDiscountType('PERCENTAGE');
        setDiscountValue('');
        setDescription('');
      }}
    >
      <div>
        <p className="section-subtitle">Promociones</p>
        <h3 className="mt-2 text-2xl font-extrabold" style={{ color: 'var(--dark)' }}>
          Nueva promoción
        </h3>
        <p className="mt-2 text-sm" style={{ color: 'var(--text-soft)' }}>
          Define campañas comerciales, descuentos o precios especiales.
        </p>
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

      <div className="flex justify-end">
        <button className="btn-primary">Guardar promoción</button>
      </div>
    </form>
  );
}