'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notify } from '@/shared/lib/notify';
import { deleteAddress } from '../api/delete-address';

export function useDeleteAddress(token?: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteAddress(token as string, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-addresses'] });
      notify.success('La dirección se eliminó satisfactoriamente.');
    },
    onError: (error) => {
      notify.error(error, 'No se pudo eliminar la dirección.');
    },
  });
}
