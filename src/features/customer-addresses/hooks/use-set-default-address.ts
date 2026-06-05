'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notify } from '@/shared/lib/notify';
import { setDefaultAddress } from '../api/set-default-address';

export function useSetDefaultAddress(token?: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => setDefaultAddress(token as string, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-addresses'] });
      notify.success('La dirección principal se actualizó satisfactoriamente.');
    },
    onError: (error) => {
      notify.error(error, 'No se pudo marcar la dirección como principal.');
    },
  });
}
