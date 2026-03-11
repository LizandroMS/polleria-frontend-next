import { authPatch } from '@/lib/api/auth-client';

export function togglePromotion(token: string, id: string) {
  return authPatch(`/promotions/${id}/toggle-active`, token);
}