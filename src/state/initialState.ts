import { format } from 'date-fns'
import { ja } from 'date-fns/locale'

export const eventInitialState = {
  id: 0,
  title: '',
  date: format(new Date(), 'yyyy-MM-dd', {
    locale: ja,
  }),
  time: '',
  location: '',
  organizer: '',
  prefectures: '',
  people: 0,
  request: 0,
  event: '',
  community: '',
  comment: '',
  status: 1,
  compflg: false,
}
