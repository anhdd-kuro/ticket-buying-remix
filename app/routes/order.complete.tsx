import type { LoaderArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

export async function loader({ request }: LoaderArgs) {
  const orderName = request.headers.get('order-name') || ''

  return {
    orderName,
  }
}

export default function () {
  const { orderName } = useLoaderData()

  return (
    <div>
      <h1>ご購入ありがとうございました</h1>
      <p>注文番号: {orderName}</p>
      <p>お支払いは窓口までお越しください</p>
    </div>
  )
}
