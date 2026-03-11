'use client';

import { useQuery } from '@tanstack/react-query';
import { getAdminPromotions } from '../api/get-admin-promotions';

export function useAdminPromotions(token?: string | null) {
  return useQuery({
    queryKey: ['admin-promotions'],
    queryFn: () => getAdminPromotions(token as string),
    enabled: !!token,
  });
}