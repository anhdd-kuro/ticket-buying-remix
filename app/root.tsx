import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react'
import stylesheet from '~/tailwind.css'
import polarisStyles from '@shopify/polaris/build/esm/styles.css'
import { AppProvider } from '@shopify/polaris'

export const links = () => [
  { rel: 'stylesheet', href: stylesheet },
  { rel: 'stylesheet', href: polarisStyles },
]

export async function loader() {
  return {
    polarisTranslations: require('@shopify/polaris/locales/en.json'),
  }
}

export default function App() {
  const { polarisTranslations } = useLoaderData()

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <AppProvider i18n={polarisTranslations}>
          <Outlet />
        </AppProvider>
        <ScrollRestoration />
        <LiveReload />
        <Scripts />
      </body>
    </html>
  )
}
