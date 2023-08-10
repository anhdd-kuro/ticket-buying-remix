import { json } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { sessionStorage, shopifyFront } from '~/shopify.server'
import { useMetaobjectParser } from '../hooks'

type Movie = {
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
    }[]
  }
}

export const loader = async ({ request }) => {
  const session = await sessionStorage.findSessionsByShop(
    'krb-kuro.myshopify.com'
  )
  console.log(session)

  if (!session) return {}

  const client = new shopifyFront.clients.Graphql({
    session: session[0],
  })

  // const { session, admin } = await authenticate.admin(request);
  const getResponse = await client.query({
    data: {
      query: GET_MOVIES,
    },
  })
  console.log(getResponse.headers, getResponse.body)

  return json({
    data: getResponse.body,
  })
}

export default function () {
  const { movies } = useLoaderData()
  const { parsedData } = useMetaobjectParser<Movie>({
    data: movies,
    referenceKeys: ['thumbnail'],
    listReferencesKeys: ['products', 'genre'],
  })

  return (
    <div className="flex flex-wrap gap-4">
      {parsedData?.map((movie) => (
        <div key={movie.handle} className="w-1/4 relative hover:opacity-80">
          <Link
            to={`/shows/${movie.handle}`}
            className="absolute w-full h-full top-0 left-0"
          >
            <div className="bg-white rounded-lg shadow-lg">
              <img
                className="w-full h-48 object-cover object-center"
                // @ts-ignore-next-line
                src={movie.thumbnail?.image.url || ''}
                alt={movie.thumbnail?.image.altText || movie.title}
              />
              <div className="p-4">
                <h2 className="text-gray-900 font-bold text-2xl mb-2">
                  {movie.title}
                </h2>
                {/* <div dangerouslySetInnerHTML={{ __html: movie.description }} /> */}
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  )
}

const GET_MOVIES = `
query getMovies {
  metaobjects(first: 20, type: "movies") {
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
