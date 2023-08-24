import { authenticate } from '~/shopify.server'
import { convertObjectToCSV, genderToJapanese, joinAndClean } from '~/utils'
import { useLoaderData } from '@remix-run/react'
import { type LoaderArgs } from '@remix-run/node'
import { useCallback, useMemo, useRef } from 'react'
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

  const downloadCSVRef = useRef<HTMLAnchorElement>(null)

  const downloadCSV = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      const csv = convertObjectToCSV(convertedOrders)
      const blob = new Blob([csv], { type: 'text/csv' })
      const url = window.URL.createObjectURL(blob)
      downloadCSVRef.current?.setAttribute('href', url)
      downloadCSVRef.current?.setAttribute('download', 'orders.csv')
      downloadCSVRef.current?.click()
    },
    [convertedOrders]
  )

  return (
    <div className="p-4">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">注文一覧</h1>
        <a
          href="/"
          ref={downloadCSVRef}
          className="bg-blue-500 p-4 text-white"
          onClick={downloadCSV}
        >
          CSV 書き出す
        </a>
      </div>
      <table className="mt-4 table-auto bg-white">
        <tbody>
          <tr>
            {Object.keys(convertedOrders[0]).flatMap((key) => (
              <th key={key} className="whitespace-nowrap border p-2">
                {key}
              </th>
            ))}
          </tr>
          {convertedOrders.map((order) => (
            <tr key={order['注文ID']}>
              {Object.entries<string | number | undefined>(order).map(
                ([key, value], index) => (
                  <td key={key} className=" break-words border p-2">
                    <div className="flex min-w-[100px] max-w-[300px] flex-wrap gap-2">
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
                          case '性別':
                            return <span>{genderToJapanese(value)}</span>
                          default:
                            return <span>{value}</span>
                        }
                      })()}
                    </div>
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
