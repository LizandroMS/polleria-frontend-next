import { authPost } from '@/lib/api/auth-client';

export function retryDocument(token: string, orderId: string) {
  return authPost(`/billing/retry/${orderId}`, token, {});
}