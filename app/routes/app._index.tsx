import { json } from '@remix-run/node'
import { Page } from '@shopify/polaris'

import { authenticate } from '../shopify.server'
import { TopMenu } from '~/components/TopMenu'

export const loader = async ({ request }) => {
  const { session } = await authenticate.admin(request)

  return json({ shop: session.shop.replace('.myshopify.com', '') })
}

export async function action({ request }) {
  const { admin } = await authenticate.admin(request)

  const color = ['Red', 'Orange', 'Yellow', 'Green'][
    Math.floor(Math.random() * 4)
  ]
  const response = await admin.graphql(
    `#graphql
      mutation populateProduct($input: ProductInput!) {
        productCreate(input: $input) {
          product {
            id
            title
            handle
            status
            variants(first: 10) {
              edges {
                node {
                  id
                  price
                  barcode
                  createdAt
                }
              }
            }
          }
        }
      }`,
    {
      variables: {
        input: {
          title: `${color} Snowboard`,
          variants: [{ price: Math.random() * 100 }],
        },
      },
    }
  )

  const responseJson = await response.json()

  return json({
    product: responseJson.data.productCreate.product,
  })
}

export default function Index() {
  return (
    <Page>
      <TopMenu prefix="/app" />
    </Page>
  )
}
