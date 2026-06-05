'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notify } from '@/shared/lib/notify';
import { queryDocumentStatus } from '../api/query-document-status';

export function useQueryDocumentStatus(token?: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderId: string) => queryDocumentStatus(token as string, orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-documents'] });
      notify.success('El estado del comprobante se consultó satisfactoriamente.');
    },
    onError: (error) => {
      notify.error(error, 'No se pudo consultar el estado del comprobante.');
    },
  });
}
