import { authPatch } from '@/lib/api/auth-client';

export function toggleBranch(token: string, id: string) {
  return authPatch(`/branches/${id}/toggle-active`, token);
}