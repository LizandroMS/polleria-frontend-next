'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notify } from '@/shared/lib/notify';
import { changeOrderStatus } from '../api/change-order-status';

export function useChangeOrderStatus(token?: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: { orderId: string; status: string; comment?: string }) =>
      changeOrderStatus(
        input.orderId,
        { status: input.status, comment: input.comment },
        token as string,
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['worker-orders'] });
      queryClient.invalidateQueries({ queryKey: ['admin-orders'] });
      queryClient.invalidateQueries({ queryKey: ['my-orders'] });
      notify.success('El estado del pedido se actualizó satisfactoriamente.');
    },
    onError: (error) => {
      notify.error(error, 'No se pudo actualizar el estado del pedido.');
    },
  });
}
