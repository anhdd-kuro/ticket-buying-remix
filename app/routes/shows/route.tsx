import { json, redirect } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'
import { useRef, useState } from 'react'
import { Modal, AppProvider as PolarisAppProvider } from '@shopify/polaris'

export async function loader({ request, response }) {
  return {
    data: {
      products: [],
      draftOrderResult: {},
    },
  }
}

export const action = async ({ request, response }) => {
  const { email } = await request.body

  const apiResponse = await fetch(
    'https://krb-kuro.myshopify.com/admin/api/2023-07/graphql.json',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token':
          process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN || '',
      },
      body: JSON.stringify({
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
            email: email || 'dad.duong@karabiner.tech',
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
      }),
    }
  )

  if (!apiResponse.ok) {
    return json({
      data: {
        error: 'Something went wrong',
      },
    })
  }

  // const { session, admin } = await authenticate.admin(request);
  const draftOrderResult = await apiResponse.json()
  console.log(draftOrderResult, 'draftOrderResult')
  const orderName = draftOrderResult?.data?.draftOrderCreate?.draftOrder?.name
  console.log(orderName, 'orderName')

  return redirect('/order/complete', {
    headers: {
      'order-name': orderName,
    },
  })
}

export default function App() {
  //https://github.com/Shopify/shopify-api-js/blob/main/docs/reference/clients/Rest.md
  const { data } = useLoaderData()
  console.log(data.products)
  console.log(data.draftOrderResult)

  const formRef = useRef<HTMLFormElement>(null)

  const [email, setEmail] = useState('')
  const [openModal, setOpenModal] = useState(false)

  return (
    <PolarisAppProvider i18n={require('@shopify/polaris/locales/en.json')}>
      <div className="index">
        <Form ref={formRef} action="/shows" method="POST" className="mb-4">
          <input value={email} hidden name="email" />
        </Form>
        <button
          className="rounded border bg-[#626367] p-2 text-white"
          onClick={() => setOpenModal(true)}
        >
          {/* Create Draft Order ( 下書き注文を作成 ) */}
          購入確定
        </button>
        <Modal
          open={openModal}
          title="購入確認"
          onClose={() => setOpenModal(false)}
        >
          <Modal.Section>
            <div className="flex flex-col items-center justify-center gap-y-4">
              <p className="text-center text-xl">
                同時に会員登録しますか <br />
                <span className="text-sm">
                  *購入後に登録の招待メールをお送りいたします
                </span>
              </p>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
                placeholder="xxx@yyy.com"
                className="w-full rounded border p-2"
              />
              <button
                onClick={() => formRef.current?.submit()}
                className="rounded border p-2 disabled:opacity-50"
                disabled={!email}
              >
                入力したメールで購入する
              </button>
              <button
                onClick={() => formRef.current?.submit()}
                className="rounded border p-2"
              >
                登録せずに購入する
              </button>
            </div>
          </Modal.Section>
        </Modal>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data?.products?.map((product) => (
            <div
              key={product.id}
              className="overflow-hidden rounded-lg bg-white shadow-md"
            >
              {/* <a href={`/shows/${product.handle}`}></a> */}
              <img
                src={product.image ? product.image.src : ''}
                alt={product.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-4 text-gray-600">
                <h2 className="mb-2 text-lg font-medium">{product.title}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PolarisAppProvider>
  )
}

const DRAFT_ORDER = `
mutation draftOrderCreate($input: DraftOrderInput!) {
  draftOrderCreate(input: $input) {
    draftOrder {
      id
      totalPrice
      subtotalPrice
      name
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
