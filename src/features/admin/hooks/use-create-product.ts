'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProduct } from '../api/create-product';
import { notify } from '@/shared/lib/notify';

export function useCreateProduct(token?: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: any) => createProduct(token as string, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      notify.success('El producto se agregó satisfactoriamente.');
    },
    onError: (error) => {
      notify.error(error, 'No se pudo agregar el producto.');
    },
  });
}
