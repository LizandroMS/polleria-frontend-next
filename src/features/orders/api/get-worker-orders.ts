const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getWorkerOrders(token: string, status?: string) {
  const search = new URLSearchParams();
  if (status) search.set('status', status);

  const response = await fetch(`${API_URL}/orders${search.toString() ? `?${search.toString()}` : ''}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  const json = await response.json();

  if (!response.ok || !json.success) {
    throw new Error(json.message ?? 'No se pudo obtener los pedidos operativos');
  }

  return json.data;
}