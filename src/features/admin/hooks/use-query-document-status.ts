
'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryDocumentStatus } from '../api/query-document-status';

export function useQueryDocumentStatus(token?: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderId: string) => queryDocumentStatus(token as string, orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-documents'] });
    },
  });
}