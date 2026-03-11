'use client';

import { useQuery } from '@tanstack/react-query';
import { getAdminOrders } from '../api/get-admin-orders';

export function useAdminOrders(token?: string | null, status?: string) {
  return useQuery({
    queryKey: ['admin-orders', status ?? 'all'],
    queryFn: () => getAdminOrders(token as string, status),
    enabled: !!token,
  });
}