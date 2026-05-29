'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createDocumentSeries } from '../api/create-document-series';

export function useCreateDocumentSeries(token?: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: any) => createDocumentSeries(token as string, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-document-series'] });
    },
  });
}
