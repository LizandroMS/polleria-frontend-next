'use client';

import { useMutation } from '@tanstack/react-query';
import { createOrder } from '../api/create-order';
import { CreateOrderPayload } from '../types';

export function useCreateOrder(token?: string | null) {
  return useMutation({
    mutationFn: (payload: CreateOrderPayload) => createOrder(payload, token as string),
  });
}