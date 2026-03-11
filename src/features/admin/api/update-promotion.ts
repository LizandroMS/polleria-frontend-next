import { authPatch } from '@/lib/api/auth-client';

export function updatePromotion(token: string, id: string, payload: any) {
  return authPatch(`/promotions/${id}`, token, payload);
}