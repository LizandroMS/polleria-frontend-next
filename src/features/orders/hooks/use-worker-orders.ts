'use client';

import { useQuery } from '@tanstack/react-query';
import { getWorkerOrders } from '../api/get-worker-orders';

export function useWorkerOrders(token?: string | null, status?: string) {
  return useQuery({
    queryKey: ['worker-orders', status ?? 'all'],
    queryFn: () => getWorkerOrders(token as string, status),
    enabled: !!token,
  });
}