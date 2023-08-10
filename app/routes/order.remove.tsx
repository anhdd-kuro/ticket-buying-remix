import { json, redirect } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'

import { shopifyApp } from '@shopify/shopify-app-remix'
import { authenticate, sessionStorage } from '~/shopify.server'
import { shopifyApi, LATEST_API_VERSION } from '@shopify/shopify-api'
import { restResources } from '@shopify/shopify-api/rest/admin/2023-07'

export async function loader({ request, response }) {
  const url = new URL(request.url)

  return {}
}

export const action = async ({ request }) => {
  try {
    if (request.method !== 'DELETE')
      return {
        status: 500,
        message: 'Invalid method',
      }

    console.log(request.headers, 'request.headers')

    const shop = request.headers.get('shop')
    console.log(shop, 'shop')
    if (!shop) {
      return {
        status: 500,
        message: 'Invalid shop',
      }
    }

    const orderId = request.headers.get('order-id')
    console.log(orderId, 'orderId')
    if (!orderId) {
      return {
        status: 500,
        message: 'Invalid orderId',
      }
    }

    // const { session, admin } = await authenticate.admin(request);
    // const result = await client.query({
    //   data: {
    //     query: DELETE_ORDER,
    //     variables: {
    //       input: {
    //         id: orderId,
    //       },
    //     },
    //   },
    // })

    // return json({
    //   data: result,
    // })
  } catch (error) {
    return {
      status: 500,
      error,
    }
  }
}

export default function App() {
  return <div className="index">Hello</div>
}

const DELETE_ORDER = `
mutation draftOrderDelete($input: DraftOrderDeleteInput!) {
  draftOrderDelete(input: $input) {
    deletedId
    userErrors {
      field
      message
    }
  }
}
`
