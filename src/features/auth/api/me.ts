import { AuthUser } from '../types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getMe(token: string): Promise<AuthUser> {
  const response = await fetch(`${API_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  const json = await response.json();

  if (!response.ok || !json.success) {
    throw new Error(json.message ?? 'No se pudo obtener el perfil');
  }

  return json.data;
}