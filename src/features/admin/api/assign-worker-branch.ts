import { authPost } from '@/lib/api/auth-client';

export function assignWorkerBranch(token: string, payload: any) {
  return authPost('/workers/assign-branch', token, payload);
}