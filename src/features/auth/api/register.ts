import { AuthResponse, RegisterPayload } from '../types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function register(payload: RegisterPayload): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const json = await response.json();

  if (!response.ok || !json.success) {
    throw new Error(json.message ?? 'No se pudo registrar');
  }

  return json.data;
}