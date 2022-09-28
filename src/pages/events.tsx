import { Box, Button, Modal, TextField } from '@mui/material'
import { FC, useState } from 'react'
import Layout from '../components/Layout'
import Title from '../components/Title'

const Events = () => {

  const [values, setValues] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    organizer: '',
    people: 0,
    event: '',
    community: '',
    comment: '',
    compflg: 0,
  })

  const handleChange =
    (props: any) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [props]: e.target.value })
    }

  // Modal
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <Layout>
      <Title
        title="イベント一覧"
        image={EventIcon}
        component={<EventAddBtn onClick={handleOpen} />}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="flex min-h-screen min-w-full items-start justify-center pt-12 md:pt-20">
          <div className="h-full w-11/12 rounded-md bg-white md:w-8/12">
            <div className="flex items-center justify-between border-b-2 border-blue-700 bg-opacity-80 py-2 px-4 md:py-3">
              <h3 className="font-mono text-lg text-blue-800">イベント追加</h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6 cursor-pointer text-blue-800"
                onClick={handleClose}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="flex flex-col gap-y-5 p-4 md:gap-y-6 md:p-8">
              <div className="w-full md:w-3/4">
                <TextField
                  label="イベントタイトル"
                  size="small"
                  fullWidth
                  value={values.title}
                  onChange={handleChange('title')}
                />
              </div>
              <div className="flex flex-wrap gap-y-4">
                <div className="w-full md:w-1/3 md:pr-4">
                  <TextField
                    label="日程"
                    size="small"
                    fullWidth
                    type="date"
                    value={values.date}
                    onChange={handleChange('date')}
                  />
                </div>
                <div className="md:w-3/8 w-1/2 pr-2 md:pr-4">
                  <TextField
                    label="時間"
                    size="small"
                    fullWidth
                    value={values.time}
                    onChange={handleChange('time')}
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-y-4">
                <div className="w-full md:w-2/3 md:pr-4">
                  <TextField
                    label="開催場所"
                    size="small"
                    fullWidth
                    value={values.location}
                    onChange={handleChange('location')}
                  />
                </div>
                <div className="w-1/2 md:w-1/3 md:pr-4">
                  <TextField
                    label="募集人数"
                    size="small"
                    fullWidth
                    type="number"
                    value={values.people}
                    onChange={handleChange('people')}
                  />
                </div>
              </div>

              <div className="w-full md:w-3/4">
                <TextField
                  label="開催者"
                  size="small"
                  fullWidth
                  value={values.organizer}
                  onChange={handleChange('organizer')}
                />
              </div>

              <div className="w-full md:w-3/4">
                <TextField
                  label="対象コミュニティ"
                  size="small"
                  fullWidth
                  value={values.community}
                  onChange={handleChange('community')}
                />
              </div>

              <div className="w-full md:w-3/4">
                <TextField
                  label="リンク"
                  size="small"
                  fullWidth
                  value={values.event}
                  onChange={handleChange('event')}
                />
              </div>

              <div className="w-full md:w-3/4">
                <TextField
                  label="メモ"
                  fullWidth
                  multiline
                  rows={2}
                  defaultValue={values.comment}
                  onChange={handleChange('comment')}
                />
              </div>
              <Button variant="outlined">登録</Button>
            </div>
          </div>
        </Box>
      </Modal>
    </Layout>
  )
}

export default Events

const EventIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="h-8 w-8"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25"
    />
  </svg>
)

type BtnProps = {
  onClick: () => void
}

const EventAddBtn: FC<BtnProps> = ({ onClick }) => {
  return (
    <Button variant="outlined" onClick={onClick} size="small">
      イベント追加
    </Button>
  )
}
