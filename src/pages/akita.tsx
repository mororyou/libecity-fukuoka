import { NextPage } from 'next'
import Head from 'next/head'
import EventPage from '../components/Event/EventPage'

const Ibaraki: NextPage = () => (
  <>
    <Head>
      <title>リベシティ　秋田支部イベント管理</title>
    </Head>
    <EventPage prefectures={'05'} prefecturesName={'秋田支部'} />
  </>
)

export default Ibaraki
