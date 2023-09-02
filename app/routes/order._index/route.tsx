import { MovieShowModal } from './Modal'
import { LateShowLabel } from '../app.schedules._index/components'
import {
  dayNumToJapanese,
  fetchGqlAdmin,
  fetchGqlStorefront,
  range,
  removeNullishValuesAndDuplicatesFromArray,
} from '~/utils'
import { useMetaobjectParser } from '~/hooks'
import GET_MOVIES from '~/graphql/getMovies.gql'
import GET_PRODUCTS_BY_ID from '~/graphql/getProductsById.gql'
import { useTicketsStore } from '~/stores/useTicketsStore'
import { Link, useLoaderData } from '@remix-run/react'
import clsx from 'clsx'
import { useCallback, useMemo, useState } from 'react'
import type { Show } from './Modal'
import type { MetaobjectResult } from '~/hooks'
import type { LoaderArgs } from '@remix-run/node'

export type Movie = {
  handle: string
  id: string
  title: string
  thumbnail: {
    image: {
      altText: string
      url: string
    }
  }
  products: string
  rate: string
}

export async function loader({ request }: LoaderArgs) {
  const movies = await fetchGqlAdmin<MetaobjectResult>(GET_MOVIES)

  const productIds = movies?.metaobjects.nodes
    .map((movie) => {
      const productIds = movie.fields.find((field) => field.key === 'products')
      return JSON.parse(`${productIds?.value}` || '[]')
    })
    .flat(Infinity)

  const uniqueProductIds = removeNullishValuesAndDuplicatesFromArray(productIds)

  console.log(uniqueProductIds, 'uniqueProductIds')

  // const tickets = await fetchGqlAdmin<Product[]>(GET_PRODUCTS_BY_ID, {
  //   ids: productIds,
  // })

  const ticketsResponse = await fetchGqlStorefront<{
    nodes: Show[]
  }>(GET_PRODUCTS_BY_ID, {
    ids: uniqueProductIds,
  })

  console.log(ticketsResponse, 'ticketsResponse')

  return { movies, tickets: ticketsResponse?.nodes }
}

export default function () {
  const { movies, tickets } = useLoaderData<typeof loader>()
  const { parsedData: parsedMovies } = useMetaobjectParser<Movie>({
    data: movies,
    referenceKeys: ['thumbnail'],
  })

  // console.log(parsedMovies, 'parsedMovies')

  const daysFromNowArray = useMemo(
    () =>
      Array.from(Array(6).keys()).map((i) => {
        const date = new Date()
        date.setDate(date.getDate() + i)
        return date
      }),
    []
  )

  const [currentPage, setCurrentPage] = useState<number>(1)

  const [currentDayIndex, setCurrentDayIndex] = useState(0)

  const pagesCount = parsedMovies ? Math.ceil(parsedMovies.length / 6) : 0

  // const [movieListRef] = useAutoAnimate()

  return (
    <>
      <div className="flex h-full flex-col p-1">
        <ol className="flex justify-center gap-1">
          {daysFromNowArray.map((date, index) => (
            <li className="flex-1" key={date.toDateString()}>
              <button
                onClick={() => setCurrentDayIndex(index)}
                className={clsx(
                  'w-full rounded border px-5 py-3 text-center leading-relaxed',
                  index === currentDayIndex
                    ? 'bg-black text-white'
                    : 'border-black bg-white'
                )}
              >
                <p className="text-xl font-bold">
                  {date.getMonth() + 1}/{date.getDate()}
                  {`(${dayNumToJapanese(date.getDay())})`}
                </p>
                <p
                  className={clsx(
                    'text-sm font-bold ',
                    index === currentDayIndex && 'text-yellow-300'
                  )}
                >
                  シネマ会員デー
                </p>
              </button>
            </li>
          ))}
        </ol>
        <ul className="mt-4 flex max-h-[80vh] flex-wrap bg-white">
          {parsedMovies
            ?.splice(-5 + currentPage * 5, currentPage + 5)
            .map((movie) => (
              <li
                key={movie.id}
                className={clsx(
                  JSON.parse(movie.products || '[]').length > 4
                    ? 'w-full'
                    : 'w-1/2 '
                )}
              >
                <MovieCard movie={movie} tickets={tickets} />
              </li>
            ))}
        </ul>
        <div className="mb-0 mt-auto flex font-bold">
          <Link
            to="/"
            className="rounded bg-black px-6 py-3 text-xl text-white"
          >
            はじめから
          </Link>
          <div className="ml-auto mr-0 flex items-center gap-2">
            <button
              className={clsx(
                'flex-center gap-4 rounded bg-black px-6 py-3 text-xl text-white ',
                'disabled:bg-gray-200 disabled:text-gray-500 [&_*]:disabled:stroke-gray-500'
              )}
              onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="24"
                viewBox="0 0 14 24"
                fill="none"
                className="rotate-180"
              >
                <path
                  d="M3.31738 2.45215L12.2929 11.4277C12.6834 11.8182 12.6834 12.4513 12.2929 12.8419L3.31738 21.8174"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              前の作品
            </button>
            {range(1, pagesCount).map((i) => (
              <button
                key={i}
                className={clsx(
                  'flex-center ¥¥ h-10 w-10 gap-4 rounded border text-lg leading-none',
                  i === currentPage
                    ? 'bg-black text-white'
                    : 'bg-white text-black'
                )}
                onClick={() => setCurrentPage(i)}
              >
                {i}
              </button>
            ))}

            <button
              className="flex-center [&_*]:disabled:stroke-gray gap-4 rounded bg-black px-6 py-3 text-xl text-white disabled:bg-gray-200 disabled:text-gray-500"
              onClick={() =>
                setCurrentPage(Math.min(currentPage + 1, pagesCount))
              }
              disabled={currentPage === pagesCount}
            >
              次の作品
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="24"
                viewBox="0 0 14 24"
                fill="none"
              >
                <path
                  d="M3.31738 2.45215L12.2929 11.4277C12.6834 11.8182 12.6834 12.4513 12.2929 12.8419L3.31738 21.8174"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

const MovieCard = ({ movie, tickets }: { movie?: Movie; tickets?: Show[] }) => {
  const [isModalActive, setIsModalActive] = useState(false)
  const reset = useTicketsStore((state) => state.reset)

  const openModal = useCallback(
    (ticket?: Show) => {
      setIsModalActive(true)
      setCurrentTicket(ticket)
      reset()
    },
    [reset]
  )

  const ticketsMap = useMemo(
    () =>
      new Map<string, Show>(
        tickets?.map((ticket) => [ticket.id, ticket]) || []
      ),
    [tickets]
  )

  console.log(tickets)

  const ticketsIds = useMemo(() => JSON.parse(movie?.products || '[]'), [movie])

  const [currentTicket, setCurrentTicket] = useState<Show>()

  return (
    <>
      <MovieShowModal
        active={isModalActive}
        onClose={() => setIsModalActive(false)}
        show={currentTicket}
        movie={movie}
      />
      <div className={clsx('flex h-full divide-x border')}>
        <div className="w-[100px] min-w-[100px] p-1">
          <img
            className="h-full w-full object-cover"
            src={
              movie?.thumbnail.image.url ||
              'https://via.placeholder.com/240x360'
            }
            alt={movie?.thumbnail.image.altText || '作品画像'}
          />
        </div>
        <div className="flex flex-1 flex-col divide-y overflow-hidden">
          <div className="flex flex-col p-2 text-xl leading-none">
            <h1 className="min-w-0 truncate font-bold">
              {movie?.title || '作品名'}
            </h1>
            <div className="mt-1 flex items-center gap-2 text-xs leading-none">
              <p className="p-1 font-bold">招待券利用不可</p>
              {movie?.rate && (
                <span className="rounded bg-gray-400 p-1 font-bold text-white">
                  {movie.rate}
                </span>
              )}
            </div>
          </div>
          <ol className="flex flex-1 gap-1 p-1">
            {ticketsIds.map((ticketId, index) => (
              <li className="flex-1" key={ticketId}>
                <button
                  type="button"
                  onClick={() => openModal(ticketsMap.get(ticketId))}
                  className="flex-center h-full w-full flex-col gap-2 rounded bg-black py-2 text-base font-bold text-white"
                >
                  <span className="text-lg font-bold leading-none">10:10</span>
                  <span className="text-xs leading-none">~12:10</span>
                  <span className="flex-center gap-1 text-sm leading-none">
                    <span>◎ 購入</span>
                    {index === ticketsIds.length && (
                      <LateShowLabel className="h-[22px] w-[22px] bg-white fill-black" />
                    )}
                  </span>
                </button>
              </li>
            ))}
            {range(
              1,
              ticketsIds.length > 4
                ? 9 - ticketsIds.length
                : 4 - ticketsIds.length
            ).map((i) => (
              <li key={i} className="flex-1" />
            ))}
          </ol>
        </div>
      </div>
    </>
  )
}
