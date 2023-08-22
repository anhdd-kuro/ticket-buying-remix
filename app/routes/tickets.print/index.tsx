import { json, redirect } from '@remix-run/node'

export async function loader({ request }) {
  // get form data in remix
  const formData = new URL(request.url).searchParams
  // get emailOrPhone and orderId from form data
  const emailOrPhone = formData.get('emailOrPhone')
  const orderId = formData.get('orderId')

  if (!emailOrPhone || !orderId) {
    return redirect('/tickets', {})
  }

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

  // if (orderResponse.status !== 200) {
  //   return redirect('/tickets', {})
  // }

  const orderParse = await orderResponse.json()
  const orderData = orderParse.order
  console.log('orderData', orderData)

  return {
    order: orderData,
  }
}

export default function () {
  return <div className="p-16"></div>
}
