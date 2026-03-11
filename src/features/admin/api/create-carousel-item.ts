import { authPost } from '@/lib/api/auth-client';

export function createCarouselItem(token: string, payload: any) {
  return authPost('/carousel', token, payload);
}