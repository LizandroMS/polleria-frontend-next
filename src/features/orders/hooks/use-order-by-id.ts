'use client';

import { useQuery } from '@tanstack/react-query';
import { getOrderById } from '../api/get-order-by-id';

export function useOrderById(id?: string, token?: string | null) {
  return useQuery({
    queryKey: ['order-by-id', id, token],
    queryFn: () => getOrderById(id as string, token as string),
    enabled: !!id && !!token,
  });
}