import { json, redirect } from '@remix-run/node'
import type { LoaderArgs } from '@remix-run/node'
import { useSearchParams } from '@remix-run/react'
import type { Ticket } from '~/stores'
import { htmlDecode, numberOrStringToJpy } from '~/utils'

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

export const action = async ({ request, response }) => {
  const formData = await request.formData()
  const { tickets, email } = Object.fromEntries(formData)
  console.log(tickets, 'tickets')
  console.log(email, 'email')
  const parsedTickets: Ticket[] = JSON.parse(htmlDecode(tickets))

  const lineItems = parsedTickets.map((ticket) => ({
    customAttributes: [
      {
        key: 'seat',
        value: ticket.seat,
      },
    ],
    originalUnitPrice: ticket.price,
    quantity: 1,
    taxable: true,
    variantId: ticket.type,
  }))

  const apiResponse = await fetch(
    'https://krb-kuro.myshopify.com/admin/api/2023-07/graphql.json',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token':
          process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN || '',
      },
      body: JSON.stringify({
        query: DRAFT_ORDER,
        variables: {
          input: {
            billingAddress: {
              address1: '',
              address2: '',
              city: '',
              company: '',
              firstName: '',
              lastName: '',
              phone: '',
              provinceCode: '',
              zip: '',
            },
            customAttributes: [],
            email: email || 'dad.duong@karabiner.tech',
            lineItems,
            // lineItems: [
            //   {
            //     customAttributes: [
            //       {
            //         key: 'seat',
            //         value: 'I-4',
            //       },
            //     ],
            //     originalUnitPrice: '1600',
            //     quantity: 1,
            //     taxable: true,
            //     title: '',
            //     variantId: 'gid://shopify/ProductVariant/45434001588498',
            //   },
            // ],
            note: 'Test',
            phone: '',
            tags: [''],
            taxExempt: true,
            useCustomerDefaultAddress: true,
            visibleToCustomer: true,
          },
        },
      }),
    }
  )

  if (!apiResponse.ok) {
    return json({
      data: {
        error: 'Something went wrong',
      },
    })
  }

  // const { session, admin } = await authenticate.admin(request);
  const draftOrderResult = await apiResponse.json()
  console.log(draftOrderResult, 'draftOrderResult')
  const errors = draftOrderResult?.data?.draftOrderCreate?.userErrors
  const orderId = draftOrderResult?.data?.draftOrderCreate?.draftOrder?.id
  console.log(orderId, 'orderId')

  return redirect(`/order/complete?orderId=${orderId}`)
}

export default function () {
  const [searchParams] = useSearchParams()
  const orderId = searchParams.get('orderId')

  return (
    <div className="p-8 w-2/3 mx-auto">
      <h1 className="text-2xl font-bold">Order Complete</h1>
      <p className="mt-4">Your order has been completed.</p>
      <p className="mt-4">Order ID: {orderId}</p>
    </div>
  )
}

const DRAFT_ORDER = `
mutation draftOrderCreate($input: DraftOrderInput!) {
  draftOrderCreate(input: $input) {
    draftOrder {
      id
      totalPrice
      subtotalPrice
      name
      customer {
        id
        email
      }
    }
    userErrors {
      field
      message
    }
  }
}
`
