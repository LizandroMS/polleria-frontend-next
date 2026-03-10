'use client';

import { useQuery } from '@tanstack/react-query';
import { getPublicBranches } from '../api/get-public-branches';

export function usePublicBranches() {
  return useQuery({
    queryKey: ['public-branches'],
    queryFn: getPublicBranches,
  });
}