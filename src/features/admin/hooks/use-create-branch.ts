'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notify } from '@/shared/lib/notify';
import { createBranch } from '../api/create-branch';

export function useCreateBranch(token?: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: any) => createBranch(token as string, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-branches'] });
      notify.success('La sucursal se agregó satisfactoriamente.');
    },
    onError: (error) => {
      notify.error(error, 'No se pudo agregar la sucursal.');
    },
  });
}
