import { NextPage } from 'next'
import Head from 'next/head'
import EventPage from '../components/Event/EventPage'

const Iwate: NextPage = () => (
  <>
    <Head>
      <title>リベシティ　岩手支部イベント管理</title>
    </Head>
    <EventPage prefectures={'03'} prefecturesName={'岩手支部'} />
  </>
)

export default Iwate
