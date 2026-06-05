'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateWorker } from '../api/update-worker';
import { notify } from '@/shared/lib/notify';

export function useUpdateWorker(token?: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any }) =>
      updateWorker(token as string, id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-workers'] });
      notify.success('El trabajador se actualizó satisfactoriamente.');
    },
    onError: (error) => {
      notify.error(error, 'No se pudo actualizar el trabajador.');
    },
  });
}
