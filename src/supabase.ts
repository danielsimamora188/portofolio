import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabaseInstance: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (!supabaseInstance) {
    const env = (import.meta as any).env || {};
    const url = env.VITE_SUPABASE_URL || '';
    const key = env.VITE_SUPABASE_ANON_KEY || '';
    
    // Ensure we have non-placeholder, non-empty, valid credentials
    const isValidUrl = url && url !== 'https://your-supabase-project.supabase.co' && !url.includes('your-supabase-project');
    const isValidKey = key && key !== 'your-supabase-anon-key';
    
    if (isValidUrl && isValidKey) {
      try {
        supabaseInstance = createClient(url, key);
      } catch (err) {
        console.error('Error creating Supabase client:', err);
      }
    }
  }
  return supabaseInstance;
}

export function isSupabaseConnected(): boolean {
  return !!getSupabase();
}
