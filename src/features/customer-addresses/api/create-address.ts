import { authPost } from '@/lib/api/auth-client';

export function createAddress(token: string, payload: any) {
  return authPost('/customer-addresses', token, payload);
}