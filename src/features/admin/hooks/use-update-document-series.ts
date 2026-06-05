'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateDocumentSeries } from '../api/update-document-series';
import { notify } from '@/shared/lib/notify';

export function useUpdateDocumentSeries(token?: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any }) =>
      updateDocumentSeries(token as string, id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-document-series'] });
      notify.success('La serie se actualizó satisfactoriamente.');
    },
    onError: (error) => {
      notify.error(error, 'No se pudo actualizar la serie.');
    },
  });
}
