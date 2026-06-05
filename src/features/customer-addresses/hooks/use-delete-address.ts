'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteAddress } from '../api/delete-address';

export function useDeleteAddress(token?: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteAddress(token as string, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-addresses'] });
    },
  });
}