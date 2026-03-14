const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function resetPassword(payload: { token: string; password: string }) {
  const response = await fetch(`${API_URL}/auth/reset-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const json = await response.json();

  if (!response.ok || !json.success) {
    throw new Error(json.message ?? 'No se pudo cambiar la contraseña');
  }

  return json.data;
}