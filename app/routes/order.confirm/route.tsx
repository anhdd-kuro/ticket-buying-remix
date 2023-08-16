import { redirect } from '@remix-run/node'
import type { LoaderArgs, ActionArgs } from '@remix-run/node'
import { Form, useSearchParams } from '@remix-run/react'
import type { Ticket } from '~/stores'
import { jsonSchema, numberOrStringToJpy } from '~/utils'
import { z } from 'zod'

export async function loader({ request, params, context }: LoaderArgs) {
  console.log('------------------------------------------')
  console.log(request, 'request')
  console.log(params, 'params')
  console.log(context, 'context')
  // const tickets = request.searc('tickets') || '{}'
  // const parsedTickets = JSON.parse(tickets)
  // console.log(parsedTickets, 'parsedTickets')
  // console.log(request, 'request')
  // console.log(params, 'params')
  // const { tickets = '' } = params
  // const parsedTickets = JSON.parse(tickets)
  // console.log(parsedTickets, 'parsedTickets')

  return {}
}
export async function action({ request }: ActionArgs) {
  const formData = await request.formData()
  const searchParams = new URLSearchParams()

  for (const [key, value] of formData.entries()) {
    if (value) searchParams.append(key, value as string)
  }
  // console.log(tickets, 'tickets')

  return redirect(`/order/confirm/?${searchParams}`, {})
}

export default function () {
  const [searchParams] = useSearchParams()
  const tickets = searchParams.get('tickets') || ''
  const isTicketValid = jsonSchema.safeParse(tickets).success

  const parsedTickets: Ticket[] = isTicketValid ? JSON.parse(tickets) : []
  const email = searchParams.get('email')

  return (
    <div className="p-8 w-2/3 mx-auto">
      <h1 className="text-2xl font-bold text-center">購入チケット確認</h1>
      <p className="text-lg font-bold">Email: {email}</p>
      <ul className=" flex flex-col gap-4 mt-16">
        {parsedTickets.map((ticket) => (
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
          parsedTickets.reduce((acc, ticket) => acc + (ticket.price || 0), 0)
        )}
      </p>

      <Form method="post" action="/order/done">
        <input name="email" type="email" value={email || ''} hidden readOnly />
        <input name="tickets" type="text" value={tickets} hidden readOnly />
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
