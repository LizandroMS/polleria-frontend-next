const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getMyOrders(token: string) {
  const response = await fetch(`${API_URL}/orders/my`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  const json = await response.json();

  if (!response.ok || !json.success) {
    throw new Error(json.message ?? 'No se pudo obtener los pedidos');
  }

  return json.data;
}