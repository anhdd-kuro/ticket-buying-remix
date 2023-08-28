import { authenticate } from '~/shopify.server'
import {
  convertObjectToCSV,
  genderToJapanese,
  joinAndClean,
  numberOrStringToJpy,
} from '~/utils'
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
    return orders
      .map((order) => {
        return order.line_items.map((line_item) => ({
          注文番号: order.order_number,
          注文ID: order.id,
          メールアドレス: order.email || order.customer?.email,
          名前: joinAndClean(
            [order.customer?.first_name, order.customer?.last_name],
            ' '
          ),
          年齢: order.note_attributes.find((attr) => attr.name === 'age')
            ?.value,
          性別: genderToJapanese(
            order.note_attributes.find((attr) => attr.name === 'gender')?.value
          ),
          電話番号: order.phone || order.customer?.phone,
          カスタマータグ: order.customer?.tags,
          座席: line_item.properties?.find((prop) => prop.name === 'seat')
            ?.value,
          チケット種別: line_item.variant_title,
          SKU: line_item.sku,
          チケットID: line_item.product_id,
          作品名: order.note_attributes.find((attr) => attr.name === 'movie')
            ?.value,
          決済方法: joinAndClean(order.payment_gateway_names),
          ディスカウント: order.total_discounts,
          金額: +line_item.price,
          税金: line_item.tax_lines.reduce(
            (acc, tax_line) => acc + +tax_line.price,
            0
          ),
        }))
      })
      .flat()
  }, [orders])
  console.log(orders)
  console.log(convertedOrders, 'convertedOrders')

  const downloadCSVRef = useRef<HTMLAnchorElement>(null)

  const downloadCSV = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      const csv = convertObjectToCSV(convertedOrders)
      const blob = new Blob([csv], { type: 'text/csv' })
      const url = window.URL.createObjectURL(blob)
      downloadCSVRef.current?.setAttribute('href', url)
      downloadCSVRef.current?.setAttribute('download', 'orders.csv')
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
            <th className="whitespace-nowrap border p-2">行目</th>
            {Object.keys(convertedOrders[0]).flatMap((key) => (
              <th key={key} className="whitespace-nowrap border p-2">
                {key}
              </th>
            ))}
          </tr>
          {convertedOrders.map((order, order_index) => (
            <tr key={order['注文ID'] + order_index} className="odd:bg-gray-100">
              <td className=" break-words border p-2 text-center">
                {order_index}
              </td>
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
                          case '金額':
                          case '税金':
                            return <span>{numberOrStringToJpy(value)}</span>
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
