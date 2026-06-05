'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCarouselItem } from '../api/create-carousel-item';
import { notify } from '@/shared/lib/notify';

export function useCreateCarouselItem(token?: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: any) => createCarouselItem(token as string, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-carousel'] });
      notify.success('El elemento del carrusel se agregó satisfactoriamente.');
    },
    onError: (error) => {
      notify.error(error, 'No se pudo agregar el elemento del carrusel.');
    },
  });
}
