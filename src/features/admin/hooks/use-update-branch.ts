'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBranch } from '../api/update-branch';

export function useUpdateBranch(token?: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any }) =>
      updateBranch(token as string, id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-branches'] });
    },
  });
}