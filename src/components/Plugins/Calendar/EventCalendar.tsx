import FullCalendar, { EventContentArg } from '@fullcalendar/react'
import allLocales from '@fullcalendar/core/locales-all'
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction'
import dayGridPlugin from '@fullcalendar/daygrid'
import '@fullcalendar/common/main.css'
import '@fullcalendar/daygrid/main.css'
import { FC, useCallback, useState } from 'react'
import format from 'date-fns/format'
import ja from 'date-fns/locale/ja'
import { toast } from 'react-toastify'
import { getCalendarEvents, getDayEvents } from '../../../libs/event'
import { groupBy } from '../../../libs/utils'

type Props = {
  status: string
  prefectures: string
}

const EventCalendar: FC<Props> = ({ status, prefectures }) => {
  const [day, setDay] = useState({
    date: '',
    count: 0,
    events: {},
  })

  const handleDateClick = async (arg: DateClickArg) => {
    getDayEventHandler(arg.dateStr)
  }

  const handleLabelClick = async (date: string) => {
    getDayEventHandler(date)
  }

  const getDayEventHandler = async (date: string) => {
    try {
      const res = await getDayEvents(date, status, prefectures)
      const d = new Date(date)
      const formatDate = format(d, 'yyyy年M月d日(E)', { locale: ja })
      await setDay({
        date: formatDate,
        count: Object.keys(res.data).length,
        events: res.data,
      })
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

  const getCalendarData = async (
    arg: any,
    status: string,
    successCallback: any,
    failureCallback: any
  ) => {
    try {
      const startDate = await format(arg.start, 'yyyy-MM-dd')
      const endDate = await format(arg.end, 'yyyy-MM-dd')
      const res = await getCalendarEvents(
        startDate,
        endDate,
        status,
        prefectures
      )
      const result = (await res.data) as Array<[]>
      const calendar = await groupBy(result, 'date')
      successCallback(
        Object.keys(calendar).map((date) => {
          return {
            date: date,
            count: calendar[date].length,
          }
        })
      )
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
      <div className="md:gap my-8 grid w-full grid-cols-1 gap-y-8 gap-x-4 px-2 md:grid-cols-12 md:px-0">
        <div className="col-span-12 md:col-span-7">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            dateClick={handleDateClick}
            locales={allLocales}
            locale="ja"
            height={'auto'}
            events={(fetchInfo, successsCallback, failureCallback) => {
              getCalendarData(
                fetchInfo,
                status,
                successsCallback,
                failureCallback
              )
            }}
            eventContent={(arg) => renderEventContent(arg, handleLabelClick)}
            headerToolbar={{
              start: 'title',
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
              {day.date} {status === '80' ? '終了' : '開催予定'}イベント （
              {day.count}件）
            </p>
          </h3>
          <ul className="flex w-full flex-col">
            {day.count > 0 ? (
              <>
                {Object.values(day.events).map((value: any) => {
                  console.log(value)
                  return (
                    <li
                      className="flex w-full flex-wrap gap-y-2 border-b border-themeMainColor border-opacity-40 py-4 md:gap-y-2"
                      key={value.id}
                    >
                      <p className="w-full font-mono font-black text-themeMainColor">
                        {value.title ? value.title : '未設定'}
                      </p>
                      <p className="w-full text-sm text-gray-600 md:w-7/12">
                        <span className="font-semibold">時間帯：</span>
                        {value.time ? value.time : '未設定'}
                      </p>
                      <p className="w-full text-sm text-gray-600 md:w-7/12">
                        <span className="font-semibold">コミュニティ：</span>
                        {value.community ? value.community : '未設定'}
                      </p>
                      <p className="w-full text-sm text-gray-600 md:w-5/12">
                        <span className="font-semibold">主催者：</span>
                        {value.organizer ? value.organizer : '未設定'}
                      </p>
                      <p className="w-full text-sm text-gray-600 md:w-7/12">
                        <span className="font-semibold">イベント：</span>
                        {value.status == 1 ? (
                          <>
                            {value.event ? (
                              <a
                                className="rounded-md bg-themeMainColor py-[0.3rem] px-4 text-xs text-white hover:bg-opacity-60"
                                href={`${value.event}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                参加申し込みはこちら
                              </a>
                            ) : (
                              '未設定'
                            )}
                          </>
                        ) : (
                          <span className="rounded-md bg-themeBtnColor px-2 py-1 text-white">
                            申し込みすることができません
                          </span>
                        )}
                      </p>
                      <p className="w-full text-sm text-gray-600 md:w-5/12">
                        <span className="font-semibold">開催場所：</span>
                        {value.location}
                      </p>
                      <p className="flex flex-col text-sm text-gray-600">
                        <span className="mb-1 font-semibold">備考</span>
                        <span className="text-smwhitespace-pre-line whitespace-pre-line pl-1">
                          {value.comment}
                        </span>
                      </p>
                    </li>
                  )
                })}
              </>
            ) : (
              <p className="mt-4 font-mono font-bold text-themeTitleText">
                登録されている日付を選択(クリック)してください
              </p>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default EventCalendar

const renderEventContent = (arg: EventContentArg, handleLabelClick: any) => {
  return (
    <div
      className="w-full bg-themeMainColor"
      onClick={() => handleLabelClick(arg.event.startStr)}
    >
      <p className="cursor-pointer rounded py-1 text-center text-xs font-semibold text-white">
        {arg.event.extendedProps.count}件
      </p>
    </div>
  )
}
