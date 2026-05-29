import { authPatch } from '@/lib/api/auth-client';

export function updateDocumentSeries(token: string, id: string, payload: any) {
  return authPatch(`/billing/series/${id}`, token, payload);
}
