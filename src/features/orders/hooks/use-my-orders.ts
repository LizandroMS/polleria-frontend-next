'use client';

import { useQuery } from '@tanstack/react-query';
import { getMyOrders } from '../api/get-my-orders';

export function useMyOrders(token?: string | null) {
  return useQuery({
    queryKey: ['my-orders'],
    queryFn: () => getMyOrders(token as string),
    enabled: !!token,
  });
}