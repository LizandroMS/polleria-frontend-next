'use client';

import { useMutation } from '@tanstack/react-query';
import { changeOrderStatus } from '../api/change-order-status';

export function useChangeOrderStatus(token?: string | null) {
  return useMutation({
    mutationFn: (input: { orderId: string; status: string; comment?: string }) =>
      changeOrderStatus(
        input.orderId,
        { status: input.status, comment: input.comment },
        token as string,
      ),
  });
}