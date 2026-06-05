'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createWorker } from '../api/create-worker';

export function useCreateWorker(token?: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: any) => createWorker(token as string, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-workers'] });
    },
  });
}