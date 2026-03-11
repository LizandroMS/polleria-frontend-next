import { authGet } from '@/lib/api/auth-client';

export function getProfileMe(token: string) {
  return authGet('/profile/me', token);
}