import { Form } from '@remix-run/react'
import type { Ticket } from '~/stores'
import { numberOrStringToJpy } from '~/utils'

type Props = {
  tickets: Ticket[]
  email?: string | null
}

const OrderConfirm = ({ tickets, email }: Props) => {
  return (
    <div className="p-8 w-2/3 mx-auto">
      <h1 className="text-2xl font-bold text-center">購入チケット確認</h1>
      <p className="text-lg font-bold">Email: {email}</p>
      <ul className=" flex flex-col gap-4 mt-16">
        {tickets.map((ticket) => (
          <li
            key={ticket.seat}
            className="p-4 bg-gray-200 rounded-lg shadow-md"
          >
            <p>{ticket.seat}</p>
            <p>{ticket.type}</p>
            <p>{numberOrStringToJpy(ticket.price)}</p>
          </li>
        ))}
      </ul>
      <p className="text-xl py-2 mt-4">
        合計金額:
        {numberOrStringToJpy(
          tickets.reduce((acc, ticket) => acc + (ticket.price || 0), 0)
        )}
      </p>

      <Form method="post" action="/order/done">
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
          className="p-2 border rounded bg-[#626367] text-white"
        >
          Create Draft Order ( 下書き注文を作成 )
        </button>
      </Form>
    </div>
  )
}

export default OrderConfirm
