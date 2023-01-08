import { Pagination, Stack } from '@mui/material'
import { NextPage } from 'next'
import Link from 'next/link'
import {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import Layout from '../components/Layout'
import MainTitle from '../components/MainTitle'
import { Movie } from '../types/type'
import { supabase } from '../utils/supabase'

type keywordType = string | ''
type pageType = number
type orderType = 'asc' | 'desc'
type limitType = number
type viewerType = 'grid' | 'row'

const Movies: NextPage = () => {
  // Query
  const [keyword, setKeyword] = useState<keywordType>('') //検索キーワード
  const [page, setPage] = useState<pageType>(1) // 現在ページ
  const [pages, setPages] = useState<pageType>(0) // 全体ページ数
  const [order, setOrder] = useState<orderType>('desc') // 並び順
  const [limit, setLimit] = useState<limitType>(10) // 表示件数
  const [movies, setMovies] = useState<Movie[]>([])

  // 表示方法
  const [dispMode, setDispMode] = useState<viewerType>('grid')

  const getQuery = async (limit: number, page: number, keyword = '') => {
    const keywords = keyword.split('　')
    // pagination range
    const fromRange = (page - 1) * limit
    const toRange = fromRange + (limit + 1)
    // Query
    let query = supabase.from('movies').select('*', { count: 'exact' })
    if (keyword.length > 1) {
      for (let i = 0; i < keywords.length; i++) {
        const keyword = keywords[i]
        query = query.like('title', `%${keyword}%`)
      }
    }
    query =
      order === 'asc'
        ? query.order('publishedAt', { ascending: true })
        : query.order('publishedAt', { ascending: false })
    query = query.range(fromRange, toRange)
    query = query.limit(limit)
    // データ取得
    const { data: movies, error, status, count } = await query
    if (count) {
      setPages(Math.ceil(count / limit))
    }
    return movies
  }

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    let results
    const tmpKeyword = e.target.value
    setKeyword(tmpKeyword)
    if (tmpKeyword.length > 1) {
      await setPage(1)
      results = await getQuery(limit, page, tmpKeyword)
    } else {
      await setPage(1)
      results = await getQuery(limit, page)
    }
    setMovies(results as Movie[])
  }

  const queryClear = async () => {
    setKeyword('')
    await setPage(1)
    const results = await getQuery(limit, page)
    setMovies(results as Movie[])
  }

  const anchorRef = useRef<HTMLDivElement>(null)
  const scrollToBottomOfList = useCallback(() => {
    anchorRef?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }, [anchorRef])

  useEffect(() => {
    const getMovies = async () => {
      const results = await getQuery(limit, page, keyword)
      setMovies(results as Movie[])
    }
    getMovies()
  }, [limit, page, keyword])

  return (
    <Layout>
      <MainTitle span="学長動画検索" />
      <div className="lg:gap-x-4s grid w-full grid-cols-12 gap-x-2 p-3 md:gap-x-3">
        <div className="col-span-11  md:col-span-8">
          <div className="relative mx-auto flex w-full" ref={anchorRef}>
            <input
              className="w-full border-b border-gray-500 py-2.5 px-2"
              placeholder="検索キーワード（スペース区切りでAND検索）"
              value={keyword}
              onChange={(e) => handleChange(e)}
            />
            {keyword && (
              <button
                className="absolute right-2 top-3 mr-4"
                onClick={queryClear}
              >
                <span className="rounded-md bg-red-500 bg-opacity-60 py-1 px-2 text-sm text-white">
                  clear
                </span>
              </button>
            )}
          </div>
        </div>
        <div className="col-span-1 flex items-center justify-center md:col-span-2">
          <button
            className="rounded-full bg-blue-500 p-2 text-white"
            type="button"
            onClick={(e) => {
              e.preventDefault()
              setDispMode(dispMode === 'grid' ? 'row' : 'grid')
            }}
          >
            {dispMode === 'grid' ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
      {dispMode === 'grid' ? (
        <div className="grid grid-cols-1 gap-y-4 overflow-x-hidden p-3 sm:grid-cols-2 sm:gap-x-4 md:mb-12 md:grid-cols-3 md:gap-x-8 md:gap-y-8 lg:grid-cols-4  xl:grid-cols-5">
          {movies &&
            movies.map((movie) => {
              return (
                <GridMovie
                  key={movie.id}
                  videoId={movie.videoId}
                  title={movie.title}
                  thumbnail={movie.snippet.thumbnails.high.url}
                  description={movie.snippet.description}
                  publishedAt={movie.snippet.publishedAt}
                />
              )
            })}
        </div>
      ) : (
        <div className="flex w-full flex-col p-3">
          {movies &&
            movies.map((movie) => {
              return (
                <RowMovie
                  key={movie.id}
                  videoId={movie.videoId}
                  title={movie.title}
                  thumbnail={movie.snippet.thumbnails.high.url}
                  description={movie.snippet.description}
                  publishedAt={movie.snippet.publishedAt}
                />
              )
            })}
        </div>
      )}
      <div className="my-12">
        <Stack spacing={2}>
          <Pagination
            count={pages}
            variant="outlined"
            color="primary"
            shape="rounded"
            page={page}
            onChange={(e, page) => {
              e.preventDefault()
              setPage(page)
              scrollToBottomOfList()
            }}
          />
        </Stack>
      </div>
    </Layout>
  )
}

export default Movies

type MoviePorps = {
  videoId: string
  title: string
  thumbnail: string
  description: string
  publishedAt: string
}

const GridMovie: FC<MoviePorps> = ({
  videoId,
  title,
  thumbnail,
  description,
  publishedAt,
}) => {
  return (
    <Link href={`https://www.youtube.com/watch?v=${videoId}`}>
      <a>
        <div className="col-span-1 w-full rounded-lg bg-white shadow-md">
          <div className="relative">
            <img
              src={thumbnail}
              alt={title}
              width="480px"
              height="360px"
              className="w-full rounded-t-lg object-cover"
            />
          </div>
          <div className="w-full p-2 ">
            <h2 className="mb-2 text-lg font-bold text-gray-700">{title}</h2>
            <p className="mt-2 w-full text-right text-sm">
              配信日時：{publishedAt}
            </p>
          </div>
        </div>
      </a>
    </Link>
  )
}

const RowMovie: FC<MoviePorps> = ({
  videoId,
  title,
  thumbnail,
  description,
  publishedAt,
}) => {
  return (
    <div className="mb-3 grid h-auto grid-cols-12 grid-rows-1 gap-x-2 border-b-2 border-t-black border-opacity-70 pb-3">
      <div className="col-start-1 col-end-5 row-span-1 md:col-start-1 md:col-end-3">
        <Link href={`https://www.youtube.com/watch?v=${videoId}`}>
          <a>
            <img
              src={thumbnail}
              alt={title}
              width="240px"
              height="180px"
              className="w-full"
            />
          </a>
        </Link>
      </div>
      <div className="col-start-5 col-end-13 row-span-1 flex flex-col md:col-start-3 md:col-end-13">
        <h2 className="py-1 text-base font-bold text-gray-700 md:py-3 md:text-lg">
          {title}
        </h2>
        <p className="hidden text-base text-gray-600 md:block">{description}</p>
        <small className="mt-auto w-full text-right">
          配信日時：{publishedAt}
        </small>
      </div>
    </div>
  )
}
