import { authenticate } from '~/shopify.server'
import { joinAndClean } from '~/utils'
import { useLoaderData } from '@remix-run/react'
import { type LoaderArgs } from '@remix-run/node'
import { useMemo } from 'react'
import clsx from 'clsx'

export const loader = async ({ request }: LoaderArgs) => {
  const { admin } = await authenticate.admin(request)

  const apiResponse = await admin.rest.get({
    path: '/orders',
    data: {
      limit: 250,
    },
  })

  const resData = await apiResponse.json()
  return {
    orders: resData.orders,
  }
}

export default function () {
  const { orders } = useLoaderData<typeof loader>()
  const convertedOrders = useMemo(() => {
    return orders.map((order) => ({
      注文番号: order.order_number,
      注文ID: order.id,
      メールアドレス: order.email || order.customer?.email,
      名前: joinAndClean(
        [order.customer?.first_name, order.customer?.last_name],
        ' '
      ),
      年齢: order.note_attributes.find((attr) => attr.name === 'age')?.value,
      性別: order.note_attributes.find((attr) => attr.name === 'gender')?.value,
      電話番号: order.phone || order.customer?.phone,
      カスタマータグ: order.customer?.tags,
      座席: joinAndClean(
        order.line_items.map(
          (item) => item.properties?.find((prop) => prop.name === 'seat')?.value
        )
      ),
      チケット種別: order.line_items
        .flatMap((item) => item.variant_title)
        .join(', '),
      SKU: joinAndClean(order.line_items.flatMap((item) => item.sku)),
      チケットID: joinAndClean(
        order.line_items.flatMap((item) => item.product_id)
      ),
      作品名: order.note_attributes.find((attr) => attr.name === 'movie')
        ?.value,
      決済方法: joinAndClean(order.payment_gateway_names),
      ディスカウント: order.total_discounts,
      合計税込: order.total_price,
      合計税抜: order.subtotal_price,
      税金: order.total_tax,
    }))
  }, [orders])
  console.log(orders)

  return (
    <div className="p-4">
      <h1>注文一覧</h1>
      <table className="mt-8 table-auto">
        <tbody>
          <tr>
            {Object.keys(convertedOrders[0]).flatMap((key) => (
              <th key={key} className="whitespace-nowrap border px-4 py-2">
                {key}
              </th>
            ))}
          </tr>
          {convertedOrders.map((order) => (
            <tr key={order['注文ID']}>
              {Object.entries<string | number | undefined>(order).map(
                ([key, value], index) => (
                  <td
                    key={key}
                    className="max-w-[300px] space-x-2 whitespace-pre-wrap break-words border px-4 py-2"
                  >
                    {(() => {
                      switch (key) {
                        case 'カスタマータグ':
                        case '座席':
                        case 'チケット種別':
                          return (
                            <>
                              {value
                                ?.toString()
                                .split(',')
                                .flatMap((_value, _index) => (
                                  <span
                                    key={_index}
                                    className={
                                      _value &&
                                      clsx(
                                        'mr-1 whitespace-nowrap break-keep rounded bg-gray-200 px-2 py-1'
                                      )
                                    }
                                  >
                                    {_value}
                                  </span>
                                ))}
                            </>
                          )
                        default:
                          return <span className="">{value}</span>
                      }
                    })()}
                  </td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
