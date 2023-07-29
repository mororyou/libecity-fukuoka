import { NextPage } from 'next'
import Head from 'next/head'
import EventPage from '../components/Event/EventPage'

const Osaka: NextPage = () => (
  <>
    <Head>
      <title>リベシティ　大阪支部イベント管理</title>
    </Head>
    <EventPage prefectures={'27'} prefecturesName={'大阪支部'} />
  </>
)

export default Osaka
