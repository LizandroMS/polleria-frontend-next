'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleDocumentSeries } from '../api/toggle-document-series';

export function useToggleDocumentSeries(token?: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => toggleDocumentSeries(token as string, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-document-series'] });
    },
  });
}
