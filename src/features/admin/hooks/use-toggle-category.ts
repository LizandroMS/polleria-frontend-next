'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleCategory } from '../api/toggle-category';

export function useToggleCategory(token?: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => toggleCategory(token as string, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-categories'] });
    },
  });
}