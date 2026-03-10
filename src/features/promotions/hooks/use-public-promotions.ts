'use client';

import { useQuery } from '@tanstack/react-query';
import { getPublicPromotions } from '../api/get-public-promotions';

export function usePublicPromotions() {
  return useQuery({
    queryKey: ['public-promotions'],
    queryFn: getPublicPromotions,
  });
}