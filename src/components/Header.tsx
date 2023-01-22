import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC } from 'react'
import Styles from './Header.module.css'

const Header = () => {
  const router = useRouter()
  const asPath = router.asPath
  const backFunc = router.back
  return (
    <nav className={Styles.header}>
      <div className="mx-auto flex flex-wrap items-center justify-between">
        {asPath === '/' ? (
          <img
            src={'/images/libecity/libecity_fukuoka_logo.svg'}
            width="143.29"
            height="50"
            alt="リベシティロゴ"
          />
        ) : (
          <img
            src={'/images/libecity/libecity_logo.png'}
            width={'143'}
            height="30"
            alt="リベシティロゴ"
          />
        )}
        <div className="" id="navbar-default">
          <ul className="mt-4 flex flex-col md:mt-0 md:flex-row md:space-x-8 md:border-0 md:text-sm md:font-medium">
            <LinkComponent
              href="/movies"
              span="学長動画検索"
              asPath={asPath}
              backFunc={backFunc}
            />
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
  backFunc: () => void | null
}

const LinkComponent: FC<LinkProps> = ({ href, span, asPath, backFunc }) => {
  if (href === asPath) {
    return (
      <button
        alia-label="戻る"
        type="button"
        onClick={backFunc}
        className="rounded-md border-white bg-blue-700 py-2 px-8 text-white shadow-sm hover:bg-opacity-40"
      >
        戻る
      </button>
    )
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
