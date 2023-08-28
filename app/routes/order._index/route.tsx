import {
  dayNumToJapanese,
  fetchAdmin,
  fetchGqlAdmin,
  range,
  removeNullishValuesAndDuplicatesFromArray,
} from '~/utils'
import { useMetaobjectParser } from '~/hooks'
import GET_MOVIES from '~/graphql/getMovies.gql'
import GET_PRODUCTS_BY_ID from '~/graphql/getProductsById.gql'
import { Link, useLoaderData } from '@remix-run/react'
import clsx from 'clsx'
import { useMemo, useState } from 'react'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import type { Product } from '@shopify/app-bridge/actions/ResourcePicker'
import type { MetaobjectResult } from '~/hooks'
import type { LoaderArgs } from '@remix-run/node'
import type { Movie } from '~/components/Movies'

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
  const ticketsResponse = await fetchAdmin('/admin/api/2023-07/products.json', {
    headers: {
      variables: JSON.stringify({ limit: 250, ids: uniqueProductIds }),
    },
  })

  const tickets: { products: Product[] } | undefined =
    await ticketsResponse?.json()

  return { movies, tickets: tickets?.products }
}

export default function () {
  const { movies, tickets } = useLoaderData<typeof loader>()
  const { parsedData: parsedMovies } = useMetaobjectParser<Movie>({
    data: movies,
    referenceKeys: ['thumbnail'],
    listReferencesKeys: ['products', 'genre'],
  })

  console.log(tickets, 'tickets')

  const ticketsMap = useMemo(() => {
    const map = new Map(tickets?.map((ticket) => [ticket.id, ticket]))
    return map
  }, [tickets])

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

  const pagesCount = 3

  // const [movieListRef] = useAutoAnimate()

  return (
    <div className="flex h-full flex-col p-1">
      <ol className="flex justify-center gap-1">
        {daysFromNowArray.map((date, index) => (
          <li className="flex-1" key={date.toDateString()}>
            <button
              onClick={() => setCurrentDayIndex(index)}
              className={clsx(
                'w-full rounded border px-5 py-3 text-center leading-relaxed ',
                index === currentDayIndex
                  ? 'bg-black text-white '
                  : 'border-black'
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
        {range(1, currentPage === 1 ? 5 : 6).map((i) => (
          <li
            key={i}
            className={clsx(currentPage === 1 && i === 1 ? 'w-full' : 'w-1/2 ')}
          >
            <MovieCard
              movie={parsedMovies?.[i]}
              slot={currentPage === 1 && i === 1 ? 9 : 4}
            />
          </li>
        ))}
      </ul>
      <div className="mb-0 mt-auto flex font-bold">
        <Link to="/" className="rounded bg-black px-6 py-3 text-xl text-white">
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
  )
}

const MovieCard = ({ movie, slot }: { movie?: Movie; slot: number }) => {
  return (
    <div className={clsx('flex divide-x overflow-hidden border')}>
      <div className="w-[100px] min-w-[100px] p-2">
        <img
          className="h-full w-full object-cover"
          src={
            movie?.thumbnail.image.url || 'https://via.placeholder.com/240x360'
          }
          alt={movie?.thumbnail.image.altText || '作品画像'}
        />
      </div>
      <div className="flex flex-1 flex-col divide-y">
        <div className="p-2 text-xl leading-none">
          <h1 className="max-w-[90%] truncate font-bold">
            {movie?.title || '作品名'}
          </h1>
        </div>
        <ol className="flex flex-1 divide-x">
          <li className="flex flex-1 flex-col">
            <p className="p-1 text-center">
              <span className="text-lg font-bold">10:10</span>
              <br />
              <span className="text-xs">~12:10</span>
            </p>
            <p className="p-1 text-center text-xs">招待券利用不可</p>
            <div className="mb-0 mt-auto px-1 pb-1">
              <button className="block w-full rounded bg-black py-2 text-base font-bold text-white">
                ◎ 購入
              </button>
            </div>
          </li>
          {range(1, slot).map((i) => (
            <li className="flex-1" key={i}></li>
          ))}
        </ol>
      </div>
    </div>
  )
}
