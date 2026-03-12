'use client';

import { useEffect, useState } from 'react';

type Props = {
  onSubmit: (payload: any) => Promise<void>;
  initialData?: any | null;
  onCancelEdit?: () => void;
};

export function CategoryForm({
  onSubmit,
  initialData,
  onCancelEdit,
}: Props) {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');

  const isEditing = !!initialData;

  useEffect(() => {
    if (!initialData) {
      setName('');
      setSlug('');
      setDescription('');
      return;
    }

    setName(initialData.name ?? '');
    setSlug(initialData.slug ?? '');
    setDescription(initialData.description ?? '');
  }, [initialData]);

  const resetForm = () => {
    setName('');
    setSlug('');
    setDescription('');
  };

  return (
    <form
      className="soft-card space-y-5 p-6 md:p-7"
      onSubmit={async (e) => {
        e.preventDefault();

        await onSubmit({
          name,
          slug,
          description: description || undefined,
        });

        if (!isEditing) {
          resetForm();
        }
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="section-subtitle">Categorías</p>
          <h3 className="mt-2 text-2xl font-extrabold" style={{ color: 'var(--dark)' }}>
            {isEditing ? 'Editar categoría' : 'Nueva categoría'}
          </h3>
          <p className="mt-2 text-sm" style={{ color: 'var(--text-soft)' }}>
            {isEditing
              ? 'Actualiza la categoría seleccionada.'
              : 'Organiza mejor tu carta agrupando productos por secciones.'}
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
        <div className="space-y-2">
          <label className="text-sm font-semibold">Nombre</label>
          <input
            className="input-soft"
            placeholder="Ej. Pollos"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold">Slug</label>
          <input
            className="input-soft"
            placeholder="ej. pollos"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-semibold">Descripción</label>
          <textarea
            className="input-soft min-h-[120px]"
            placeholder="Descripción opcional de la categoría"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button className="btn-primary">
          {isEditing ? 'Actualizar categoría' : 'Guardar categoría'}
        </button>
      </div>
    </form>
  );
}