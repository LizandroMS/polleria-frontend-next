import { authPatch } from '@/lib/api/auth-client';

export function updateBranch(token: string, id: string, payload: any) {
  return authPatch(`/branches/${id}`, token, payload);
}