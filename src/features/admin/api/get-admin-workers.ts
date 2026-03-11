import { authGet } from '@/lib/api/auth-client';

export function getAdminWorkers(token: string) {
  return authGet<any[]>('/users?role=WORKER', token);
}