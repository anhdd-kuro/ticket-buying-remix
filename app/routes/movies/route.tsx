import { useMetaobjectParser } from '~/hooks'
import GET_MOVIES from '~/graphql/getMoviesWithProducts.gql'
import { fetchGqlAdmin } from '~/utils'
import { Outlet, useLoaderData, useMatches } from '@remix-run/react'
import type { LoaderArgs } from '@remix-run/node'
import type { MetaobjectResult } from '~/hooks'
import type { Movie } from '~/components/Movies'

export type MoviesContextData = {
  data: MetaobjectResult
  parsedData: Movie[]
}

export const loader = async ({ request }: LoaderArgs) => {
  const data = await fetchGqlAdmin<MetaobjectResult>(GET_MOVIES)

  return {
    data,
  }
}

export default function () {
  const movies = useMatches()

  // const currentMovie = movies?.find((movie) => movie.handle === handle)
  console.log(movies)

  const { data } = useLoaderData<typeof loader>()
  const { parsedData } = useMetaobjectParser<Movie>({
    data,
    referenceKeys: ['thumbnail'],
    listReferencesKeys: ['products', 'genre'],
  })

  console.log(data)

  return (
    <>
      <Outlet context={{ data, parsedData } as MoviesContextData} />
    </>
  )
}
