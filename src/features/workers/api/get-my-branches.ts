const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getMyBranches(token: string) {
  const response = await fetch(`${API_URL}/workers/my-branches`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  const json = await response.json();

  if (!response.ok || !json.success) {
    throw new Error(json.message ?? 'No se pudo obtener sucursales del trabajador');
  }

  return json.data;
}