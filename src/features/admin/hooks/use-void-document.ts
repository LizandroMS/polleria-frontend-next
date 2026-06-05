'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notify } from '@/shared/lib/notify';
import { voidDocument } from '../api/void-document';

export function useVoidDocument(token?: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { orderId: string; reason?: string }) =>
      voidDocument(token as string, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-documents'] });
      queryClient.invalidateQueries({ queryKey: ['admin-orders'] });
      notify.success('El comprobante se anuló satisfactoriamente.');
    },
    onError: (error) => {
      notify.error(error, 'No se pudo anular el comprobante.');
    },
  });
}
