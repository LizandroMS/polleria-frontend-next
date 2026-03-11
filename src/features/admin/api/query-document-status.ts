import { authPost } from '@/lib/api/auth-client';

export function queryDocumentStatus(token: string, orderId: string) {
  return authPost(`/billing/status/${orderId}`, token, {});
}