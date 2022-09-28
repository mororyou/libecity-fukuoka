import { FC, ReactNode } from 'react'

type Props = {
  title: string
  image: ReactNode
  component: ReactNode | null
}
const Title: FC<Props> = ({ title, image, component }) => (
  <div className="border-title mb-2 w-full md:mb-4">
    <div className="mb-1 flex w-full items-center md:mb-3">
      {image}
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
