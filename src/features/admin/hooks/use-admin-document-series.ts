'use client';

import { useQuery } from '@tanstack/react-query';
import { getAdminDocumentSeries } from '../api/get-admin-document-series';

export function useAdminDocumentSeries(token?: string | null) {
  return useQuery({
    queryKey: ['admin-document-series'],
    queryFn: () => getAdminDocumentSeries(token as string),
    enabled: !!token,
  });
}
