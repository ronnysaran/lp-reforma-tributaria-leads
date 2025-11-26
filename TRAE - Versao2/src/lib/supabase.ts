import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

let supabase: any

if (!supabaseUrl || !supabaseAnonKey || supabaseUrl === 'https://your-project.supabase.co') {
  console.warn('Supabase não configurado. Usando modo de demonstração.')
  // Mock supabase client for demo purposes
  const createMockQuery = () => {
    const mockQuery = {
      select: () => mockQuery,
      insert: (data: any) => mockQuery,
      update: (data: any) => mockQuery,
      eq: (column: string, value: any) => mockQuery,
      single: () => Promise.resolve({ data: null, error: null }),
      then: (resolve: any) => {
        if (mockQuery._operation === 'insert') {
          resolve({ data: [{ id: 'demo-' + Date.now() }], error: null })
        } else if (mockQuery._operation === 'update') {
          resolve({ data: [], error: null })
        } else {
          resolve({ data: [], error: null })
        }
      },
      _operation: 'select'
    }
    
    // Override methods to set operation type
    const originalInsert = mockQuery.insert
    const originalUpdate = mockQuery.update
    mockQuery.insert = function(data: any) {
      mockQuery._operation = 'insert'
      return mockQuery
    }
    mockQuery.update = function(data: any) {
      mockQuery._operation = 'update'
      return mockQuery
    }
    
    return mockQuery
  }

  supabase = {
    from: (table: string) => createMockQuery()
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