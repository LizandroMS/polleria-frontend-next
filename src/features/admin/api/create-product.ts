import { authPost } from '@/lib/api/auth-client';

export function createProduct(token: string, payload: any) {
  return authPost('/products', token, payload);
}