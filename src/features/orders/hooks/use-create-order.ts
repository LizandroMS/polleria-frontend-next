'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notify } from '@/shared/lib/notify';
import { createOrder } from '../api/create-order';
import { CreateOrderPayload } from '../types';

export function useCreateOrder(token?: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateOrderPayload) => createOrder(payload, token as string),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-orders'] });
      notify.success('Tu pedido se registró satisfactoriamente.');
    },
    onError: (error) => {
      notify.error(error, 'No se pudo registrar tu pedido.');
    },
  });
}
