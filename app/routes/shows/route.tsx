import { json, redirect } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'

import { shopifyApp } from '@shopify/shopify-app-remix'
import { authenticate, sessionStorage, shopifyFront } from '~/shopify.server'
import { shopifyApi, LATEST_API_VERSION } from '@shopify/shopify-api'
import { restResources } from '@shopify/shopify-api/rest/admin/2023-07'

export async function loader({ request, response }) {
  const url = new URL(request.url)

  const session = await sessionStorage.findSessionsByShop(
    'krb-kuro.myshopify.com'
  )
  console.log(session)

  if (!session) return {}

  const client = new shopifyFront.clients.Rest({
    session: session[0],
  })

  // const { session, admin } = await authenticate.admin(request);
  const getResponse = await client.get({
    path: 'products',
  })
  console.log(getResponse.headers, getResponse.body)

  return json({
    data: getResponse.body,
  })
}

export const action = async ({ request, response }) => {
  const session = await sessionStorage.findSessionsByShop(
    'krb-kuro.myshopify.com'
  )

  if (!session) return {}

  const client = new shopifyFront.clients.Graphql({
    session: session[0],
  })

  // const { session, admin } = await authenticate.admin(request);
  const draftOrderResult = await client.query({
    data: {
      query: DRAFT_ORDER,
      variables: {
        input: {
          billingAddress: {
            address1: '',
            address2: '',
            city: '',
            company: '',
            firstName: '',
            lastName: '',
            phone: '',
            provinceCode: '',
            zip: '',
          },
          customAttributes: [],
          email: 'dad.duong@karabiner.tech',
          lineItems: [
            {
              customAttributes: [
                {
                  key: 'seat',
                  value: 'I-4',
                },
              ],
              originalUnitPrice: '1600',
              quantity: 1,
              taxable: true,
              title: '',
              variantId: 'gid://shopify/ProductVariant/45434001588498',
            },
          ],
          note: 'Test',
          phone: '',
          tags: [''],
          taxExempt: true,
          useCustomerDefaultAddress: true,
          visibleToCustomer: true,
        },
      },
    },
  })

  return json({
    data: draftOrderResult,
  })
}

export default function App() {
  //https://github.com/Shopify/shopify-api-js/blob/main/docs/reference/clients/Rest.md
  const { data } = useLoaderData()
  console.log(data.products)
  console.log(data.draftOrderResult)

  return (
    <div className="index">
      <Form action="/shows" method="POST" className="mb-4">
        <button className="p-2 border rounded" type="submit">
          Create Draft Order ( 下書き注文を作成 )
        </button>
      </Form>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data?.products?.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg overflow-hidden shadow-md"
          >
            {/* <a href={`/shows/${product.handle}`}></a> */}
            <img
              src={product.image ? product.image.src : ''}
              alt={product.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 text-gray-600">
              <h2 className="text-lg font-medium mb-2">{product.title}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const DRAFT_ORDER = `
mutation draftOrderCreate($input: DraftOrderInput!) {
  draftOrderCreate(input: $input) {
    draftOrder {
      id
      totalPrice
      subtotalPrice
      customer {
        id
        email
      }
    }
    userErrors {
      field
      message
    }
  }
}
`
