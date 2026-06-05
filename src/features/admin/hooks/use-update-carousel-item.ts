'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCarouselItem } from '../api/update-carousel-item';
import { notify } from '@/shared/lib/notify';

export function useUpdateCarouselItem(token?: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any }) =>
      updateCarouselItem(token as string, id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-carousel'] });
      notify.success('El elemento del carrusel se actualizó satisfactoriamente.');
    },
    onError: (error) => {
      notify.error(error, 'No se pudo actualizar el elemento del carrusel.');
    },
  });
}
