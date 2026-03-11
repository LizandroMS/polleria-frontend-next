'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAddress } from '../api/create-address';

export function useCreateAddress(token?: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: any) => createAddress(token as string, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-addresses'] });
    },
  });
}