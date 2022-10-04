import { FC } from "react"
import { Event } from "../../types/type"

type Props = {
  events: Event[]
}

const EventCalendar: FC<Props> = () => {
  return (
    <>Calendar</>
  )
}

export default EventCalendar