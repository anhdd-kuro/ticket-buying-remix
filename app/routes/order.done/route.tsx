import { gidToId, htmlDecode, numberOrStringToJpy } from '~/utils'
import DRAFT_ORDER from '~/graphql/createDraftOrder.gql'
import { json, redirect } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { useEffect, useMemo, useRef } from 'react'
import html2canvas from 'html2canvas'
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
    const data = await orderResult.json()
    return {
      order: data.draft_order,
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
  const { tickets, email, movie } = Object.fromEntries(formData)
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
            customAttributes: [
              {
                key: 'movie',
                value: movie,
              },
            ],
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
  const { order, error, status } = useLoaderData()
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
          rate="PG12"
          screen="シネマ1"
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

const TicketPrint = ({
  movie,
  orderId,
  price,
  seat,
  variantTitle,
  rate,
  screen,
}: {
  seat: string
  orderId: string
  price: string
  variantTitle: string
  movie: string
  rate: string
  screen: string
}) => {
  const componentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!componentRef.current) return

    componentRef.current.style.transform = `scale(${
      576 / componentRef.current.clientWidth
    })`

    html2canvas(componentRef.current, {
      scrollX: -window.scrollX,
      scrollY: -window.scrollY,
      windowWidth: document.documentElement.offsetWidth,
      windowHeight: document.documentElement.offsetHeight,
    }).then((canvas) => {
      const id = `${orderId}_${seat}`
      canvas.setAttribute('id', id)
      canvas.setAttribute('data-selector', 'ticket-canvas')
      canvas.style.display = 'none'

      const existingCanvas = document.getElementById(id)
      if (!existingCanvas) {
        document.body.appendChild(canvas)
      } else {
        document.body.replaceChild(canvas, existingCanvas)
      }
    })
  }, [orderId, seat])

  return (
    <div
      ref={componentRef}
      className="absolute left-[-9999px] top-[-9999px] inline-flex flex-col gap-2 bg-white px-5 py-4 leading-none"
    >
      <div className="flex flex-col items-start justify-start gap-1 self-stretch">
        <div>
          <span className="font-bold" suppressHydrationWarning>
            {new Date(new Date().getTime() + 600000)
              .toLocaleTimeString()
              .slice(0, 5)}
          </span>
          <span className="text-[10px] font-medium">
            までに窓口でお支払いください。
          </span>
        </div>
        <div className="text-xs font-medium">注文番号：{orderId}</div>
      </div>
      <hr className="h-px border border-zinc-600" />
      <div className="flex flex-col items-end justify-start gap-1.5 self-stretch [&>*]:w-full">
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold leading-none">KBCシネマ</p>
          <p className="box-border rounded border border-black p-1 font-bold">
            未払い
          </p>
        </div>
        <div className="rounded bg-black p-1">
          <div className="flex items-center justify-start gap-2 text-xs">
            <p className="font-bold text-white">{movie}</p>
            <p className="rounded-sm border bg-white p-[2px] leading-none text-black">
              {rate}
            </p>
          </div>
          <div className="mt-1 text-xs font-bold text-white">
            舞台挨拶付き (13:00〜)
          </div>
        </div>
        <div className="flex flex-col text-xs font-bold [&>*]:w-full">
          <div className="border border-neutral-400 px-4 py-1 text-center">
            8/22(火) 　 12:15〜13:45
          </div>
          <div className="flex text-center">
            <p className="w-2/3 border border-neutral-400 p-1 font-bold">
              {screen}
            </p>
            <p className="flex-1 border border-neutral-400 p-1 font-bold">
              {seat}
            </p>
          </div>
        </div>
        <div className="flex w-full justify-between text-xs font-bold">
          <span>{variantTitle}</span>
          <span>{numberOrStringToJpy(price)}</span>
        </div>
        <div
          className="text-right text-[10px] font-medium"
          suppressHydrationWarning
        >
          発行日時：
          {new Date()
            .toLocaleString('ja-JP', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            })
            .replace(/\//g, '-')
            .replace(',', '')}
        </div>
      </div>
    </div>
  )
}
