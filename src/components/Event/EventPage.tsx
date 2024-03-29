import { Button, Select, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
import Layout from '../Layout'
import Title from '../Title'
import { FC, useEffect, useState } from 'react'
import EventAddDialog from './EventAddDialog'
import { getEvents, store, update } from '../../libs/event'
import EventTable from './EventTable'
import { toast } from 'react-toastify'
import { eventInitialState } from '../../state/initialState'
import MainTitle from '../MainTitle'
import EventCalendar from '../Plugins/Calendar/EventCalendar'

type Props = {
  prefectures: string
  prefecturesName: string
}

const EventPage: FC<Props> = ({ prefectures, prefecturesName }) => {
  const [values, setValues] = useState(eventInitialState)
  // Event
  const [events, setEvents] = useState([])
  const [mode, setMode] = useState('list')
  const [status, setStatus] = useState('1')

  // Modal
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setValues(eventInitialState)
    setOpen(false)
  }

  // Loading
  const [loading, setLoading] = useState(false)

  const handleChange =
    (props: any) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [props]: e.target.value })
    }

  const handleClickChange =
    (props: any) => (e: React.MouseEvent<HTMLElement>, value: string) => {
      setValues({ ...values, [props]: value })
    }

  const editBtnClickHandler = async (row: any) => {
    const value = {
      id: row.id,
      title: row.title,
      date: format(new Date(row.date), 'yyyy-MM-dd', {
        locale: ja,
      }),
      time: row.time,
      location: row.location,
      prefectures: prefectures,
      organizer: row.organizer,
      people: row.people,
      request: 0,
      event: row.event,
      community: row.community,
      comment: row.comment,
      status: row.status,
      compflg: false,
    }
    setValues(value)
    await handleOpen()
  }

  const submitHandler = async (e: any) => {
    e.preventDefault()
    if (values.id === 0) {
      // 新規登録
      const res = await store(values, prefectures)
      if (!res.error) {
        toast.success('イベントの登録が完了しました', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        await handleClose()
        await load(status)
      } else {
        toast.error(
          'イベント登録時にエラーが発生しました。入力内容を確認してください',
          {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        )
      }
    } else {
      // 更新
      const res = await update(values)
      if (!res.error) {
        toast.success('イベントの更新が完了しました', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        await handleClose()
        await load(status)
      } else {
        toast.error(
          'イベント更新時にエラーが発生しました。入力内容を確認してください',
          {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        )
      }
    }
  }

  const load = async (status: string) => {
    await setLoading(true)
    const res: any = await getEvents(status, prefectures)
    if (!res.error) {
      await setEvents(res.data)
      await setLoading(false)
    } else {
      toast.error('データの取得に失敗しました', {
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

  useEffect(() => {
    load(status)
  }, [status])

  return (
    <Layout>
      <MainTitle span={`${prefecturesName} オフ会一覧`} />
      <Title
        title={`オフ会一覧情報`}
        component={<EventAddBtn onClick={handleOpen} />}
      />
      <EventAddDialog
        values={values}
        open={open}
        handleClose={handleClose}
        handleChange={handleChange}
        handleClickChange={handleClickChange}
        submitHandler={submitHandler}
      />
      <div className="my-4 flex w-full flex-wrap items-center justify-between gap-y-3 md:justify-between">
        <ToggleButtonGroup
          size="small"
          className="w-full md:w-1/2 lg:w-1/3"
          exclusive
          value={status}
          onChange={(e: React.MouseEvent<HTMLElement>, value: string) => {
            setStatus(value)
          }}
        >
          <ToggleButton
            className="w-1/4 text-sm"
            value={'1'}
            disabled={status === '1' ? true : false}
          >
            募集中
          </ToggleButton>
          <ToggleButton
            className="w-1/4 text-sm"
            value={'2'}
            disabled={status === '2' ? true : false}
          >
            キャンセル待ち
          </ToggleButton>
          <ToggleButton
            className="w-1/4 text-sm"
            value={'80'}
            disabled={status === '80' ? true : false}
          >
            終了
          </ToggleButton>
          <ToggleButton
            className="w-1/4 text-sm"
            value={'99'}
            disabled={status === '99' ? true : false}
          >
            中止・削除
          </ToggleButton>
        </ToggleButtonGroup>

        <ToggleButtonGroup
          size="small"
          exclusive
          value={status}
          onChange={(e: React.MouseEvent<HTMLElement>, value: string) => {
            setMode(value)
          }}
        >
          <ToggleButton
            value={'list'}
            className="w-auto text-xs"
            disabled={mode === 'list' ? true : false}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
            <span className="ml-1 text-xs">一覧</span>
          </ToggleButton>
          <ToggleButton
            value={'calendar'}
            className="w-auto text-xs"
            disabled={mode === 'calendar' ? true : false}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
              />
            </svg>
            <span className="ml-1 text-xs">カレンダー</span>
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      <div className="flex w-full flex-col items-start">
        {mode === 'list' ? (
          <EventTable
            events={events}
            loading={loading}
            editBtnClickHandler={editBtnClickHandler}
          />
        ) : (
          <EventCalendar status={status} prefectures={prefectures} />
        )}
      </div>
    </Layout>
  )
}

export default EventPage

type BtnProps = {
  onClick: () => void
}

const EventAddBtn: FC<BtnProps> = ({ onClick }) => {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      size="small"
      className="h-8 rounded bg-themeBtnColor text-white"
    >
      オフ会を新規登録
    </Button>
  )
}
