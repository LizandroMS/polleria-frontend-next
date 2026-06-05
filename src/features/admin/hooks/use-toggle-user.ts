'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleUser } from '../api/toggle-user';

export function useToggleUser(token?: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => toggleUser(token as string, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-workers'] });
    },
  });
}