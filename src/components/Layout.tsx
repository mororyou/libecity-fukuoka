import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FC, ReactNode } from 'react'
import Footer from './Footer'
import Header from './Header'

type Props = {
  children: ReactNode
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <div className="flex min-h-screen min-w-full flex-col bg-themeBgColor bg-opacity-50">
      {/* <BurgerMenu /> */}
      <Header />
      <main className="flex w-full flex-1 flex-col items-center justify-start p-3 md:px-5 lg:px-8 xl:px-16">
        {children}
      </main>
      <Footer />
      <ToastContainer />
    </div>
  )
}

export default Layout
