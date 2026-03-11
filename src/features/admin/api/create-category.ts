import { authPost } from '@/lib/api/auth-client';

export function createCategory(token: string, payload: any) {
  return authPost('/categories', token, payload);
}