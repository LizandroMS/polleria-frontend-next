'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { emitDocument } from '../api/emit-document';

export function useEmitDocument(token?: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderId: string) => emitDocument(token as string, orderId),
    onSuccess: () => {
      // Nota para mí: luego de emitir debo refrescar pedidos y comprobantes,
      // porque el backend actualiza orders y electronic_documents.
      queryClient.invalidateQueries({ queryKey: ['admin-orders'] });
      queryClient.invalidateQueries({ queryKey: ['admin-documents'] });
    },
  });
}
