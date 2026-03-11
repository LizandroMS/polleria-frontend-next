'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleCarouselItem } from '../api/toggle-carousel-item';

export function useToggleCarouselItem(token?: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => toggleCarouselItem(token as string, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-carousel'] });
    },
  });
}