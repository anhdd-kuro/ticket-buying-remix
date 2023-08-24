import { authenticate } from '~/shopify.server'
import { useLoaderData } from '@remix-run/react'
import { type LoaderArgs } from '@remix-run/node'
import { useMemo } from 'react'

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
      番号: order.order_number,
      id: order.id,
      メールアドレス: order.email,
      電話番号: order.phone,
      合計税込: order.total_price,
      合計税抜: order.subtotal_price,
      税金: order.total_tax,
      決済方法: order.payment_gateway_names.join(', '),
      ディスカウント: order.total_discounts,
      カスタマータグ: order.customer.tags,
      座席: order.line_items
        .map(
          (item) => item.properties?.find((prop) => prop.name === 'seat')?.value
        )
        .join(', '),
      チケット種別: order.line_items.flatMap((item) => item.title).join(', '),
      SKU: order.line_items.flatMap((item) => item.sku).join(', '),
      チケットID: Array.from(
        new Set(order.line_items.flatMap((item) => item.id))
      ).join(', '),
      作品名: order.note_attributes.find((attr) => attr.name === 'movie')
        ?.value,
      // 年齢: order.
    }))
  }, [orders])
  console.log(orders)

  return (
    <div>
      <h1>注文一覧</h1>

      <table className="table-auto">
        <tbody>
          {convertedOrders.map((order) => (
            <tr key={order.id}>
              <td className="border px-4 py-2">{order.id}</td>
              <td className="border px-4 py-2">{order.メールアドレス}</td>
              <td className="border px-4 py-2">{order.電話番号}</td>
              <td className="border px-4 py-2">{order.合計税込}</td>
              <td className="border px-4 py-2">{order.合計税抜}</td>
              <td className="border px-4 py-2">{order.税金}</td>
              <td className="border px-4 py-2">{order.決済方法}</td>
              <td className="border px-4 py-2">{order.ディスカウント}</td>
              <td className="border px-4 py-2">{order.カスタマータグ}</td>
              <td className="border px-4 py-2">{order.座席}</td>
              <td className="border px-4 py-2">{order.チケット種別}</td>
              <td className="border px-4 py-2">{order.SKU}</td>
              <td className="border px-4 py-2">{order.チケットID}</td>
              <td className="border px-4 py-2">{order.作品名}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
