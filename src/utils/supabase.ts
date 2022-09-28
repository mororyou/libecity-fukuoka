import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY

if (!SUPABASE_URL) {
  throw new Error('Missing SUPABASE_URL')
}

if (!SUPABASE_KEY) {
  throw new Error('Missing SUPABASE_KEY')
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
}
