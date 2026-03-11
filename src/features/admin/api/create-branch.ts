import { authPost } from '@/lib/api/auth-client';

export function createBranch(token: string, payload: any) {
  return authPost('/branches', token, payload);
}