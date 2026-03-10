const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function addCartItem(payload: {
  cartId: string;
  productId: string;
  branchId: string;
  quantity: number;
  promotionId?: string;
}) {
  const response = await fetch(`${API_URL}/cart/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const json = await response.json();

  if (!response.ok || !json.success) {
    throw new Error(json.message ?? 'No se pudo agregar el item');
  }

  return json.data;
}