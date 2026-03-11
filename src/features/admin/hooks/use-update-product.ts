'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProduct } from '../api/update-product';

export function useUpdateProduct(token?: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any }) =>
      updateProduct(token as string, id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
    },
  });
}