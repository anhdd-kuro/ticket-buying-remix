import type { LoaderArgs } from '@remix-run/node'
import { useLoaderData, useParams, useRouteLoaderData } from '@remix-run/react'

export async function loader({ request }: LoaderArgs) {
  // const url = new URL(request.url)
  // const handle = url.searchParams.get('handle')

  return {}
}

export default function () {
  console.log('rendering movie')
  const { handle } = useParams()

  const movies = useRouteLoaderData('routes/movies._index/route')

  const currentMovie = movies?.find((movie) => movie.handle === handle)

  return (
    <div>
      <h1>{currentMovie?.title}</h1>
      <h2>{handle}</h2>
    </div>
  )
}
