import { json, redirect } from '@remix-run/node'
import type { LoaderArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { useRef } from 'react'
import ReactToPrint, { useReactToPrint } from 'react-to-print'
import type { Ticket } from '~/stores'
import { gidToId, htmlDecode } from '~/utils'

export async function loader({ request, params, context }: LoaderArgs) {
  console.log('------------------------------------------')
  console.log(request, 'request')
  console.log(params, 'params')
  console.log(context, 'context')
  const orderId = new URL(request.url).searchParams.get('orderId')
  console.log(orderId, 'orderId')
  console.log(process.env)
  const orderResult = await fetch(
    `https://${process.env.SHOPIFY_SHOP_NAME}.com/admin/api/2021-07/draft_orders/${orderId}.json`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token':
          process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN || '',
      },
    }
  )

  if (orderResult.status === 200) {
    const data = await orderResult.json()
    return {
      order: data.draft_order,
    }
  }

  return {
    error: 'Something went wrong',
  }
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
  const orderGId = draftOrderResult?.data?.draftOrderCreate?.draftOrder?.id
  const orderId = gidToId(orderGId)
  console.log(orderId, 'orderId')

  return redirect(`/order/done?orderId=${orderId}`)
}

export default function () {
  // const [searchParams] = useSearchParams()
  // const orderId = searchParams.get('orderId')
  const { order } = useLoaderData()
  const componentRef = useRef(null)

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })

  return (
    <div
      ref={componentRef}
      className="flex flex-col gap-4 p-8 w-2/3 mx-auto text-center leading-relaxed"
    >
      {order && (
        <>
          <h1 className="text-2xl font-bold">ご購入ありがとうございました</h1>
          <p className="">注文番号: {order.id}</p>
          <p className="text-lg font-bold">
            10分以内でお支払いを行なってください !<br />
            お支払いが完了するまで、チケット発券できません !
          </p>
          <p className="text-lg">
            お支払い方法に関しては <br />
            ・メールを入力した方はメールをご確認お願いします <br />
            ・または窓口にてお支払いください
            <br />
            ・クーポンをお持ちの方はお支払いを行なう際にご利用できます
          </p>
        </>
      )}
      <ReactToPrint content={() => componentRef.current}>
        <button
          onClick={handlePrint}
          className="w-[20rem] mx-auto p-2 rounded-lg bg-blue-500 text-white"
        >
          印刷
        </button>
      </ReactToPrint>
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
