import Image from 'next/image'
import { FC, ReactNode } from 'react'

type Props = {
  title: string
  component: ReactNode | null
}

const Title: FC<Props> = ({ title, component = null }) => (
  <div className="flex w-full items-center border-b-2 border-themeMainColor pr-[20.5px] pb-[5.5px]">
    <div className="flex w-full items-center">
      <img
        src={'/images/libecity/president_icon.png'}
        width={41}
        height={40}
        alt={title}
      />
      <div className="ml-3 flex w-full items-center align-middle text-lg font-medium tracking-widest md:text-xl md:font-medium">
        <h2 className="whitespace-nowrap font-mono text-xl font-extrabold text-themeTitleText">
          {title}
        </h2>
      </div>
      <div className="ml-auto flex w-full justify-end">
        {component && component}
      </div>
    </div>
  </div>
)

export default Title
