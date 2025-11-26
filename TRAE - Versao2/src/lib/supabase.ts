import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

let supabase: any

if (!supabaseUrl || !supabaseAnonKey || supabaseUrl === 'https://your-project.supabase.co') {
  console.warn('Supabase não configurado. Usando modo de demonstração.')
  // Mock supabase client for demo purposes
  supabase = {
    from: () => ({
      select: () => Promise.resolve({ data: [], error: null }),
      insert: () => Promise.resolve({ data: [{ id: 'demo-id' }], error: null }),
      update: () => Promise.resolve({ data: [], error: null }),
      eq: () => ({
        select: () => Promise.resolve({ data: [], error: null }),
        update: () => Promise.resolve({ data: [], error: null })
      })
    })
  }
} else {
  supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true
    }
  })
}

export { supabase }