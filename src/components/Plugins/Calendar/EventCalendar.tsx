import FullCalendar, { EventContentArg } from '@fullcalendar/react'
import allLocales from '@fullcalendar/core/locales-all'
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction'
import dayGridPlugin from '@fullcalendar/daygrid'
import '@fullcalendar/common/main.css'
import '@fullcalendar/daygrid/main.css'
import { useCallback, useState } from 'react'
import format from 'date-fns/format'
import ja from 'date-fns/locale/ja'
import { toast } from 'react-toastify'
import { Event } from '../../../types/type'
import { getDayEvents } from '../../../libs/event'

const EventCalendar = () => {
  const [day, setDay] = useState({
    date: '',
    count: 0,
    events: {},
  })

  const handleDateClick = useCallback(async (arg: DateClickArg) => {
    try {
      const res = await getDayEvents(arg.dateStr)
      if (Object.keys(res.data).length > 0) {
        await setDay({ ...day, events: res.data as Array<Event> })
      }
      const d = new Date(arg.dateStr)
      const formatDate = format(d, 'yyyy年M月d日(E)', { locale: ja })
      await setDay({ ...day, date: formatDate })
      await setDay({ ...day, count: Object.keys(res.data).length })
    } catch (error) {
      toast.error('イベント情報取得時にエラーが発生しました。', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }, [])

  const getCalendarData = async (
    fetchInfo: object,
    successCallback: () => void
  ) => {
    try {
      const res = await fetch('', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      })
      const calendar = await res.json()
    } catch (error) {
      toast.error('イベント情報取得時にエラーが発生しました。', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }

  return (
    <div className="relative w-full">
      <p className="absolute top-1/2 right-1/2 w-64 rounded bg-themeMainColor bg-opacity-30 py-2 text-center text-xl text-white">
        作成中
      </p>
      <div className="md:gap my-8 grid w-full grid-cols-1 gap-y-8 gap-x-4 px-2 md:grid-cols-12 md:px-0">
        <div className="col-span-12 md:col-span-7">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            dateClick={handleDateClick}
            locales={allLocales}
            locale="ja"
            events={[
              { title: 'event 1', start: '2022-10-01', count: 1 },
              { title: 'event 2', start: '2022-10-02', count: 3 },
            ]}
            eventContent={(arg) => renderEventContent(arg, handleDateClick)}
            headerToolbar={{
              start: 'title', // leftと書いてもよい
              center: '',
              end: 'today prev,next',
            }}
          />
        </div>
        <div className="col-span-12 md:col-span-5 md:pl-4">
          <h3 className="flex items-end justify-start border-b-2 border-b-themeMainColor border-opacity-70 pb-1">
            <img
              src={'/images/libecity/mini_president_icon.webp'}
              width={64}
              height={59.08}
              alt={`${day.date}開催予定イベント`}
            />
            <p className="text-xl font-semibold text-gray-700">
              {day.date} 開催予定イベント （{day.count}件）
            </p>
          </h3>
        </div>
      </div>
    </div>
  )
}

export default EventCalendar

const renderEventContent = (arg: EventContentArg, handleDateClick: any) => {
  return (
    <div
      className="w-full bg-themeMainColor"
      onClick={() => handleDateClick(arg.event.startStr)}
    >
      <p className="cursor-pointer rounded py-1 text-center text-xs font-semibold text-white">
        イベント
        <br />
        {arg.event.extendedProps.count}件
      </p>
    </div>
  )
}
