import { print } from '~/printer'
import { useCanvas } from '~/hooks'
import { Link, useLoaderData } from '@remix-run/react'

export async function loader({ request }) {
  // get form data in remix
  const formData = new URL(request.url).searchParams
  // get emailOrPhone and orderId from form data
  const emailOrPhone = formData.get('emailOrPhone')
  const orderId = formData.get('orderId')

  // if (!emailOrPhone || !orderId) {
  //   return redirect('/tickets', {})
  // }

  // get ticket data from db
  const orderResponse = await fetch(
    `https://krb-kuro.myshopify.com/admin/api/2023-07/orders/${orderId}.json`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token':
          process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN || '',
      },
    }
  )
  console.log('orderResponse', orderResponse)

  if (orderResponse.status !== 200) {
    return {
      order: null,
      errors: "Couldn't find order",
    }
  }

  const orderParse = await orderResponse.json()
  if (orderParse.errors)
    return {
      order: null,
      errors: orderParse.errors,
    }

  const orderData = orderParse.order

  if (orderData.email !== emailOrPhone && orderData.phone !== emailOrPhone)
    return {
      order: null,
      errors: "Couldn't find order",
    }

  return {
    errors: null,
    order: orderData,
  }
}

export default function () {
  const { order, errors } = useLoaderData<typeof loader>()
  console.log(order)

  const { elmRef, elmId } = useCanvas()

  return (
    <div className="p-16">
      {errors && <p className="text-red-500">{errors}</p>}
      {order && (
        <div>
          <ul ref={elmRef} className="flex flex-col items-center gap-4">
            {order.line_items.map((item) => (
              <li key={item.id} className="rounded border p-4">
                <p className="text-xl font-bold">{item.name}</p>
                <p>
                  座席:{' '}
                  {item.properties.find((prop) => prop.name === 'seat')?.value}
                </p>
              </li>
            ))}
          </ul>
          <button
            id="print-button"
            className="mx-auto mt-8 block w-[20rem] rounded bg-gray-500 p-4 text-white"
            onClick={() => print(elmId)}
          >
            チケット印刷
          </button>
        </div>
      )}
      <Link
        to="/"
        className="mt-16 inline-block w-[15rem] rounded bg-gray-400 p-4 text-center font-bold text-white"
      >
        TOPに戻る
      </Link>
    </div>
  )
}
