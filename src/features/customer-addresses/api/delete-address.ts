import { authDelete } from '@/lib/api/auth-client';

export function deleteAddress(token: string, id: string) {
  return authDelete(`/customer-addresses/${id}`, token);
}