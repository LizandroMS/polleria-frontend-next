'use client';

import { useQuery } from '@tanstack/react-query';
import { getAdminCategories } from '../api/get-admin-categories';

export function useAdminCategories(token?: string | null) {
  return useQuery({
    queryKey: ['admin-categories'],
    queryFn: () => getAdminCategories(token as string),
    enabled: !!token,
  });
}