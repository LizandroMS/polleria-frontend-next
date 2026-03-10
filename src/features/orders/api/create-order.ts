import { CreateOrderPayload } from '../types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function createOrder(payload: CreateOrderPayload, token: string) {
  const response = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const json = await response.json();

  if (!response.ok || !json.success) {
    throw new Error(json.message ?? 'No se pudo crear el pedido');
  }

  return json.data;
}