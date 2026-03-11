import { authPatch } from '@/lib/api/auth-client';

export function updateAddress(token: string, id: string, payload: any) {
  return authPatch(`/customer-addresses/${id}`, token, payload);
}