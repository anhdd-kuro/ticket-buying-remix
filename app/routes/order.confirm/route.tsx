import { jsonSchema } from '~/utils'
import OrderConfirm from '~/components/OrderConfirm'
import { redirect } from '@remix-run/node'
import { useLocation, useSearchParams } from '@remix-run/react'
import type { LoaderArgs, ActionArgs } from '@remix-run/node'
import type { Ticket } from '~/stores/useTicketsStore'

export async function loader({ request, params, context }: LoaderArgs) {
  console.log('------------------------------------------')
  console.log(request, 'request')
  console.log(params, 'params')
  console.log(context, 'context')

  return {}
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData()
  const searchParams = new URLSearchParams()

  for (const [key, value] of formData.entries()) {
    if (value) searchParams.append(key, value as string)
  }
  // console.log(tickets, 'tickets')

  return redirect(`/order/confirm?${searchParams}`, {})
}

export default function () {
  const location = useLocation()

  const [searchParams] = useSearchParams()
  const tickets = searchParams.get('tickets') || ''
  const isTicketValid = jsonSchema.safeParse(tickets).success

  const parsedTickets: Ticket[] = isTicketValid ? JSON.parse(tickets) : []

  const movie = searchParams.get('movie') || ''
  const rate = searchParams.get('rate') || ''
  const screen = searchParams.get('screen') || ''
  const showId = searchParams.get('showId') || ''
  const start = searchParams.get('start') || ''
  const end = searchParams.get('end') || ''

  return (
    <OrderConfirm
      movie={movie}
      showId={showId}
      rate={rate}
      screen={screen}
      start={start}
      end={end}
      tickets={parsedTickets}
      formAction={`/order/done`}
    />
  )
}
