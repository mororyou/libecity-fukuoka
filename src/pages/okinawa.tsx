import { NextPage } from 'next'
import Head from 'next/head'
import EventPage from '../components/Event/EventPage'

const Niigata: NextPage = () => (
  <>
    <Head>
      <title>リベシティ　沖縄支部イベント管理</title>
    </Head>
    <EventPage prefectures={'47'} prefecturesName={'沖縄支部'} />
  </>
)

export default Niigata
