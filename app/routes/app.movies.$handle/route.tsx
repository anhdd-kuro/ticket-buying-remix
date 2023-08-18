import { type LoaderArgs } from '@remix-run/node'
import { useOutletContext, useParams } from '@remix-run/react'
import type { MoviesContextData } from '../movies/route'
import Movie from '~/components/Movie'

export async function loader({ request }: LoaderArgs) {
  // const url = new URL(request.url)
  // const handle = url.searchParams.get('handle')

  return {}
}

export default function () {
  const { handle } = useParams()

  const { parsedData: movies } = useOutletContext<MoviesContextData>()

  const movieByHandle = movies?.find((movie) => movie.handle === handle)

  return <>{movieByHandle && <Movie movie={movieByHandle} />}</>
}
