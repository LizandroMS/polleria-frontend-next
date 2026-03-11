import { authPatch } from '@/lib/api/auth-client';

export function toggleProduct(token: string, id: string) {
  return authPatch(`/products/${id}/toggle-active`, token);
}