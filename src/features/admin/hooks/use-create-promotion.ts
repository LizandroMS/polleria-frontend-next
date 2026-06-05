'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPromotion } from '../api/create-promotion';

export function useCreatePromotion(token?: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: any) => createPromotion(token as string, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-promotions'] });
    },
  });
}