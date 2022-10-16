import {
  Button,
  Dialog,
  DialogContent,
  TextField,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Grow,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { FC, forwardRef } from 'react'
import { TransitionProps } from '@mui/material/transitions'
import { Event } from '../../types/type'

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement
  },
  ref: React.Ref<unknown>
) {
  return <Grow style={{ transformOrigin: '0 0 0' }} ref={ref} {...props} />
})

type Props = {
  values: Event
  open: boolean
  handleClose: any
  handleChange: any
  handleClickChange: any
  submitHandler: (event: React.FormEvent<HTMLFormElement>) => void
}

const EventAddDialog: FC<Props> = ({
  values,
  open,
  handleClose,
  handleChange,
  handleClickChange,
  submitHandler,
}) => {
  const theme = useTheme()

  const fullScreen = useMediaQuery(theme.breakpoints.down('lg'))

  return (
    <Dialog
      fullWidth={true}
      fullScreen={fullScreen}
      open={open}
      maxWidth={'lg'}
      onClose={handleClose}
      TransitionComponent={Transition}
      scroll={'body'}
    >
      <form onSubmit={submitHandler}>
        <AppBar className="relative bg-themeMainColor">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              イベント登録
            </Typography>
          </Toolbar>
        </AppBar>

        <DialogContent id="alert-dialog-slide-description" className="p-4">
          <div className="col-span-12 h-full w-11/12 rounded-md bg-white md:col-span-8">
            <div className="flex flex-col gap-y-5 p-4 md:gap-y-6 md:p-8">
              <div className="w-full md:w-3/4">
                <TextField
                  label="イベントタイトル"
                  size="small"
                  fullWidth
                  value={values.title}
                  onChange={handleChange('title')}
                  required={true}
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
                    required={true}
                    className="text-left"
                  />
                </div>
                <div className="md:w-3/8 w-2/3 pr-2 md:pr-4">
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
                    required={true}
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
                  label="主催者"
                  size="small"
                  fullWidth
                  value={values.organizer}
                  onChange={handleChange('organizer')}
                  required={true}
                />
              </div>

              <div className="w-full md:w-3/4">
                <TextField
                  label="対象コミュニティ"
                  size="small"
                  fullWidth
                  value={values.community}
                  onChange={handleChange('community')}
                  required={true}
                />
              </div>

              <div className="w-full md:w-3/4">
                <TextField
                  label="リンク"
                  size="small"
                  fullWidth
                  value={values.event}
                  onChange={handleChange('event')}
                  required={true}
                />
              </div>

              <div className="w-full">
                <ToggleButtonGroup
                  className="w-full text-themeMainColor md:w-2/3"
                  size="small"
                  exclusive
                  value={values.status}
                  onChange={handleClickChange('status')}
                  aria-label="Platform"
                >
                  <ToggleButton className="w-[25%]" value={1}>
                    募集中
                  </ToggleButton>
                  <ToggleButton className="w-[25%]" value={2}>
                    募集終了
                  </ToggleButton>
                  <ToggleButton className="w-[25%]" value={80}>
                    終了
                  </ToggleButton>
                </ToggleButtonGroup>
              </div>

              <div className="w-full md:w-3/4">
                <TextField
                  label="メモ"
                  fullWidth
                  multiline
                  rows={2}
                  value={values.comment}
                  onChange={handleChange('comment')}
                />
              </div>
            </div>
          </div>
          <div className=" col-span-full px-4 md:flex md:items-end md:justify-end md:py-8">
            <Button variant="contained" type="submit" className="themeBtn">
              {values.id === 0 ? '登 録' : '更 新'}
            </Button>
          </div>
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default EventAddDialog