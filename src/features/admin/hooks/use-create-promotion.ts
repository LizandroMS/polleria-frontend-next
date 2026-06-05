'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPromotion } from '../api/create-promotion';
import { notify } from '@/shared/lib/notify';

export function useCreatePromotion(token?: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: any) => createPromotion(token as string, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-promotions'] });
      notify.success('La promoción se agregó satisfactoriamente.');
    },
    onError: (error) => {
      notify.error(error, 'No se pudo agregar la promoción.');
    },
  });
}
