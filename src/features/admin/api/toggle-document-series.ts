import { authPatch } from '@/lib/api/auth-client';

export function toggleDocumentSeries(token: string, id: string) {
  return authPatch(`/billing/series/${id}/toggle-active`, token);
}
