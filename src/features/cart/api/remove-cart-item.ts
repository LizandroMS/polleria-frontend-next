const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function removeCartItem(itemId: string) {
  const response = await fetch(`${API_URL}/cart/items/${itemId}`, {
    method: 'DELETE',
  });

  const json = await response.json();

  if (!response.ok || !json.success) {
    throw new Error(json.message ?? 'No se pudo eliminar el item');
  }

  return json.data;
}