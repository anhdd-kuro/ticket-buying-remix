import stylesheet from '~/tailwind.css'
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
import { AppProvider as PolarisAppProvider } from '@shopify/polaris'
import { forwardRef } from 'react'
import { ExternalScripts } from 'remix-utils'
import { json } from '@remix-run/node'
import tooltipStyles from 'react-tooltip/dist/react-tooltip.css'
import calendarDnDStyles from 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import calendarStyles from 'react-big-calendar/lib/css/react-big-calendar.css'
import polarisStyles from '@shopify/polaris/build/esm/styles.css'
import type {
  LinkLikeComponent,
  LinkLikeComponentProps,
} from '@shopify/polaris/build/ts/src/utilities/link'
import type { LoaderArgs } from '@remix-run/node'

export const links = () => [
  { rel: 'stylesheet', href: stylesheet },
  { rel: 'stylesheet', href: polarisStyles },
  { rel: 'stylesheet', href: tooltipStyles },
  { rel: 'stylesheet', href: calendarDnDStyles },
  { rel: 'stylesheet', href: calendarStyles },
]

// const isAuthorized = (request: Request) => {
//   const header = request.headers.get('Authorization')
//   if (!header) return false
//   const base64 = header.replace('Basic ', '')
//   const [username, password] = Buffer.from(base64, 'base64')
//     .toString()
//     .split(':')
//   return username === 'admin' && password === 'password'
// }

export async function loader({ request }: LoaderArgs) {
  const polarisTranslations = await require('@shopify/polaris/locales/en.json')
  if (request.url.includes('app'))
    return json({
      authorized: true,
      polarisTranslations,
    })

  return json({
    polarisTranslations,
  })

  // if (isAuthorized(request)) {
  //   return json({
  //     authorized: true,
  //     polarisTranslations,
  //   })
  // } else {
  //   return json({ authorized: false, polarisTranslations }, { status: 401 })
  // }
}

export default function App() {
  const { polarisTranslations } = useLoaderData<typeof loader>()
  // if (!authorized) {
  //   return <>Authorization Required</>
  // }

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
