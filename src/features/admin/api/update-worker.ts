import { authPatch } from '@/lib/api/auth-client';

export function updateWorker(token: string, id: string, payload: any) {
  return authPatch(`/users/${id}`, token, payload);
}