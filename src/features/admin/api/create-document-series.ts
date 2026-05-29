import { authPost } from '@/lib/api/auth-client';

export function createDocumentSeries(token: string, payload: any) {
  return authPost('/billing/series', token, payload);
}
