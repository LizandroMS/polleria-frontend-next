'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCarouselItem } from '../api/create-carousel-item';

export function useCreateCarouselItem(token?: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: any) => createCarouselItem(token as string, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-carousel'] });
    },
  });
}