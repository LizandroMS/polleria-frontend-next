'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notify } from '@/shared/lib/notify';
import { createAddress } from '../api/create-address';

export function useCreateAddress(token?: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: any) => createAddress(token as string, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-addresses'] });
      notify.success('La dirección se agregó satisfactoriamente.');
    },
    onError: (error) => {
      notify.error(error, 'No se pudo agregar la dirección.');
    },
  });
}
