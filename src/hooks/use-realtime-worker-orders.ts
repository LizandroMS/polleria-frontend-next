'use client';

import { supabase } from '@/lib/supabase/client';
import { removeChannels } from '@/lib/supabase/realtime';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

export function useRealtimeWorkerOrders(branchIds?: string[]) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!branchIds?.length) return;

    const channels = branchIds.flatMap((branchId) => {
      const ordersChannel = supabase
        .channel(`worker-orders-${branchId}`)
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'orders',
            filter: `branch_id=eq.${branchId}`,
          },
          () => {
            queryClient.invalidateQueries({ queryKey: ['worker-orders'] });
            queryClient.invalidateQueries({ queryKey: ['order-by-id'] });
          },
        )
        .subscribe();

      const historyChannel = supabase
        .channel(`worker-history-${branchId}`)
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'order_status_history',
          },
          () => {
            queryClient.invalidateQueries({ queryKey: ['worker-orders'] });
            queryClient.invalidateQueries({ queryKey: ['order-by-id'] });
          },
        )
        .subscribe();

      return [ordersChannel, historyChannel];
    });

    return () => {
      removeChannels(channels);
    };
  }, [branchIds?.join(','), queryClient]);
}