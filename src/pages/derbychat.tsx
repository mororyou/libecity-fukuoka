import { NextPage } from 'next'
import Head from 'next/head'
import EventPage from '../components/Event/EventPage'

const Derbychat: NextPage = () => (
  <>
    <Head>
      <title>リベシティ　学長ダービーチャイベント管理</title>
    </Head>
    <EventPage prefectures={'53'} prefecturesName={'学長ダービーチャット'} />
  </>
)

export default Derbychat
