import { authPost } from '@/lib/api/auth-client';

export function createPromotion(token: string, payload: any) {
  return authPost('/promotions', token, payload);
}