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
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="mt-4 flex flex-col md:mt-0 md:flex-row md:space-x-8 md:border-0 md:text-sm md:font-medium">
            <LinkComponent
              href="/dashboard"
              span="ダッシュボード"
              asPath={asPath}
            />
            <LinkComponent href="/events" span="オフ会一覧" asPath={asPath} />
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
    return <li className="navilink_active">{span}</li>
  } else {
    return (
      <Link href={href}>
        <li className="navilink bgleft">
          <span>{span}</span>
        </li>
      </Link>
    )
  }
}
