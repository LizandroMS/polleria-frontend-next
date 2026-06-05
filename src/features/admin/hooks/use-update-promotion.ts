'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePromotion } from '../api/update-promotion';
import { notify } from '@/shared/lib/notify';

export function useUpdatePromotion(token?: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any }) =>
      updatePromotion(token as string, id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-promotions'] });
      notify.success('La promoción se actualizó satisfactoriamente.');
    },
    onError: (error) => {
      notify.error(error, 'No se pudo actualizar la promoción.');
    },
  });
}
