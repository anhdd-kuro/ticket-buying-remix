import { useMetaobjectParser } from '~/hooks'
import GET_MOVIES from '~/graphql/getMovies.gql'
import { Outlet, useLoaderData, useMatches } from '@remix-run/react'
import type { LoaderArgs } from '@remix-run/node'
import type { MetaobjectResult } from '~/hooks'
import type { Movie } from '~/components/Movies'

export type MoviesContextData = {
  data: MetaobjectResult
  parsedData: Movie[]
}

export const loader = async ({ request }: LoaderArgs) => {
  if (!process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN)
    return {
      data: null,
    }

  const apiResponse = await fetch(
    'https://krb-kuro.myshopify.com/admin/api/2023-07/graphql.json',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN,
      },
      body: JSON.stringify({ query: GET_MOVIES }),
    }
  )

  const resData: { data: MetaobjectResult } = await apiResponse.json()

  console.log(resData, 'apiResponse')

  return {
    data: resData.data,
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
