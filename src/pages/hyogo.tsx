import { NextPage } from 'next'
import Head from 'next/head'
import EventPage from '../components/Event/EventPage'

const Niigata: NextPage = () => (
  <>
    <Head>
      <title>リベシティ　兵庫支部イベント管理</title>
    </Head>
    <EventPage prefectures={'28'} prefecturesName={'兵庫支部'} />
  </>
)

export default Niigata
