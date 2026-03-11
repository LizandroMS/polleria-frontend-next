'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleProduct } from '../api/toggle-product';

export function useToggleProduct(token?: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => toggleProduct(token as string, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
    },
  });
}