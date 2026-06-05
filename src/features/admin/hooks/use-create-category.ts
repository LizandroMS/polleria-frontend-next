'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCategory } from '../api/create-category';
import { notify } from '@/shared/lib/notify';

export function useCreateCategory(token?: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: any) => createCategory(token as string, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-categories'] });
      notify.success('La categoría se agregó satisfactoriamente.');
    },
    onError: (error) => {
      notify.error(error, 'No se pudo agregar la categoría.');
    },
  });
}
