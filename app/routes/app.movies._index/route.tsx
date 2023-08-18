import type { LoaderArgs } from '@remix-run/node'
import { useOutletContext } from '@remix-run/react'
import Movies from '~/components/Movies'
import type { MoviesContextData } from '../movies/route'

export const loader = async ({ request }: LoaderArgs) => {
  return {}
}

export default function () {
  const { parsedData: movies } = useOutletContext<MoviesContextData>()

  return <div className="">{movies && <Movies movies={movies} />}</div>
}
