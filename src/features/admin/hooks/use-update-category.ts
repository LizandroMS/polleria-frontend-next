'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCategory } from '../api/update-category';

export function useUpdateCategory(token?: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any }) =>
      updateCategory(token as string, id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-categories'] });
    },
  });
}