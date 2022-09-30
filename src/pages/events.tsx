import { Button } from '@mui/material'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
import Layout from '../components/Layout'
import Title from '../components/Title'
import { FC, useEffect, useState } from 'react'
import EventAddDialog from '../components/Event/EventAddDialog'
import { getEvents, store } from '../libs/event'
import EventTable from '../components/Event/EventTable'

const Events = () => {
  const [values, setValues] = useState({
    title: '',
    date: format(new Date(), 'yyyy-MM-dd', {
      locale: ja,
    }),
    time: '',
    location: '',
    organizer: '',
    people: 0,
    event: '',
    community: '',
    comment: '',
    status: 1,
    compflg: false,
  })
  // Event
  const [events, setEvents] = useState([])
  const [keyword, setKeyword] = useState('')

  // Modal
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

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

  const submitHandler = async (e: any) => {
    e.preventDefault()
    const res = await store(values)
  }

  const load = async () => {
    await setLoading(true)
    const res: any = await getEvents()
    setEvents(res)
    await setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <Layout>
      <Title
        title="イベント一覧"
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
      {events && <EventTable events={events} />}
    </Layout>
  )
}

export default Events

type BtnProps = {
  onClick: () => void
}

const EventAddBtn: FC<BtnProps> = ({ onClick }) => {
  return (
    <Button variant="contained" onClick={onClick} className="themeBtn">
      イベント追加
    </Button>
  )
}
