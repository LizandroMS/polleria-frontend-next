import { apiGet } from '@/lib/api/client';
import { Product } from '../types';

export async function getPublicProducts(params?: {
  categorySlug?: string;
  branchId?: string;
}) {
  const search = new URLSearchParams();

  if (params?.categorySlug) search.set('categorySlug', params.categorySlug);
  if (params?.branchId) search.set('branchId', params.branchId);

  const query = search.toString();
  return apiGet<Product[]>(`/products/public${query ? `?${query}` : ''}`);
}