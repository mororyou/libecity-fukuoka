import { NextPage } from 'next'
import EventPage from '../components/Event/EventPage'

const Home: NextPage = () => <EventPage prefectures={'40'} prefecturesName={'福岡支部'} />

export default Home
