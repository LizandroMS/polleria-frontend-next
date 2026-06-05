'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { assignWorkerBranch } from '../api/assign-worker-branch';

export function useAssignWorkerBranch(token?: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: any) => assignWorkerBranch(token as string, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['worker-assignments'] });
    },
  });
}