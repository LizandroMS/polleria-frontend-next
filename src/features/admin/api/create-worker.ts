import { authPost } from '@/lib/api/auth-client';

export function createWorker(token: string, payload: any) {
  return authPost('/users', token, {
    ...payload,
    role: 'WORKER',
  });
}