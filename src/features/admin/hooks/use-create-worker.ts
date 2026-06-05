'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createWorker } from '../api/create-worker';
import { notify } from '@/shared/lib/notify';

export function useCreateWorker(token?: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: any) => createWorker(token as string, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-workers'] });
      notify.success('El trabajador se agregó satisfactoriamente.');
    },
    onError: (error) => {
      notify.error(error, 'No se pudo agregar el trabajador.');
    },
  });
}
