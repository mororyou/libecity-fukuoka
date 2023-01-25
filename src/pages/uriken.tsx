import { NextPage } from 'next'
import Head from 'next/head'
import EventPage from '../components/Event/EventPage'

const Uriken: NextPage = () => (
  <>
    <Head>
      <title>リベシティ　売り方研究室イベント管理</title>
    </Head>
    <EventPage prefectures={'51'} prefecturesName={'売り方研究室'} />
  </>
)

export default Uriken
