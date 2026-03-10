const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function mergeCart(sessionId: string, token: string) {
  const response = await fetch(`${API_URL}/cart/merge`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ sessionId }),
  });

  const json = await response.json();

  if (!response.ok || !json.success) {
    throw new Error(json.message ?? 'No se pudo fusionar el carrito');
  }

  return json.data;
}