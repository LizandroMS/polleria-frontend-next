'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { setDefaultAddress } from '../api/set-default-address';

export function useSetDefaultAddress(token?: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => setDefaultAddress(token as string, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-addresses'] });
    },
  });
}