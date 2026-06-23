import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabaseInstance: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (!supabaseInstance) {
    const env = (import.meta as any).env || {};
    const url = env.VITE_SUPABASE_URL || '';
    const key = env.VITE_SUPABASE_ANON_KEY || '';
    
    if (url && key) {
      supabaseInstance = createClient(url, key);
    }
  }
  return supabaseInstance;
}

export function isSupabaseConnected(): boolean {
  return !!getSupabase();
}
