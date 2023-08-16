import type { LoaderArgs } from '@remix-run/node'
import { useLoaderData, useOutletContext, useParams } from '@remix-run/react'
import type { Movie, MoviesContextData } from '../movies/route'
import { useMemo, useState } from 'react'
import { SeatsSelect } from '~/components/SeatsSelect'
import { useTicketsStore } from '~/stores'
import { Select, AppProvider } from '@shopify/polaris'
import clsx from 'clsx'

const options = [
  { label: 'Today', value: 'today' },
  { label: 'Yesterday', value: 'yesterday' },
  { label: 'Last 7 days', value: 'lastWeek' },
]

export async function loader({ request }: LoaderArgs) {
  // const url = new URL(request.url)
  // const handle = url.searchParams.get('handle')

  return {
    polarisTranslations: require('@shopify/polaris/locales/en.json'),
  }
}

export default function () {
  const { handle } = useParams()
  const { polarisTranslations } = useLoaderData()

  const { parsedData: movies } = useOutletContext<MoviesContextData>()

  const currentMovie = movies?.find((movie) => movie.handle === handle)
  const metaData = useMemo(() => {
    return new Map(
      currentMovie?.products.nodes.map((product) => {
        const parsedData = JSON.parse(product.metaData.value) as {
          start: string
          end: string
        }
        const start = parsedData.start ? new Date(parsedData.start) : new Date()
        const end = parsedData.end ? new Date(parsedData.end) : new Date()

        const startHM = `${start.getHours()}:${start
          .getMinutes()
          .toString()
          .padStart(2, '0')}`
        const endHM = `${end.getHours()}:${end
          .getMinutes()
          .toString()
          .padStart(2, '0')}`

        return [product.id, { start, end, startHM, endHM }]
      })
    )
  }, [currentMovie?.products.nodes])

  console.log(metaData, 'metaData')

  // group metaData by start date, start is date-time string
  // result will be a Map with key is date string value with format "yyyy-mm-dd hh:mm" is metaData key which is product.id
  const groupedMetaData = useMemo(() => {
    const result = new Map<string, string[]>()
    metaData.forEach((value, key) => {
      const date = value.start ? new Date(value.start) : new Date()
      const year = date.getFullYear()
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const day = date.getDate()
      const dateString = `${year}-${month}-${day}`
      const current = result.get(dateString) ?? []

      result.set(dateString, [...current, key])
    })
    return result
  }, [metaData])

  console.log(groupedMetaData, 'groupedMetaData')

  const tickets = useTicketsStore((state) => state.tickets)
  const modifyTicket = useTicketsStore((state) => state.modifyTicket)
  const [show, setShow] = useState<Movie['products']['nodes'][number] | null>(
    null
  )
  console.log(show, 'show')

  return (
    <AppProvider i18n={polarisTranslations}>
      <div>
        <h1>{currentMovie?.title}</h1>
        <div className="flex gap-2">
          <div className="w-1/2">
            <SeatsSelect />
          </div>
          <ol className="flex-1">
            {Array.from(groupedMetaData).map(([date, productIds]) => (
              <li key={date} className="rounded-lg shadow-md bg-white p-4 mb-4">
                <p>Date: {date}</p>
                <ol className="rounded-lg border p-4 flex gap-4">
                  {productIds.map((productId) => (
                    <li key={productId}>
                      <button
                        className={clsx(
                          'rounded-lg border border-gray-200 p-4 hover:bg-black hover:text-white',
                          show?.id === productId && 'bg-black text-white'
                        )}
                        onClick={() => {
                          setShow(
                            currentMovie?.products.nodes.find(
                              (product) => product.id === productId
                            ) ?? null
                          )
                        }}
                      >
                        <strong className="font-bold text-lg">
                          {metaData.get(productId)?.startHM}
                        </strong>
                        <p>~ {metaData.get(productId)?.endHM}</p>
                      </button>
                    </li>
                  ))}
                </ol>
              </li>
            ))}
          </ol>
        </div>
        <div className="flex flex-col gap-2 p-4 mx-auto">
          <ul className="flex flex-col gap-2">
            {tickets.map((ticket) => (
              <li key={ticket.seat} className="flex items-center gap-4">
                <p className="text-xl font-bold">{ticket.seat}</p>
                <div className="flex items-center gap-4 flex-1">
                  <p className="text-lg font-bold leading-none">チケット種別</p>
                  {show && (
                    <Select
                      label=""
                      value={ticket.type}
                      labelInline
                      options={[
                        {
                          label: '選択してください',
                          value: '',
                          disabled: true,
                        },
                        ...show?.variants.nodes.map((v) => ({
                          label: v.title,
                          value: v.id,
                        })),
                      ]}
                      onChange={(value) => {
                        modifyTicket(
                          ticket.seat,
                          value,
                          parseInt(
                            show?.variants.nodes.find((v) => v.id === value)
                              ?.price || ''
                          )
                        )
                      }}
                    />
                  )}
                </div>
              </li>
            ))}
          </ul>
          <hr />
          <p className="text-xl py-2">
            合計金額:
            {tickets
              .reduce((acc, ticket) => acc + (ticket.price || 0), 0)
              .toLocaleString('ja-JP', { style: 'currency', currency: 'JPY' })}
          </p>
        </div>
      </div>
    </AppProvider>
  )
}
