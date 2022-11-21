import { NextPage } from 'next'
import Head from 'next/head'
import EventPage from '../components/Event/EventPage'

const Urikata: NextPage = () => (
  <>
    <Head>
      <title>リベシティ　茨城支部イベント管理</title>
    </Head>
    <EventPage prefectures={'08'} prefecturesName={'茨城支部'} />
  </>
)

export default Urikata
