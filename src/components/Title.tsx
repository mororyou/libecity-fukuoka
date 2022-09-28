import { FC, ReactNode } from "react"

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
        <h1 className="whitespace-nowrap text-gray-700 font-mono text-bold">{title}</h1>
      </div>
      <div className="w-48 ml-auto">
        {component && component}
      </div>
    </div>
  </div>
)

export default Title