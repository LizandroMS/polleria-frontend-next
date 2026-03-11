import { supabase } from './client';

export async function uploadPublicImage(params: {
  bucket: string;
  file: File;
  folder?: string;
}) {
  const ext = params.file.name.split('.').pop() ?? 'jpg';
  const filename = `${crypto.randomUUID()}.${ext}`;
  const path = params.folder ? `${params.folder}/${filename}` : filename;

  const { error } = await supabase.storage
    .from(params.bucket)
    .upload(path, params.file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    throw error;
  }

  const { data } = supabase.storage.from(params.bucket).getPublicUrl(path);

  return {
    path,
    publicUrl: data.publicUrl,
  };
}