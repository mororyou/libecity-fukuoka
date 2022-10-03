import { Event } from '../types/type'
import { supabase } from '../utils/supabase'

export const store = async (value: Event) => {
  const { data, error } = await supabase.from('events').insert(value)
  if (error) {
    return error
  } else {
    return data
  }
}

export const getEvents = async () => {
  const { data, error } = await supabase
    .from('events')
    .select('*', { count: 'exact' })
    .order('date', { ascending: false })

  if (error) {
    return error
  } else {
    return data
  }
}
