import { gidToId, htmlDecode, numberOrStringToJpy } from '~/utils'
import DRAFT_ORDER from '~/graphql/createDraftOrder.gql'
import TicketPrint from '~/components/MovieTicket'
import { json, redirect } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import type { Ticket } from '~/stores'
import type { LoaderArgs } from '@remix-run/node'

export async function loader({ request, params, context }: LoaderArgs) {
  console.log('------------------------------------------')
  console.log(request, 'request')
  console.log(params, 'params')
  console.log(context, 'context')
  console.log('request.url', new URL(request.url).searchParams.keys())

  const orderId = new URL(request.url).searchParams.get('orderId')
  console.log(orderId, 'orderId')
  // console.log('process.env', process.env)

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
    const tenMinutesFromNow = new Date(new Date().getTime() + 600000)
      .toLocaleTimeString()
      .slice(0, 5)

    const now = new Date()
      .toLocaleString('ja-JP', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
      .replace(/\//g, '-')
      .replace(',', '')

    const data = await orderResult.json()

    const convertedLineItems = data.draft_order.line_items.map((lineItem) => ({
      ...lineItem,
      price: numberOrStringToJpy(lineItem.price),
    }))

    return {
      order: { ...data.draft_order, line_items: convertedLineItems },
      tenMinutesFromNow,
      now,
    }
  }

  console.log(orderResult, 'orderResult')

  return {
    status: orderResult.status,
    error: 'Something went wrong',
  }
}

export const action = async ({ request, response }) => {
  const formData = await request.formData()
  const { tickets, email, movie, start, end, rate, screen } =
    Object.fromEntries(formData)
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
    variantId: ticket.type?.id,
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
            customAttributes: Object.entries(Object.fromEntries(formData)).map(
              ([key, value]) => ({
                key,
                value,
              })
            ),
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
  const { order, error, status, now, tenMinutesFromNow } = useLoaderData()
  console.log(order)

  return (
    <div className="overflow-hidden">
      {order?.line_items?.map((lineItem) => (
        <TicketPrint
          key={lineItem.id}
          orderId={order.id}
          price={lineItem.price}
          seat={lineItem.properties.find((attr) => attr.name === 'seat').value}
          variantTitle={lineItem.variantTitle}
          movie={
            order.note_attributes.find((attr) => attr.name === 'movie').value
          }
          start={
            order.note_attributes.find((attr) => attr.name === 'start')?.value
          }
          end={order.note_attributes.find((attr) => attr.name === 'end')?.value}
          rate={
            order.note_attributes.find((attr) => attr.name === 'rate')?.value
          }
          screen={
            order.note_attributes.find((attr) => attr.name === 'screen')?.value
          }
          now={now}
          tenMinutesFromNow={tenMinutesFromNow}
        />
      ))}
      <div className="mx-auto flex w-[80%&] flex-col gap-4 p-8 text-center leading-relaxed">
        {order && (
          <>
            <h1 className="text-2xl font-bold">ご購入ありがとうございました</h1>
            <p className="text-xl">注文番号: {order.id}</p>
            <p className="text-xl font-bold">
              10分以内に窓口でお支払いを完了してください。
              <br />
              お支払いが完了するまで、チケットはご利用いただけません。
            </p>
            <p className="text-lg">
              お支払い方法に関しては <br />
              ※ メールを入力した方はメールをご確認お願いします <br />
              ※ または窓口にてお支払いください <br />※
              クーポンをお持ちの方は、窓口のお支払いにてご利用いただけます。
            </p>
          </>
        )}
        {error && (
          <p className="text-lg font-bold text-red-500">
            Status: {status},{error}
          </p>
        )}
      </div>
      <div className="mt-8 flex flex-col items-center justify-center gap-4 text-center font-bold text-white">
        <button
          id="print-button"
          className="mx-auto block w-[20rem] bg-blue-500 p-4"
        >
          レシート印刷
        </button>
        <Link to="/" className="block w-[20rem] bg-gray-500 p-4">
          ホームに戻る
        </Link>
        <Link to="/tickets" className="block w-[20rem] bg-slate-800 p-4">
          チケット発券
        </Link>
      </div>
    </div>
  )
}
