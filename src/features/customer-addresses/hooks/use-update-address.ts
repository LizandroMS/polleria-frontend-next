'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notify } from '@/shared/lib/notify';
import { updateAddress } from '../api/update-address';

export function useUpdateAddress(token?: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any }) =>
      updateAddress(token as string, id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-addresses'] });
      notify.success('La dirección se actualizó satisfactoriamente.');
    },
    onError: (error) => {
      notify.error(error, 'No se pudo actualizar la dirección.');
    },
  });
}
