import { authPatch } from '@/lib/api/auth-client';

export function toggleCategory(token: string, id: string) {
  return authPatch(`/categories/${id}/toggle-active`, token);
}