const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function createSessionCart(sessionId: string) {
  const response = await fetch(`${API_URL}/cart/session`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sessionId }),
  });

  const json = await response.json();

  if (!response.ok || !json.success) {
    throw new Error(json.message ?? 'No se pudo obtener el carrito de sesión');
  }

  return json.data;
}