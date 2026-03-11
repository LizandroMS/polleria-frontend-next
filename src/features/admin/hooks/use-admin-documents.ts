'use client';

import { useQuery } from '@tanstack/react-query';
import { getAdminDocuments } from '../api/get-admin-documents';

export function useAdminDocuments(token?: string | null) {
  return useQuery({
    queryKey: ['admin-documents'],
    queryFn: () => getAdminDocuments(token as string),
    enabled: !!token,
  });
}