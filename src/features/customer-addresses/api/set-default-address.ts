import { authPatch } from '@/lib/api/auth-client';

export function setDefaultAddress(token: string, id: string) {
  return authPatch(`/customer-addresses/${id}/default`, token);
}