'use client';

import { useQuery } from '@tanstack/react-query';
import { getAdminCarousel } from '../api/get-admin-carousel';

export function useAdminCarousel(token?: string | null) {
  return useQuery({
    queryKey: ['admin-carousel'],
    queryFn: () => getAdminCarousel(token as string),
    enabled: !!token,
  });
}