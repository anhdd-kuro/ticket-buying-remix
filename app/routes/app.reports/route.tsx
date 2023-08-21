import { authenticate } from '~/shopify.server'
import { useLoaderData } from '@remix-run/react'
import { json, type LoaderArgs } from '@remix-run/node'
import type { MetaobjectResult } from '~/hooks'

export const loader = async ({ request }: LoaderArgs) => {
  const { admin } = await authenticate.admin(request)

  const apiResponse = await admin.rest.get({
    path: '/orders',
    data: {
      limit: 250,
    },
  })

  const resData: { data: MetaobjectResult } = await apiResponse.json()
  console.log(
    `🚀 ------------------------------------------------------------🚀`
  )
  console.log(`🚀 \n - file: route.tsx:20 \n - loader \n - resData:`, resData)
  console.log(
    `🚀 ------------------------------------------------------------🚀`
  )

  return {
    orders: json(resData.data),
  }
}

export default function () {
  const { orders } = useLoaderData<typeof loader>()
  console.log(orders)

  return (
    <div>
      <h1>Orders</h1>
    </div>
  )
}
