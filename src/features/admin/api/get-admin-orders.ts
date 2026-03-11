import { authGet } from '@/lib/api/auth-client';

export function getAdminOrders(token: string, status?: string) {
  const query = status ? `?status=${status}` : '';
  return authGet<any[]>(`/orders${query}`, token);
}