import { authPatch } from '@/lib/api/auth-client';

export function updateProduct(token: string, id: string, payload: any) {
  return authPatch(`/products/${id}`, token, payload);
}