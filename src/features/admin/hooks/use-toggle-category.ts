'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleCategory } from '../api/toggle-category';
import { notify } from '@/shared/lib/notify';

export function useToggleCategory(token?: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => toggleCategory(token as string, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-categories'] });
      notify.success('El estado de la categoría se actualizó satisfactoriamente.');
    },
    onError: (error) => {
      notify.error(error, 'No se pudo cambiar el estado de la categoría.');
    },
  });
}
