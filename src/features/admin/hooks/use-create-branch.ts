'use client';

import { useMutation } from '@tanstack/react-query';
import { createBranch } from '../api/create-branch';

export function useCreateBranch(token?: string | null) {
  return useMutation({
    mutationFn: (payload: any) => createBranch(token as string, payload),
  });
}