import indexStyles from './style.css'
import { login } from '../../shopify.server'
import { TopMenu } from '~/components/TopMenu'
import { json, redirect } from '@remix-run/node'

export const links = () => [{ rel: 'stylesheet', href: indexStyles }]

export async function loader({ request }) {
  const url = new URL(request.url)

  if (url.searchParams.get('shop')) {
    throw redirect(`/app?${url.searchParams.toString()}`)
  }

  return json({ showForm: Boolean(login) })
}

export default function App() {
  return <TopMenu />
}
