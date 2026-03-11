import { authGet } from '@/lib/api/auth-client';

export function getAdminCarousel(token: string) {
  return authGet<any[]>('/carousel', token);
}