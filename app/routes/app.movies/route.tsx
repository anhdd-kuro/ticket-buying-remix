import type { LoaderArgs } from '@remix-run/node'
import { Outlet, useLoaderData, useMatches } from '@remix-run/react'
import type { MetaobjectResult } from '~/hooks'
import { useMetaobjectParser } from '~/hooks'
import GET_MOVIES from '~/graphql/getMovies.gql'
import type { Movie } from '~/components/Movies'
import { authenticate } from '~/shopify.server'

export type MoviesContextData = {
  data: MetaobjectResult
  parsedData: Movie[]
}

export const loader = async ({ request }: LoaderArgs) => {
  const { admin } = await authenticate.admin(request)

  const apiResponse = await admin.graphql(GET_MOVIES, {})

  const resData: { data: MetaobjectResult } = await apiResponse.json()
  console.log(
    `🚀 ------------------------------------------------------------🚀`
  )
  console.log(`🚀 \n - file: route.tsx:20 \n - loader \n - resData:`, resData)
  console.log(
    `🚀 ------------------------------------------------------------🚀`
  )

  return {
    data: resData.data,
  }
}

export default function () {
  const movies = useMatches()

  // const currentMovie = movies?.find((movie) => movie.handle === handle)
  console.log(movies)
  console.log(`🚀 ----------------------------------------------🚀`)
  console.log(`🚀 \n - file: route.tsx:38 \n - movies:`, movies)
  console.log(`🚀 ----------------------------------------------🚀`)

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
