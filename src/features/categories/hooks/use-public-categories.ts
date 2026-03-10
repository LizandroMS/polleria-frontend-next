'use client';

import { useQuery } from '@tanstack/react-query';
import { getPublicCategories } from '../api/get-public-categories';

export function usePublicCategories() {
  return useQuery({
    queryKey: ['public-categories'],
    queryFn: getPublicCategories,
  });
}