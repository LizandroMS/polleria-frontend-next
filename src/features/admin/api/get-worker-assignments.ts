import { authGet } from '@/lib/api/auth-client';

export function getWorkerAssignments(token: string) {
  return authGet<any[]>('/workers/assignments', token);
}