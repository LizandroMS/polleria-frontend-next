'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProduct } from '../api/create-product';

export function useCreateProduct(token?: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: any) => createProduct(token as string, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
    },
  });
}