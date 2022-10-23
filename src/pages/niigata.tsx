import { NextPage } from 'next'
import Head from 'next/head'
import EventPage from '../components/Event/EventPage'

const Niigata: NextPage = () => (
  <>
    <Head>
      <title>リベシティ　新潟支部イベント管理</title>
    </Head>
    <EventPage prefectures={'15'} />
  </>
)

export default Niigata
