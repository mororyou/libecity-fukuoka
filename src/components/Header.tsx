import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC } from 'react'
import Styles from './Header.module.css'

const Header = () => {
  const router = useRouter()
  const asPath = router.asPath
  return (
    <nav className={Styles.header}>
      <div className="mx-auto flex flex-wrap items-center justify-between">
        <Link href={'/dashboard'}>
          <a className="flex items-center">
            <Image
              src={'/images/libecity/libecity_logo.svg'}
              width="143.29"
              height="50"
              alt="リベシティロゴ"
            />
          </a>
        </Link>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="ml-3 inline-flex items-center rounded-lg p-2 text-sm text-white focus:outline-none md:hidden"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="h-6 w-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="mt-4 flex flex-col md:mt-0 md:flex-row md:space-x-8 md:border-0 md:text-sm md:font-medium">
            <LinkComponent href='/dashboard' span='ダッシュボード' asPath={asPath} />
            <LinkComponent href='/events' span='オフ会一覧' asPath={asPath} />
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Header

type LinkProps = {
  href: string
  span: string
  asPath: string
}

const LinkComponent: FC<LinkProps> = ({ href, span, asPath }) => {
  if (href === asPath) {
    return <li className={Styles.navilink_active}>{span}</li>
  } else {
    return (
      <Link href={href}>
        <li className={Styles.navilink}>
          <a>{span}</a>
        </li>
      </Link>
    )
  }
}
