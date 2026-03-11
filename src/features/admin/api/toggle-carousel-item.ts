import { authPatch } from '@/lib/api/auth-client';

export function toggleCarouselItem(token: string, id: string) {
  return authPatch(`/carousel/${id}/toggle-active`, token);
}