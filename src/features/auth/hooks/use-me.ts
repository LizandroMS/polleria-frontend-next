'use client';

import { useQuery } from '@tanstack/react-query';
import { getMe } from '../api/me';

export function useMe(token?: string | null) {
  return useQuery({
    queryKey: ['me', token],
    queryFn: () => getMe(token as string),
    enabled: !!token,
  });
}