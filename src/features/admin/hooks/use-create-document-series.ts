'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createDocumentSeries } from '../api/create-document-series';
import { notify } from '@/shared/lib/notify';

export function useCreateDocumentSeries(token?: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: any) => createDocumentSeries(token as string, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-document-series'] });
      notify.success('La serie se agregó satisfactoriamente.');
    },
    onError: (error) => {
      notify.error(error, 'No se pudo agregar la serie.');
    },
  });
}
