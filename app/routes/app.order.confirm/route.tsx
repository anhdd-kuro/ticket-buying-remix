import { jsonSchema } from '~/utils'
import OrderConfirm from '~/components/OrderConfirm'
import { redirect } from '@remix-run/node'
import { useLocation, useSearchParams } from '@remix-run/react'
import type { LoaderArgs, ActionArgs } from '@remix-run/node'
import type { Ticket } from '~/stores'

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

  return redirect(`/order/done?${searchParams}`, {})
}

export default function () {
  const location = useLocation()

  const [searchParams] = useSearchParams()
  const tickets = searchParams.get('tickets') || ''
  const isTicketValid = jsonSchema.safeParse(tickets).success

  const parsedTickets: Ticket[] = isTicketValid ? JSON.parse(tickets) : []
  const email = searchParams.get('email')

  return (
    <OrderConfirm
      email={email}
      tickets={parsedTickets}
      formAction={`/order/done`}
    />
  )
}
