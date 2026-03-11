import { authDelete } from '@/lib/api/auth-client';

export function unassignWorkerBranch(token: string, id: string) {
  return authDelete(`/workers/assignments/${id}`, token);
}