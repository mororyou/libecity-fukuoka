import { NextPage } from 'next'
import Head from 'next/head'
import EventPage from '../components/Event/EventPage'

const Iwate: NextPage = () => (
  <>
    <Head>
      <title>リベシティ　宮城支部イベント管理</title>
    </Head>
    <EventPage prefectures={'04'} prefecturesName={'宮城支部'} />
  </>
)

export default Iwate
