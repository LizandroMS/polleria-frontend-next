'use client';

import { uploadPublicImage } from '@/lib/supabase/storage';
import { useRef, useState } from 'react';

type Props = {
  bucket: string;
  folder?: string;
  label: string;
  onUploaded: (url: string) => void;
};

export function ImageUploadField({ bucket, folder, label, onUploaded }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [fileName, setFileName] = useState('');
  const [uploadedUrl, setUploadedUrl] = useState('');

  const openFilePicker = () => {
    if (uploading) return;
    inputRef.current?.click();
  };

  const handleUpload = async (file: File) => {
    setUploading(true);
    setError('');
    setFileName(file.name);
    setUploadedUrl('');

    try {
      const result = await uploadPublicImage({
        bucket,
        file,
        folder,
      });

      setUploadedUrl(result.publicUrl);
      onUploaded(result.publicUrl);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'No se pudo subir la imagen';
      setError(message);
    } finally {
      setUploading(false);
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  };

  return (
    <div className="rounded-3xl border bg-white p-4" style={{ borderColor: 'var(--border-soft)' }}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <label className="text-sm font-bold" style={{ color: 'var(--dark)' }}>
            {label}
          </label>
          <p className="mt-1 text-xs leading-5" style={{ color: 'var(--text-soft)' }}>
            Selecciona una imagen desde tu equipo. Al terminar la carga, se completará la URL automáticamente.
          </p>
        </div>

        <button
          type="button"
          className="btn-secondary min-w-[150px]"
          onClick={openFilePicker}
          disabled={uploading}
        >
          {uploading ? 'Subiendo...' : 'Subir imagen'}
        </button>
      </div>

      <input
        ref={inputRef}
        className="hidden"
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          void handleUpload(file);
        }}
      />

      {fileName ? (
        <p className="mt-3 rounded-2xl bg-[#fff7ed] px-4 py-2 text-xs font-semibold text-[#9a4f27]">
          Archivo seleccionado: {fileName}
        </p>
      ) : null}

      {uploadedUrl ? (
        <p className="mt-3 rounded-2xl bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-700">
          Imagen subida correctamente. Ahora puedes guardar el formulario.
        </p>
      ) : null}

      {error ? (
        <p className="mt-3 rounded-2xl bg-red-50 px-4 py-2 text-xs font-semibold text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}
