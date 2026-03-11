'use client';

import { useQuery } from '@tanstack/react-query';
import { getMyAddresses } from '../api/get-my-addresses';

export function useMyAddresses(token?: string | null) {
  return useQuery({
    queryKey: ['my-addresses'],
    queryFn: () => getMyAddresses(token as string),
    enabled: !!token,
  });
}