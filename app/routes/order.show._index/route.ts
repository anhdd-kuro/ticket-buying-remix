import type { LoaderArgs } from '@remix-run/node'

export async function loader({ request }: LoaderArgs) {
  const query = new URL(request.url).searchParams.get('query')
  console.log('Query', query)

  return {}
}
