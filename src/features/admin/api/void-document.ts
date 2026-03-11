import { authPatch } from '@/lib/api/auth-client';

export function voidDocument(token: string, payload: { orderId: string; reason?: string }) {
  return authPatch('/billing/void', token, payload);
}