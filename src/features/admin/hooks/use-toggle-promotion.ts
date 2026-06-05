'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { togglePromotion } from '../api/toggle-promotion';
import { notify } from '@/shared/lib/notify';

export function useTogglePromotion(token?: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => togglePromotion(token as string, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-promotions'] });
      notify.success('El estado de la promoción se actualizó satisfactoriamente.');
    },
    onError: (error) => {
      notify.error(error, 'No se pudo cambiar el estado de la promoción.');
    },
  });
}
