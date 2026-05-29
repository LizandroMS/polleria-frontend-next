'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateDocumentSeries } from '../api/update-document-series';

export function useUpdateDocumentSeries(token?: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any }) =>
      updateDocumentSeries(token as string, id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-document-series'] });
    },
  });
}
