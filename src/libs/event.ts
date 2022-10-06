import { Event } from '../types/type'
import { supabase } from '../utils/supabase'

// 登録
export const store = async (value: Event) => {
  const { data, error } = await supabase.from('events').insert([
    {
      title: value.title,
      date: value.date,
      time: value.time,
      location: value.location,
      organizer: value.organizer,
      people: value.people,
      request: 0,
      event: value.event,
      community: value.community,
      comment: value.comment,
      status: value.status,
      compflg: false,
    },
  ])
  if (error) {
    return {
      data: error,
      error: true,
    }
  } else {
    return {
      data: data,
      error: false,
    }
  }
}

// 更新
export const update = async (value: Event) => {
  const { data, error } = await supabase
    .from('events')
    .update({
      title: value.title,
      date: value.date,
      time: value.time,
      location: value.location,
      organizer: value.organizer,
      people: value.people,
      request: 0,
      event: value.event,
      community: value.community,
      comment: value.comment,
      status: value.status,
      compflg: false,
    })
    .eq('id', value.id)
  if (error) {
    return {
      data: error,
      error: true,
    }
  } else {
    return {
      data: data,
      error: false,
    }
  }
}

// 一覧取得
export const getEvents = async () => {
  const { data, error } = await supabase
    .from('events')
    .select(
      'id, title, date, time, location, organizer, people, community, event, status, comment',
      { count: 'exact' }
    )
    .eq('delflg', false)
    .order('date', { ascending: false })

  if (error) {
    return {
      data: error,
      error: true,
    }
  } else {
    return {
      data: data,
      error: false,
    }
  }
}
