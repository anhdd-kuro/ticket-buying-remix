import { numberOrStringToJpy } from '~/utils'
import { Form, Link } from '@remix-run/react'
import { Modal } from '@shopify/polaris'
import { useState } from 'react'
import { z } from 'zod'
import type { Ticket } from '~/stores/useTicketsStore'

type Props = {
  tickets: Ticket[]
  formAction: string
  movie: string
  showId: string
  rate: string
  screen: string
  start: string
  end: string
}

const OrderConfirm = ({
  tickets,
  formAction,
  movie,
  showId,
  end,
  rate,
  screen,
  start,
}: Props) => {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState('')

  return (
    <div className="mx-auto flex h-full w-2/3 flex-col p-8">
      <h1 className="text-center text-2xl font-bold">購入チケット確認</h1>
      <ul className="mt-12 grid grid-cols-2 gap-4">
        {tickets.map((ticket) => (
          <li
            key={ticket.seat}
            className="rounded-lg bg-gray-200 p-4 shadow-md"
          >
            <p>作品: {movie}</p>
            <p>座席: {ticket.seat}</p>
            <p>金額: {numberOrStringToJpy(ticket.price)}</p>
          </li>
        ))}
      </ul>
      <p className="my-4 text-center text-xl font-bold">
        合計金額:
        {numberOrStringToJpy(
          tickets.reduce((acc, ticket) => acc + (ticket.price || 0), 0)
        )}
      </p>
      <button
        type="submit"
        className="mx-auto mt-4 block rounded border bg-[#626367] px-16 py-3 text-white"
        onClick={() => setOpen(true)}
      >
        {/* Create Draft Order ( 下書き注文を作成 ) */}
        KBCシネマの利用規約に同意する
      </button>
      <div className="mb-0 mt-auto flex gap-4">
        <Link
          to="/order"
          type="button"
          className="rounded bg-black px-4 py-2 text-lg font-bold text-white"
        >
          初めからやり直す
        </Link>
        <Link
          to={`/order?movie=${movie}&showId=${showId}`}
          type="submit"
          className="rounded bg-black px-4 py-2 text-lg font-bold text-white"
        >
          座席を選び直す
        </Link>
      </div>
      <Modal open={open} onClose={() => setOpen(false)} title="メール登録">
        <Modal.Section>
          <div>
            <Form
              method="post"
              action={formAction}
              className="flex flex-col gap-4"
            >
              <input name="email" type="email" value={email} hidden readOnly />
              <input name="movie" type="text" value={movie} hidden readOnly />
              <input
                name="tickets"
                type="text"
                value={JSON.stringify(tickets)}
                hidden
                readOnly
              />
              <input name="rate" type="text" value={rate} hidden readOnly />
              <input name="screen" type="text" value={screen} hidden readOnly />
              <input name="start" type="text" value={start} hidden readOnly />
              <input name="end" type="text" value={end} hidden readOnly />
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
  )
}

export default OrderConfirm
