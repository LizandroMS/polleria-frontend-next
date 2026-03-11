'use client';

import { useQuery } from '@tanstack/react-query';
import { getAdminWorkers } from '../api/get-admin-workers';

export function useAdminWorkers(token?: string | null) {
  return useQuery({
    queryKey: ['admin-workers'],
    queryFn: () => getAdminWorkers(token as string),
    enabled: !!token,
  });
}