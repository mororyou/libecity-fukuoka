import { NextPage } from 'next'
import Head from 'next/head'
import EventPage from '../components/Event/EventPage'

const Uriken: NextPage = () => (
  <>
    <Head>
      <title>リベシティ　神戸支部イベント管理</title>
    </Head>
    <EventPage prefectures={'54'} prefecturesName={'神戸支部'} />
  </>
)

export default Uriken
