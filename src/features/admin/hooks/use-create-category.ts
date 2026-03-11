'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCategory } from '../api/create-category';

export function useCreateCategory(token?: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: any) => createCategory(token as string, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-categories'] });
    },
  });
}