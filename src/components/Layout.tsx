import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FC, ReactNode, useState } from 'react'
import Footer from './Footer'
import Header from './Header'
import {
  Backdrop,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
} from '@mui/material'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import ListAltIcon from '@mui/icons-material/ListAlt'
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'
import Image from 'next/image'
import { useRouter } from 'next/router'

const actions = [
  {
    icon: <DashboardOutlinedIcon />,
    name: 'ダッシュボード',
    href: '/dashboard',
  },
  { icon: <ListAltIcon />, name: '一覧画面', href: '/events' },
  // {
  //   icon: <CalendarMonthOutlinedIcon />,
  //   name: 'カレンダー',
  //   href: '/calendar',
  // },
  // { icon: <PostAddOutlinedIcon />, name: '新規登録', href: '' },
]

type Props = {
  children: ReactNode
}

const Layout: FC<Props> = ({ children }) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div className="flex min-h-screen min-w-full flex-col bg-themeBgColor bg-opacity-50">
      <Backdrop open={open} className="z-50" />
      <Header />
      <main className="flex w-full flex-1 flex-col items-center justify-start p-3 md:px-5 lg:px-8 xl:px-16">
        {children}
      </main>
      <Footer />
      <ToastContainer />
      <SpeedDial
        ariaLabel="BottomMenu"
        className="fixed bottom-4 right-4 sm:hidden"
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
    </div>
  )
}

export default Layout
