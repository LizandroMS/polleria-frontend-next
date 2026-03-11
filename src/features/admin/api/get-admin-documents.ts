import { authGet } from '@/lib/api/auth-client';

export function getAdminDocuments(token: string) {
  return authGet<any[]>('/billing', token);
}