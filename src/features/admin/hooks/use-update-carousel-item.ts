'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCarouselItem } from '../api/update-carousel-item';

export function useUpdateCarouselItem(token?: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any }) =>
      updateCarouselItem(token as string, id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-carousel'] });
    },
  });
}