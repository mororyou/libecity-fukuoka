import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
import { Event } from '../types/type'
import { supabase } from '../utils/supabase'

const eventtable = process.env.NODE_ENV === 'development' ? 'test' : 'events'

// 登録
export const store = async (value: Event, prefectures: string) => {
  const { data, error } = await supabase.from(eventtable).insert([
    {
      title: value.title,
      date: value.date,
      time: value.time,
      location: value.location,
      organizer: value.organizer,
      people: value.people,
      prefectures: prefectures,
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
    .from(eventtable)
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
export const getEvents = async (status: string = '1', prefectures: string) => {
  // 日付によって表示制限させる場合
  // const date = format(new Date(), 'yyyy-MM-dd', {
  //   locale: ja,
  // })
  // let query = supabase
  //   .from(eventtable)
  //   .select(
  //     'id, title, date, time, location, organizer, people, community, event, status, comment',
  //     { count: 'exact' }
  //   )
  // if (status === '1' || status === '2') {
  //   query = query.gte('date', date)
  // }
  // query = query
  //   .eq('delflg', false)
  //   .eq('status', status)
  //   .order('date', { ascending: true })
  // const { data, error } = await query

  const { data, error } = await supabase
    .from(eventtable)
    .select(
      'id, title, date, time, location, organizer, people, community, event, status, comment',
      { count: 'exact' }
    )
    .eq('prefectures', prefectures)
    .eq('delflg', false)
    .eq('status', status)
    .order('date', { ascending: true })

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

// 取得（日指定）
export const getDayEvents = async (
  date: string,
  status: string = '1',
  prefectures: string
) => {
  const { data, error } = await supabase
    .from(eventtable)
    .select(
      'id, title, date, time, location, organizer, people, community, event, status, comment',
      { count: 'exact' }
    )
    .eq('prefectures', prefectures)
    .eq('date', date)
    .eq('delflg', false)
    .eq('status', status)
    .order('time', { ascending: true })

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

export const getCalendarEvents = async (
  startDate: string,
  endDate: string,
  status: string = '1',
  prefectures: string
) => {
  const { data, error } = await supabase
    .from(eventtable)
    .select('date')
    .gte('date', startDate)
    .lte('date', endDate)
    .eq('prefectures', prefectures)
    .eq('status', status)
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
