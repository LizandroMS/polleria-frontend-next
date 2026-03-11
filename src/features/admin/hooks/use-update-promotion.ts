'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePromotion } from '../api/update-promotion';

export function useUpdatePromotion(token?: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any }) =>
      updatePromotion(token as string, id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-promotions'] });
    },
  });
}