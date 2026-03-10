'use client';

import { supabase } from '@/lib/supabase/client';
import { removeChannels } from '@/lib/supabase/realtime';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

export function useRealtimeAdminOrders() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const ordersChannel = supabase
      .channel('admin-orders-all')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'orders',
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ['worker-orders'] });
          queryClient.invalidateQueries({ queryKey: ['order-by-id'] });
          queryClient.invalidateQueries({ queryKey: ['my-orders'] });
        },
      )
      .subscribe();

    const historyChannel = supabase
      .channel('admin-order-history-all')
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
          queryClient.invalidateQueries({ queryKey: ['my-orders'] });
        },
      )
      .subscribe();

    return () => {
      removeChannels([ordersChannel, historyChannel]);
    };
  }, [queryClient]);
}