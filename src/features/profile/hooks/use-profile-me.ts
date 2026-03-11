'use client';

import { useQuery } from '@tanstack/react-query';
import { getProfileMe } from '../api/get-profile-me';

export function useProfileMe(token?: string | null) {
  return useQuery({
    queryKey: ['profile-me'],
    queryFn: () => getProfileMe(token as string),
    enabled: !!token,
  });
}