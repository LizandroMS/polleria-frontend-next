const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function updateCartItem(itemId: string, quantity: number) {
  const response = await fetch(`${API_URL}/cart/items/${itemId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ quantity }),
  });

  const json = await response.json();

  if (!response.ok || !json.success) {
    throw new Error(json.message ?? 'No se pudo actualizar el item');
  }

  return json.data;
}