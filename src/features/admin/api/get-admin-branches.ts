import { authGet } from '@/lib/api/auth-client';

export function getAdminBranches(token: string) {
  return authGet<any[]>('/branches', token);
}