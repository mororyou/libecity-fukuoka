import { NextPage } from 'next'
import Head from 'next/head'
import EventPage from '../components/Event/EventPage'

const HyogoMechanan: NextPage = () => (
  <>
    <Head>
      <title>リベシティ　兵庫めっちゃ南東部イベント管理</title>
    </Head>
    <EventPage prefectures={'52'} prefecturesName={'兵庫めっちゃ南東部'} />
  </>
)

export default HyogoMechanan
