import { SeatsSelect } from '~/components/SeatsSelect'
import { useTicketsStore } from '~/stores/useTicketsStore'
import { numberOrStringToJpy } from '~/utils'
import { Modal } from '@shopify/polaris'
import { useCallback, useMemo } from 'react'
import { Form } from '@remix-run/react'
import type { Movie } from './route'

export type Show = {
  id: string
  handle: string
  title: string
  metaData: { value: string }
  variants: {
    nodes: {
      id: string
      title: string
      price: {
        amount: number
      }
    }[]
  }
}

export const MovieShowModal = ({
  active,
  onClose,
  onAction,
  show,
  movie,
}: {
  active: boolean
  onClose: () => void
  onAction?: () => void
  show?: Show
  movie?: Movie
}) => {
  console.log(show, 'Modal ticket')
  const tickets = useTicketsStore((state) => state.tickets)
  const modifyTicket = useTicketsStore((state) => state.modifyTicket)
  const isAllTicketsSet = useTicketsStore((state) => state.isAllTicketsSet)
  const reset = useTicketsStore((state) => state.reset)
  const metaData = JSON.parse(show?.metaData.value || '{}') as {
    start: string
    end: string
  }

  console.log(isAllTicketsSet())

  console.log(tickets, 'tickets')

  const totalPrice = tickets.reduce((total, ticket) => {
    return total + (ticket.price || 0)
  }, 0)

  const options = useMemo(() => {
    if (!show?.variants?.nodes) {
      return []
    }
    return [
      ...show.variants?.nodes?.map((v) => ({
        label: v.title || '',
        value: v.id || '',
      })),
    ]
  }, [show?.variants?.nodes])

  const close = useCallback(() => {
    reset()
    onClose?.()
  }, [onClose, reset])

  return (
    <Modal open={active} onClose={close} title="" large>
      <Modal.Section>
        {show && (
          <Form method="post" action="/order/confirm">
            <input
              type="hidden"
              name="tickets"
              value={JSON.stringify(tickets)}
              readOnly
            />
            <input type="hidden" name="showId" value={show.id} readOnly />
            <input type="hidden" name="movie" value={movie?.title} readOnly />
            <input type="hidden" name="rate" value={movie?.rate} readOnly />
            <input type="hidden" name="screen" value="シネマ1" readOnly />
            <input
              type="hidden"
              name="start"
              value={metaData.start.slice(11)}
              readOnly
            />
            <input
              type="hidden"
              name="end"
              value={metaData.end.slice(11)}
              readOnly
            />
            <div className="flex gap-8">
              <div className="w-1/2">
                <SeatsSelect className="w-full" />
              </div>
              <div className="flex-1">
                <div className="flex">
                  <div className="w-[100px] min-w-[100px] border p-1">
                    <img
                      className="h-full w-full object-cover"
                      src={
                        movie?.thumbnail.image.url ||
                        'https://via.placeholder.com/240x360'
                      }
                      alt={movie?.thumbnail.image.altText || '作品画像'}
                    />
                  </div>
                  <div className="flex-1 space-y-2 border p-2 text-lg">
                    <p>{movie?.title}</p>
                    <p>
                      <strong className="font-bold">{metaData.start}</strong>~
                      {metaData.end}
                    </p>
                  </div>
                </div>
                {tickets.length > 0 ? (
                  <ul className="mt-4 flex flex-col gap-4">
                    {tickets.map((ticket, index) => (
                      <li
                        key={ticket.seat}
                        className="flex items-center justify-between"
                      >
                        <p className="flex-center flex-col">
                          <span className="text-xs">座席番号:</span>
                          <span className="text-lg font-bold">
                            {ticket.seat}
                          </span>
                        </p>
                        <p className="text-lg">チケット種別</p>
                        <select
                          name=""
                          id=""
                          value={ticket.type?.id || ''}
                          className="flex rounded border p-2"
                          onChange={(e) => {
                            modifyTicket(
                              ticket.seat,
                              { id: e.target.value, title: e.target.value },
                              +(
                                show.variants.nodes.find(
                                  (v) => v.id === e.target.value
                                )?.price.amount || 0
                              )
                            )
                          }}
                        >
                          <option value="" disabled>
                            選択してください
                          </option>
                          {options.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-4 text-xl font-bold">
                    ← 左から席を選らんください
                  </p>
                )}
                {totalPrice > 0 && (
                  <p className="mt-4 border-t-2 border-black pt-4 text-right text-xl font-bold">
                    合計金額: {numberOrStringToJpy(totalPrice)}
                  </p>
                )}
              </div>
            </div>
            <div className="mt-2 flex justify-between">
              <button
                onClick={onClose}
                type="button"
                className="rounded bg-black px-4 py-2 text-lg font-bold text-white"
              >
                作品の選択へ戻る
              </button>
              <button
                onClick={onClose}
                type="submit"
                className="rounded bg-black px-4 py-2 text-lg font-bold text-white disabled:bg-gray-400"
                disabled={!isAllTicketsSet()}
              >
                次へ進む
              </button>
            </div>
          </Form>
        )}
      </Modal.Section>
    </Modal>
  )
}
