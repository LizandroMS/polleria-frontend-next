'use client';

import { uploadPublicImage } from '@/lib/supabase/storage';
import { useState } from 'react';

type Props = {
  bucket: string;
  folder?: string;
  label: string;
  onUploaded: (url: string) => void;
};

export function ImageUploadField({ bucket, folder, label, onUploaded }: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>

      <input
        type="file"
        accept="image/*"
        onChange={async (e) => {
          const file = e.target.files?.[0];
          if (!file) return;

          setUploading(true);
          setError('');

          try {
            const result = await uploadPublicImage({
              bucket,
              file,
              folder,
            });

            onUploaded(result.publicUrl);
          } catch (err: any) {
            setError(err?.message ?? 'No se pudo subir la imagen');
          } finally {
            setUploading(false);
          }
        }}
      />

      {uploading ? <p className="text-sm text-gray-600">Subiendo imagen...</p> : null}
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  );
}