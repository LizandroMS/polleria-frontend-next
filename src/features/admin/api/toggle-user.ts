import { authPatch } from '@/lib/api/auth-client';

export function toggleUser(token: string, id: string) {
  return authPatch(`/users/${id}/toggle-active`, token);
}