'use client';

import { supabase } from '@/lib/supabase/client';
import { removeChannels } from '@/lib/supabase/realtime';
import { useAuth } from '@/hooks/use-auth';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

export function useRealtimeMyOrders() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!user?.id) return;

    const ordersChannel = supabase
      .channel(`my-orders-${user.id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'orders',
          filter: `customer_id=eq.${user.id}`,
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ['my-orders'] });
        },
      )
      .subscribe();

    const historyChannel = supabase
      .channel(`my-order-history-${user.id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'order_status_history',
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ['my-orders'] });
          queryClient.invalidateQueries({ queryKey: ['order-by-id'] });
        },
      )
      .subscribe();

    return () => {
      removeChannels([ordersChannel, historyChannel]);
    };
  }, [user?.id, queryClient]);
}