import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Check if environment variables are properly set
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Please check your .env file.')
}

// Create a mock client as fallback
const mockClient = {
  from: () => ({
    select: () => ({
      range: () => Promise.resolve({ data: [], count: 0 }),
      or: () => ({
        range: () => Promise.resolve({ data: [], count: 0 })
      }),
      in: () => ({
        range: () => Promise.resolve({ data: [], count: 0 })
      }),
      order: () => ({
        range: () => Promise.resolve({ data: [], count: 0 })
      })
    })
  }),
  auth: {
    onAuthStateChange: () => ({ data: null, error: null }),
    getSession: () => Promise.resolve({ data: { session: null }, error: null })
  }
}

// Initialize Supabase client
let supabaseClient

try {
  supabaseClient = createClient(
    supabaseUrl || 'https://placeholder-project.supabase.co', 
    supabaseAnonKey || 'placeholder-key'
  )
} catch (error) {
  console.error('Failed to initialize Supabase client:', error)
  supabaseClient = mockClient
}

export const supabase = supabaseClient
