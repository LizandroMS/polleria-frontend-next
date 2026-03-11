import { authGet } from '@/lib/api/auth-client';

export function getAdminProducts(token: string) {
  return authGet<any[]>('/products', token);
}