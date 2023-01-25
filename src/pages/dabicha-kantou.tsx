import { NextPage } from 'next'
import Head from 'next/head'
import EventPage from '../components/Event/EventPage'

const DabichaKantou: NextPage = () => (
  <>
    <Head>
      <title>リベシティ　ダビチャ関東支部イベント管理</title>
    </Head>
    <EventPage prefectures={'53'} prefecturesName={'ダビチャ関東支部'} />
  </>
)

export default DabichaKantou
