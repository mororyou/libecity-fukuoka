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

type Props = {
  children: ReactNode
}

const Layout: FC<Props> = ({ children }) => {
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
        className=" fixed bottom-4 right-4 sm:hidden"
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        <SpeedDialAction />
        <SpeedDialAction />
      </SpeedDial>
    </div>
  )
}

export default Layout
