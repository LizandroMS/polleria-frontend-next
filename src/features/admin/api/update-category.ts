import { authPatch } from '@/lib/api/auth-client';

export function updateCategory(token: string, id: string, payload: any) {
  return authPatch(`/categories/${id}`, token, payload);
}