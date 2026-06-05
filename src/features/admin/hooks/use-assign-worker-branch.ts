'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { assignWorkerBranch } from '../api/assign-worker-branch';
import { notify } from '@/shared/lib/notify';

export function useAssignWorkerBranch(token?: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: any) => assignWorkerBranch(token as string, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['worker-assignments'] });
      notify.success('La sucursal se asignó satisfactoriamente.');
    },
    onError: (error) => {
      notify.error(error, 'No se pudo asignar la sucursal.');
    },
  });
}
