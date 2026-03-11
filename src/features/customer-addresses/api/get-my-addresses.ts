import { authGet } from '@/lib/api/auth-client';

export function getMyAddresses(token: string) {
  return authGet<any[]>('/customer-addresses', token);
}