import { NextPage } from 'next'
import Head from 'next/head'
import EventPage from '../components/Event/EventPage'

const Tokyo: NextPage = () => (
  <>
    <Head>
      <title>リベシティ　東京支部イベント管理</title>
    </Head>
    <EventPage prefectures={'13'} prefecturesName={'東京支部'} />
  </>
)

export default Tokyo
