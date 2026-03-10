import { RealtimeChannel } from '@supabase/supabase-js';
import { supabase } from './client';

export function removeChannel(channel: RealtimeChannel | null) {
  if (!channel) return;
  supabase.removeChannel(channel);
}

export function removeChannels(channels: Array<RealtimeChannel | null | undefined>) {
  channels.forEach((channel) => {
    if (channel) {
      supabase.removeChannel(channel);
    }
  });
}