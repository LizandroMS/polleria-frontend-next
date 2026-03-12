'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateWorker } from '../api/update-worker';

export function useUpdateWorker(token?: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any }) =>
      updateWorker(token as string, id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-workers'] });
    },
  });
}