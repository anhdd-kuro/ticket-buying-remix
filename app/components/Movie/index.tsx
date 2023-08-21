import { SeatsSelect } from '~/components/SeatsSelect'
import { useTicketsStore } from '~/stores'
import { Form } from '@remix-run/react'
import { useCallback, useMemo, useState } from 'react'
import { Modal, Select } from '@shopify/polaris'
import clsx from 'clsx'
import { z } from 'zod'
import type { Movie } from '~/components/Movies'

type Props = {
  movie: Movie
}

export default function Movie({ movie }: Props) {
  console.log(movie)

  const metaData = useMemo(() => {
    return new Map(
      movie?.products.nodes.map((product) => {
        const parsedData = JSON.parse(product.metaData.value || '{}') as {
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
  }, [movie?.products.nodes])

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
        <h1 className="text-xl font-bold">{movie?.title}</h1>
        <div className="mx-auto h-[10rem] w-[10rem] text-center">
          <img
            className="h-full w-full object-cover"
            src={movie?.thumbnail.image.url}
            alt={movie?.thumbnail.image.altText}
          />
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <div className="w-1/2">
          <SeatsSelect />
        </div>
        <ol className="flex-1">
          {Array.from(groupedMetaData).map(([date, productIds]) => (
            <li key={date} className="mb-4 rounded-lg bg-white p-4 shadow-md">
              <p>Date: {date}</p>
              <ol className="flex gap-4 rounded-lg border p-4">
                {productIds.map((productId) => (
                  <li key={productId}>
                    <button
                      className={clsx(
                        'rounded-lg border border-gray-200 p-4 hover:bg-black hover:text-white',
                        show?.id === productId && 'bg-black text-white'
                      )}
                      onClick={() => {
                        setShow(
                          movie?.products.nodes.find(
                            (product) => product.id === productId
                          ) ?? null
                        )
                      }}
                    >
                      <strong className="text-lg font-bold">
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
      <div className="mx-auto flex flex-col gap-2 p-4">
        <ul className="flex flex-col gap-2">
          {tickets.map((ticket) => (
            <li key={ticket.seat} className="flex items-center gap-4">
              <p className="text-xl font-bold">{ticket.seat}</p>
              <div className="flex flex-1 items-center gap-4">
                <p className="text-lg font-bold leading-none">チケット種別</p>
                {show && (
                  <Select
                    label=""
                    value={ticket.type?.id}
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
                        {
                          id: value,
                          title:
                            show?.variants.nodes.find((v) => v.id === value)
                              ?.title || '',
                        },
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
        <p className="py-2 text-xl">
          合計金額:
          {tickets
            .reduce((acc, ticket) => acc + (ticket.price || 0), 0)
            .toLocaleString('ja-JP', { style: 'currency', currency: 'JPY' })}
        </p>
        <hr />

        <Modal
          activator={
            <button
              className="mx-auto w-[40rem] rounded-lg bg-blue-500 p-4 text-white disabled:bg-gray-400"
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
                  name="email"
                  value={email}
                  className="rounded-md border p-2"
                  placeholder="メールを入力してください"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  type="submit"
                  className="mx-auto rounded-lg bg-blue-500 p-4 px-16 text-white disabled:bg-gray-400"
                  disabled={!z.string().email().safeParse(email).success}
                >
                  同時にアカウント登録して購入
                </button>
                <button
                  type="submit"
                  className="mx-auto rounded-lg bg-blue-500 p-4 px-16 text-white disabled:bg-gray-400"
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
