'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleBranch } from '../api/toggle-branch';
import { notify } from '@/shared/lib/notify';

export function useToggleBranch(token?: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => toggleBranch(token as string, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-branches'] });
      notify.success('El estado de la sucursal se actualizó satisfactoriamente.');
    },
    onError: (error) => {
      notify.error(error, 'No se pudo cambiar el estado de la sucursal.');
    },
  });
}
