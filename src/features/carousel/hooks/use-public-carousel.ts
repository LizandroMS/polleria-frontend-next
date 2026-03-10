'use client';

import { useQuery } from '@tanstack/react-query';
import { getPublicCarousel } from '../api/get-public-carousel';//'../api/get-public-carousel';

export function usePublicCarousel() {
  return useQuery({
    queryKey: ['public-carousel'],
    queryFn: getPublicCarousel,
  });
}