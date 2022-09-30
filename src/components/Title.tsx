import Image from 'next/image'
import { FC, ReactNode } from 'react'

type Props = {
  title: string
  component: ReactNode | null
}
const Title: FC<Props> = ({ title, component = null }) => (
  <div className="border-title mb-2 w-full md:mb-4">
    <div className="mb-1 flex w-full items-end md:mb-3">
      <Image
        src={'/images/libecity/president_icon.png'}
        width={49.9}
        height={48}
        alt={title}
        className="rotate-12"
      />
      <div className="ml-3 flex w-full items-center align-middle text-lg font-medium tracking-widest md:text-xl md:font-medium">
        <h1 className="text-bold whitespace-nowrap font-mono text-gray-700">
          {title}
        </h1>
      </div>
      <div className="ml-auto w-48">{component && component}</div>
    </div>
  </div>
)

export default Title
