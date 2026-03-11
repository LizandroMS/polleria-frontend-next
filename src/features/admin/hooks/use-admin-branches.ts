'use client';

import { useQuery } from '@tanstack/react-query';
import { getAdminBranches } from '../api/get-admin-branches';

export function useAdminBranches(token?: string | null) {
  return useQuery({
    queryKey: ['admin-branches'],
    queryFn: () => getAdminBranches(token as string),
    enabled: !!token,
  });
}