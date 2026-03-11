'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateAddress } from '../api/update-address';

export function useUpdateAddress(token?: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any }) =>
      updateAddress(token as string, id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-addresses'] });
    },
  });
}