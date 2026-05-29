import { authPost } from '@/lib/api/auth-client';

export function emitDocument(token: string, orderId: string) {
  return authPost(`/billing/emit/${orderId}`, token, {});
}
