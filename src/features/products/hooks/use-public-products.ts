'use client';

import { useQuery } from '@tanstack/react-query';
import { getPublicProducts } from '../api/get-public-products';

export function usePublicProducts(params?: { categorySlug?: string; branchId?: string }) {
  return useQuery({
    queryKey: ['public-products', params],
    queryFn: () => getPublicProducts(params),
  });
}