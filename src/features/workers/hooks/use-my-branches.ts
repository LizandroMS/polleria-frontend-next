'use client';

import { useQuery } from '@tanstack/react-query';
import { getMyBranches } from '../api/get-my-branches';

export function useMyBranches(token?: string | null) {
  return useQuery({
    queryKey: ['worker-my-branches', token],
    queryFn: () => getMyBranches(token as string),
    enabled: !!token,
  });
}