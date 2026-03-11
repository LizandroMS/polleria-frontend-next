import { authGet } from '@/lib/api/auth-client';

export function getAdminPromotions(token: string) {
  return authGet<any[]>('/promotions', token);
}