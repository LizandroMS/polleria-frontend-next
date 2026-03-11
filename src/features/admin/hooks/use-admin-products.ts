'use client';

import { useQuery } from '@tanstack/react-query';
import { getAdminProducts } from '../api/get-admin-products';

export function useAdminProducts(token?: string | null) {
  return useQuery({
    queryKey: ['admin-products'],
    queryFn: () => getAdminProducts(token as string),
    enabled: !!token,
  });
}