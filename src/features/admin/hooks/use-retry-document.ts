'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notify } from '@/shared/lib/notify';
import { retryDocument } from '../api/retry-document';

export function useRetryDocument(token?: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderId: string) => retryDocument(token as string, orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-documents'] });
      queryClient.invalidateQueries({ queryKey: ['admin-orders'] });
      notify.success('Se reintentó la emisión del comprobante satisfactoriamente.');
    },
    onError: (error) => {
      notify.error(error, 'No se pudo reintentar la emisión del comprobante.');
    },
  });
}
