import Layout from '../components/Layout'
import MainTitle from '../components/MainTitle'
import EventCalendar from '../components/Plugins/Calendar/EventCalendar'
import Title from '../components/Title'

const CalendarPage = () => {
  return (
    <Layout>
      <MainTitle span="オフ会カレンダー" />
      <Title title="カレンダー" component="" />
      <EventCalendar />
    </Layout>
  )
}

export default CalendarPage
