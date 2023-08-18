import { json } from '@remix-run/node'
import { Link, Outlet, useLoaderData, useRouteError } from '@remix-run/react'
import polarisStyles from '@shopify/polaris/build/esm/styles.css'
import { boundary } from '@shopify/shopify-app-remix'
import { authenticate } from '../../shopify.server'
export const links = () => [{ rel: 'stylesheet', href: polarisStyles }]

export async function loader({ request }) {
  await authenticate.admin(request)

  return json({
    polarisTranslations: require('@shopify/polaris/locales/en.json'),
    apiKey: process.env.SHOPIFY_API_KEY,
  })
}

export default function App() {
  const { apiKey } = useLoaderData()

  return (
    <>
      <script
        src="https://cdn.shopify.com/shopifycloud/app-bridge.js"
        data-api-key={apiKey}
      />
      <ui-nav-menu>
        <Link to="/app" rel="home">
          Home
        </Link>
        <Link to="/app/movies">チケット購入</Link>
        <Link to="/app/tickets">チケット発券</Link>
      </ui-nav-menu>
      <Outlet />
    </>
  )
}
// Shopify needs Remix to catch some thrown responses, so that their headers are included in the response.
export function ErrorBoundary() {
  return boundary.error(useRouteError())
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs)
}
