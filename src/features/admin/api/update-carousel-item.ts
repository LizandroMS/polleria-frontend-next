import { authPatch } from '@/lib/api/auth-client';

export function updateCarouselItem(token: string, id: string, payload: any) {
  return authPatch(`/carousel/${id}`, token, payload);
}