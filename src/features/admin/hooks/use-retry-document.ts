'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { retryDocument } from '../api/retry-document';

export function useRetryDocument(token?: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderId: string) => retryDocument(token as string, orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-documents'] });
      queryClient.invalidateQueries({ queryKey: ['admin-orders'] });
    },
  });
}