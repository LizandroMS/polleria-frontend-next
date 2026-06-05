'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleCarouselItem } from '../api/toggle-carousel-item';
import { notify } from '@/shared/lib/notify';

export function useToggleCarouselItem(token?: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => toggleCarouselItem(token as string, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-carousel'] });
      notify.success('El estado del carrusel se actualizó satisfactoriamente.');
    },
    onError: (error) => {
      notify.error(error, 'No se pudo cambiar el estado del carrusel.');
    },
  });
}
