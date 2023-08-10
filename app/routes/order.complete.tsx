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
    <div className="text-center space-y-4">
      <h1 className="text-4xl">ご購入ありがとうございました</h1>
      <p className="text-3xl">注文番号: {orderName}</p>
      <p className="text-3xl">お支払いは窓口までお越しください</p>
      <p>領収書印刷...</p>
    </div>
  )
}
