'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProduct } from '../api/update-product';
import { notify } from '@/shared/lib/notify';

export function useUpdateProduct(token?: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any }) =>
      updateProduct(token as string, id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      notify.success('El producto se actualizó satisfactoriamente.');
    },
    onError: (error) => {
      notify.error(error, 'No se pudo actualizar el producto.');
    },
  });
}
