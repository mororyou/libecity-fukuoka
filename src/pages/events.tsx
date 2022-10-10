import { Button } from '@mui/material'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
import Layout from '../components/Layout'
import Title from '../components/Title'
import { FC, useEffect, useState } from 'react'
import EventAddDialog from '../components/Event/EventAddDialog'
import { getEvents, store, update } from '../libs/event'
import EventTable from '../components/Event/EventTable'
import { toast } from 'react-toastify'
import { eventInitialState } from '../state/initialState'
import MainTitle from '../components/MainTitle'

const Events = () => {
  const [values, setValues] = useState(eventInitialState)
  // Event
  const [events, setEvents] = useState([])
  const [keyword, setKeyword] = useState('')

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
      organizer: row.organizer,
      people: 0,
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
      const res = await store(values)
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
        await load()
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
        await load()
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

  const load = async () => {
    await setLoading(true)
    const res: any = await getEvents()
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
    load()
  }, [])

  return (
    <Layout>
      <MainTitle span='オフ会一覧' />
      <Title
        title="オフ会一覧情報"
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
      <div className="flex w-full flex-col items-start">
        {events && (
          <EventTable
            events={events}
            loading={loading}
            editBtnClickHandler={editBtnClickHandler}
          />
        )}
      </div>
    </Layout>
  )
}

export default Events

type BtnProps = {
  onClick: () => void
}

const EventAddBtn: FC<BtnProps> = ({ onClick }) => {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      size="small"
      className="bg-themeBtnColor text-white h-8 rounded"
    >
      オフ会を新規登録
    </Button>
  )
}
