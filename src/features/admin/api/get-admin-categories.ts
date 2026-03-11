import { authGet } from '@/lib/api/auth-client';

export function getAdminCategories(token: string) {
  return authGet<any[]>('/categories', token);
}