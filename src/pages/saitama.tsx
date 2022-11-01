import { NextPage } from 'next'
import Head from 'next/head'
import EventPage from '../components/Event/EventPage'

const Saitama: NextPage = () => (
  <>
    <Head>
      <title>リベシティ　埼玉支部イベント管理</title>
    </Head>
    <EventPage prefectures={'11'} prefecturesName={'埼玉支部'} />
  </>
)

export default Saitama
