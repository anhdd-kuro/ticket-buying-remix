import type { LoaderArgs } from '@remix-run/node'
import { Outlet, useLoaderData, useMatches } from '@remix-run/react'
import type { MetaobjectResult } from '~/hooks'
import { useMetaobjectParser } from '~/hooks'

export type Movie = {
  id: string
  handle: string
  title: string
  description: string
  releaseDate: string
  publication_end_date: string
  original_title: string
  original_showtime_year: string
  country_of_production: string
  lens: string
  rated: string
  length: string
  director: string
  stars: string
  thumbnail: {
    image: {
      url: string
      altText: string
    }
  }
  products: {
    nodes: {
      id: string
      title: string
      handle: string
      metaData: {
        key: string
        value: string
      }
      variants: {
        nodes: {
          id: string
          title: string
          price?: string
        }[]
      }
    }[]
  }
}

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

const GET_MOVIES = `
query getMovies {
  metaobjects(first: 10, type: "movies") {
    nodes {
      handle
      id
      fields {
        key
        value
        references(first: 10) {
          nodes {
            ... on Product {
              id
              title
              handle
              metaData: metafield(key: "meta_data", namespace: "custom") {
                key
                value
              }
              variants: variants(first: 5) {
                nodes {
                  id
                  title
                  price
                }
              }
            }
            ... on Metaobject {
              handle
              id
              fields {
                key
                value
              }
            }
          }
        }
        reference {
          ... on MediaImage {
            image {
              altText
              url
            }
          }
        }
      }
    }
  }
}
`
