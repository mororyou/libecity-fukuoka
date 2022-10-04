export type Event = {
  title: string
  date: string
  time: string
  location: string
  organizer: string
  people: number
  request: number
  event: string
  community: string
  comment: string
  status: number
  compflg: boolean
}

export type Spread = {
  name: string
  url: string
  date: string
  month: string
  from_time: string
  to_time: string
  mode: string
  timestamp: string
}

export type TimeTable = {
  date: string
  time: string
  name: string
  url: string
  created_at: string
}

export type ErrorTable = {
  name: string
  date: string
  url: string
  content: string
  month: string
  complete_flg: boolean
  created_at: string
}
