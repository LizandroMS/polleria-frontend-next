'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleBranch } from '../api/toggle-branch';

export function useToggleBranch(token?: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => toggleBranch(token as string, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-branches'] });
    },
  });
}