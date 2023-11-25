import { NextPage } from 'next'
import Head from 'next/head'
import EventPage from '../components/Event/EventPage'

const Nagoya: NextPage = () => (
  <>
    <Head>
      <title>リベシティ　東海支部イベント管理</title>
    </Head>
    <EventPage prefectures={'56'} prefecturesName={'東海支部'} />
  </>
)

export default Nagoya
