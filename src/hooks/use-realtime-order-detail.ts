'use client';

import { supabase } from '@/lib/supabase/client';
import { removeChannels } from '@/lib/supabase/realtime';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

export function useRealtimeOrderDetail(orderId?: string) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!orderId) return;

    const orderChannel = supabase
      .channel(`order-detail-${orderId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'orders',
          filter: `id=eq.${orderId}`,
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ['order-by-id', orderId] });
          queryClient.invalidateQueries({ queryKey: ['my-orders'] });
          queryClient.invalidateQueries({ queryKey: ['worker-orders'] });
        },
      )
      .subscribe();

    const historyChannel = supabase
      .channel(`order-history-${orderId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'order_status_history',
          filter: `order_id=eq.${orderId}`,
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ['order-by-id', orderId] });
          queryClient.invalidateQueries({ queryKey: ['my-orders'] });
          queryClient.invalidateQueries({ queryKey: ['worker-orders'] });
        },
      )
      .subscribe();

    return () => {
      removeChannels([orderChannel, historyChannel]);
    };
  }, [orderId, queryClient]);
}