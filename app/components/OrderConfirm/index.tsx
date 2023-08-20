import { numberOrStringToJpy } from '~/utils'
import { Form } from '@remix-run/react'
import type { Ticket } from '~/stores'

type Props = {
  tickets: Ticket[]
  formAction: string
  email?: string | null
}

const OrderConfirm = ({ tickets, email, formAction }: Props) => {
  return (
    <div className="mx-auto w-2/3 p-8">
      <h1 className="text-center text-2xl font-bold">購入チケット確認</h1>
      <p className="text-lg font-bold">Email: {email}</p>
      <ul className=" mt-16 flex flex-col gap-4">
        {tickets.map((ticket) => (
          <li
            key={ticket.seat}
            className="rounded-lg bg-gray-200 p-4 shadow-md"
          >
            <p>{ticket.seat}</p>
            <p>{ticket.type}</p>
            <p>{numberOrStringToJpy(ticket.price)}</p>
          </li>
        ))}
      </ul>
      <p className="mt-4 py-2 text-xl">
        合計金額:
        {numberOrStringToJpy(
          tickets.reduce((acc, ticket) => acc + (ticket.price || 0), 0)
        )}
      </p>

      <Form method="post" action={formAction}>
        <input name="email" type="email" value={email || ''} hidden readOnly />
        <input
          name="tickets"
          type="text"
          value={JSON.stringify(tickets)}
          hidden
          readOnly
        />
        <button
          type="submit"
          className="mx-auto mt-4 block rounded border bg-[#626367] p-2 text-white"
        >
          Create Draft Order ( 下書き注文を作成 )
        </button>
      </Form>
    </div>
  )
}

export default OrderConfirm
