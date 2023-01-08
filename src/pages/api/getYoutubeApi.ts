// Youtube Data API
import fetch from 'node-fetch'
import { supabase } from '../../utils/supabase'

const publishDatas = [
  // // 2023
  // { after: '2023-07-01T00:00:00Z', before: '2023-12-31T00:00:00Z' },
  { after: '2023-01-01T00:00:00Z', before: '2023-06-30T00:00:00Z' },
  // 2022
  { after: '2022-07-01T00:00:00Z', before: '2022-12-31T00:00:00Z' },
  { after: '2022-01-01T00:00:00Z', before: '2022-06-30T00:00:00Z' },
  // 2021
  { after: '2021-07-01T00:00:00Z', before: '2021-12-31T00:00:00Z' },
  { after: '2021-01-01T00:00:00Z', before: '2021-06-30T00:00:00Z' },
  // 2020
  { after: '2020-07-01T00:00:00Z', before: '2020-12-31T00:00:00Z' },
  { after: '2020-01-01T00:00:00Z', before: '2020-06-30T00:00:00Z' },
  // 2019
  { after: '2019-07-01T00:00:00Z', before: '2019-12-31T00:00:00Z' },
  { after: '2019-01-01T00:00:00Z', before: '2019-06-30T00:00:00Z' },
  // 2018
  { after: '2018-07-01T00:00:00Z', before: '2018-12-31T00:00:00Z' },
  { after: '2018-01-01T00:00:00Z', before: '2018-06-30T00:00:00Z' },
]

export default async function getAllMovies() {
  const result = []
  for (let i = 0; i < publishDatas.length; i++) {
    const publishs = publishDatas[i]
    let movies: any = await getYoutubeMovies(publishs)
    let items = movies.items
    let pageToken = movies.nextPageToken
    const pageInfo = movies.pageInfo
    const totalResults = pageInfo.totalResults
    const resultsPerPage = pageInfo.resultsPerPage
    const pageCnt = Math.ceil(totalResults / resultsPerPage)
    for (let j = 0; j < pageCnt; j++) {
      for (const key in items) {
        if (Object.prototype.hasOwnProperty.call(items, key)) {
          const el = items[key]
          result.push({
            channelId: el.snippet.channelId,
            videoId: el.id.videoId,
            title: el.snippet.title,
            snippet: el.snippet,
            publishedAt: el.snippet.publishedAt,
          })
        }
      }
      if (pageToken == undefined) {
        break
      }
      movies = await getYoutubeMovies(publishs, pageToken)
      items = movies.items
      pageToken = movies.nextPageToken
    }
  }
  // supabase insert
  const { data, error } = await supabase.from('movies').insert(result)
  if (error) {
    console.log(error)
  } else {
    console.log('success')
  }
  console.log('get all movies end')
}

export async function getYoutubeMovies(published: any, pageToken = null) {
  // URL
  const baseUrl = 'https://www.googleapis.com/youtube/v3/search'
  // パラメータ
  const part = 'id,snippet'
  const channelId = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID
  const maxResults = 50
  const order = 'date'
  const type = 'video'
  const KEY = process.env.NEXT_PUBLIC_YOUTUBE_API
  const publishedAfter = published.after
  const publishedBefore = published.before
  // queryURI
  const query = `part=${part}&channelId=${channelId}&publishedAfter=${publishedAfter}&publishedBefore=${publishedBefore}&maxResults=${maxResults}&order=${order}&type=${type}&key=${KEY}${
    pageToken !== null ? `&pageToken=${pageToken}` : ''
  }`
  const res = await fetch(`${baseUrl}?${query}`)
  const movies = await res.json()
  return movies
}
