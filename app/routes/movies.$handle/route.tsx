import type { LoaderArgs } from '@remix-run/node'
import { useLoaderData, useRouteLoaderData } from '@remix-run/react'

export async function loader({ request }: LoaderArgs) {
  // const url = new URL(request.url)
  // const handle = url.searchParams.get('handle')

  // const session = await sessionStorage.findSessionsByShop(
  //   'krb-kuro.myshopify.com'
  // )
  // console.log(session)

  // if (!session)
  //   return {
  //     data: null,
  //   }

  // const client = new shopifyFront.clients.Graphql({
  //   session: session[0],
  // })

  // const movies = useRouteLoaderData('movies')

  // const { session, admin } = await authenticate.admin(request);
  // const getResponse = await client.query<{ data: MetaobjectResult }>({
  //   data: {
  //     query: GET_MOVIES,
  //   },
  // })
  // console.log(getResponse.headers, getResponse.body)

  return {}
}

export default function () {
  console.log('rendering movie')
  // const { handle } = useLoaderData<typeof loader>()
  // const movies = useRouteLoaderData('movies')
  // const currentMovie = movies.find((movie) => movie.handle === handle)

  return (
    <div>
      <h1>Hello</h1>
      {/* <h1>{currentMovie.title}</h1> */}
    </div>
  )
}
