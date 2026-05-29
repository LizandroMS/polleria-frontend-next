import { authGet } from '@/lib/api/auth-client';

export function getAdminDocumentSeries(token: string) {
  return authGet<any[]>('/billing/series', token);
}
