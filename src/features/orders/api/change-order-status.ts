const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function changeOrderStatus(
  orderId: string,
  payload: { status: string; comment?: string },
  token: string,
) {
  const response = await fetch(`${API_URL}/orders/${orderId}/status`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const json = await response.json();

  if (!response.ok || !json.success) {
    throw new Error(json.message ?? 'No se pudo actualizar el estado');
  }

  return json.data;
}