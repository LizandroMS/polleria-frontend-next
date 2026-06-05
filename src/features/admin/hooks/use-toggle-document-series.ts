'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleDocumentSeries } from '../api/toggle-document-series';
import { notify } from '@/shared/lib/notify';

export function useToggleDocumentSeries(token?: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => toggleDocumentSeries(token as string, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-document-series'] });
      notify.success('El estado de la serie se actualizó satisfactoriamente.');
    },
    onError: (error) => {
      notify.error(error, 'No se pudo cambiar el estado de la serie.');
    },
  });
}
