import Image from 'next/image'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import ListAltIcon from '@mui/icons-material/ListAlt'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'
import { SpeedDial, SpeedDialAction } from '@mui/material'
import { FC } from 'react'
import { useRouter } from 'next/router'

const actions = [
  {
    icon: <DashboardOutlinedIcon />,
    name: 'ダッシュボード',
    href: '/dashboard',
  },
  { icon: <ListAltIcon />, name: '一覧画面', href: '/events' },
  {
    icon: <CalendarMonthOutlinedIcon />,
    name: 'カレンダー',
    href: '/calendar',
  },
  // { icon: <PostAddOutlinedIcon />, name: '新規登録', href: '' },
]
type Props = {
  open: boolean
  handleOpen: () => void
  handleClose: () => void
}

const Dial: FC<Props> = ({ open, handleOpen, handleClose }) => {
  const router = useRouter()
  return (
    <SpeedDial
      ariaLabel="BottomMenu"
      className="fixed top-6 right-4 sm:hidden"
      icon={
        <Image
          src={'/images/libecity/president_icon.webp'}
          width={41}
          height={40}
          alt="両学長"
        />
      }
      onClose={handleClose}
      onOpen={handleOpen}
      open={open}
      direction="down"
    >
      {actions.map((action) => (
        <SpeedDialAction
          icon={action.icon}
          tooltipTitle={action.name}
          key={action.name}
          tooltipOpen
          onClick={() => router.push(action.href)}
        />
      ))}
    </SpeedDial>
  )
}
export default Dial
