'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleUser } from '../api/toggle-user';
import { notify } from '@/shared/lib/notify';

export function useToggleUser(token?: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => toggleUser(token as string, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-workers'] });
      notify.success('El estado del usuario se actualizó satisfactoriamente.');
    },
    onError: (error) => {
      notify.error(error, 'No se pudo cambiar el estado del usuario.');
    },
  });
}
