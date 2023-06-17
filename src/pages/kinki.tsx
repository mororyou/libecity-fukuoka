import { NextPage } from 'next'
import Head from 'next/head'
import EventPage from '../components/Event/EventPage'

const Ibaraki: NextPage = () => (
  <>
    <Head>
      <title>リベシティ　近畿支部イベント管理</title>
    </Head>
    <EventPage prefectures={'55'} prefecturesName={'近畿支部'} />
  </>
)

export default Ibaraki
