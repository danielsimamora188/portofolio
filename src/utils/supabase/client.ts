import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_PUBLISHABLE_KEY

export function createClient() {
  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase URL and publishable key are required.')
  }

  return createBrowserClient(supabaseUrl, supabaseKey)
}
