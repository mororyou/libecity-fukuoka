import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FC, ReactNode, useState } from 'react'
import Footer from './Footer'
import Header from './Header'
import { Backdrop } from '@mui/material'
import Dial from './Dial'

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
      <Dial open={open} handleOpen={handleOpen} handleClose={handleClose} />
    </div>
  )
}

export default Layout
