'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleProduct } from '../api/toggle-product';
import { notify } from '@/shared/lib/notify';

export function useToggleProduct(token?: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => toggleProduct(token as string, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      notify.success('El estado del producto se actualizó satisfactoriamente.');
    },
    onError: (error) => {
      notify.error(error, 'No se pudo cambiar el estado del producto.');
    },
  });
}
