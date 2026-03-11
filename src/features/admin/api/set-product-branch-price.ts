import { authPost } from '@/lib/api/auth-client';

export function setProductBranchPrice(token: string, id: string, payload: any) {
  return authPost(`/products/${id}/branch-price`, token, payload);
}