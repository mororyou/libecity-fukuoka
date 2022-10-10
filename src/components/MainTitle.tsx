import { FC } from "react"

type Props = {
  span: string
}

const MainTitle:FC<Props> = ({ span }) => <h1 className="flex justify-center text-themeMainColor text-2xl md:text-4xl font-black my-6 md:my-10">{span}</h1>

export default MainTitle