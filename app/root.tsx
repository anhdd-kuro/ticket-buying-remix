import {
  Link,
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
import { AppProvider as PolarisAppProvider } from '@shopify/polaris'
import type {
  LinkLikeComponent,
  LinkLikeComponentProps,
} from '@shopify/polaris/build/ts/src/utilities/link'
import { forwardRef } from 'react'
import { ExternalScripts } from 'remix-utils'

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
        <PolarisAppProvider
          i18n={polarisTranslations}
          linkComponent={RemixPolarisLink as LinkLikeComponent}
        >
          <Outlet />
        </PolarisAppProvider>
        <ScrollRestoration />
        <LiveReload />
        <ExternalScripts />
        <Scripts />
      </body>
    </html>
  )
}

const RemixPolarisLink = forwardRef<HTMLAnchorElement, LinkLikeComponentProps>(
  (props, ref) => (
    <Link {...props} to={props.url ?? props.to} ref={ref}>
      {props.children}
    </Link>
  )
)

export const handle = {
  scripts: () => [
    { src: '/StarWebPrintBuilder.js' },
    {
      src: '/StarWebPrintTrader.js',
    },
  ],
}
