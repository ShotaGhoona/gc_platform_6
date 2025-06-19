import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ufvjbfyuzxhtshbgntxy.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVmdmpiZnl1enhodHNoYmdudHh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzMjEzMTksImV4cCI6MjA2NTg5NzMxOX0.OZzp4kxzqxuUF5SoVqB217D01hhVrCDzqRI_9I6T9CA'

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseKey)