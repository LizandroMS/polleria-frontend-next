'use client';

import { useQuery } from '@tanstack/react-query';
import { getWorkerAssignments } from '../api/get-worker-assignments';

export function useWorkerAssignments(token?: string | null) {
  return useQuery({
    queryKey: ['worker-assignments'],
    queryFn: () => getWorkerAssignments(token as string),
    enabled: !!token,
  });
}