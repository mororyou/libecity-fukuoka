import { NextPage } from 'next'
import Head from 'next/head'
import EventPage from '../components/Event/EventPage'

const Tochigi: NextPage = () => (
  <>
    <Head>
      <title>リベシティ　栃木支部イベント管理</title>
    </Head>
    <EventPage prefectures={'09'} prefecturesName={'栃木支部'} />
  </>
)

export default Tochigi
