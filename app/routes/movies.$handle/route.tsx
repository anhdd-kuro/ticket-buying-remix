import { type LoaderArgs } from '@remix-run/node'
import { useOutletContext, useParams, Form } from '@remix-run/react'
import type { Movie, MoviesContextData } from '../movies/route'
import { useCallback, useMemo, useState } from 'react'
import { SeatsSelect } from '~/components/SeatsSelect'
import { useTicketsStore } from '~/stores'
import { Modal, Select } from '@shopify/polaris'
import clsx from 'clsx'
import { z } from 'zod'

export async function loader({ request }: LoaderArgs) {
  // const url = new URL(request.url)
  // const handle = url.searchParams.get('handle')

  return {}
}

export default function () {
  const { handle } = useParams()

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
  const isAllTicketsSet = useTicketsStore((state) => state.isAllTicketsSet)
  const [show, setShow] = useState<Movie['products']['nodes'][number] | null>(
    null
  )
  console.log(show, 'show')

  // Modal
  const [modal, setModal] = useState(false)
  const toggleModal = useCallback(() => setModal(!modal), [modal])

  // Email
  const [email, setEmail] = useState('')

  return (
    <div>
      <div className="text-center">
        <h1 className="font-bold text-xl">{currentMovie?.title}</h1>
        <div className="w-[10rem] h-[10rem] mx-auto text-center">
          <img
            className="w-full h-full object-cover"
            src={currentMovie?.thumbnail.image.url}
            alt={currentMovie?.thumbnail.image.altText}
          />
        </div>
      </div>
      <div className="flex gap-2 mt-4">
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
        <hr />

        <Modal
          activator={
            <button
              className="bg-blue-500 text-white rounded-lg p-4 disabled:bg-gray-400 w-[40rem] mx-auto"
              disabled={!isAllTicketsSet()}
              onClick={toggleModal}
            >
              次へ
            </button>
          }
          open={modal}
          onClose={toggleModal}
          title="メール確認"
          // primaryAction={{
          //   content: 'Add Instagram',
          //   // onAction: handleChange,
          // }}
          // secondaryActions={[
          //   {
          //     content: 'Learn more',
          //     onAction: toggleModal,
          //   },
          // ]}
        >
          <Modal.Section>
            <div>
              <Form
                method="post"
                action="/order/confirm"
                className="flex flex-col gap-4"
              >
                <p>
                  メール登録はいかがですか <br />
                  ・メールからお支払いを行うことができます
                  <br />
                  ・会員の方はメールを入力してください
                </p>
                <input
                  type="email"
                  value={email}
                  className="p-2 border rounded-md"
                  placeholder="メールを入力してください"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white rounded-lg p-4 disabled:bg-gray-400 px-16 py-4 mx-auto"
                  disabled={!z.string().email().safeParse(email).success}
                >
                  同時にアカウント登録して購入
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white rounded-lg p-4 disabled:bg-gray-400 px-16 py-4 mx-auto"
                >
                  登録せずに購入
                </button>
                {/* All tickets information */}
                <input
                  type="hidden"
                  name="tickets"
                  value={JSON.stringify(tickets)}
                />
              </Form>
            </div>
          </Modal.Section>
        </Modal>
      </div>
    </div>
  )
}
