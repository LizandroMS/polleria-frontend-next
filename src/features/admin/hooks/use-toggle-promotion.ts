'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { togglePromotion } from '../api/toggle-promotion';

export function useTogglePromotion(token?: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => togglePromotion(token as string, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-promotions'] });
    },
  });
}