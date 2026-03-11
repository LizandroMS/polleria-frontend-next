'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { unassignWorkerBranch } from '../api/unassign-worker-branch';

export function useUnassignWorkerBranch(token?: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => unassignWorkerBranch(token as string, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['worker-assignments'] });
    },
  });
}