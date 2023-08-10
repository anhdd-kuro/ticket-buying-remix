import { json } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { shopifyFront } from '~/shopify.server'

export const loader = async ({ request }) => {
  const shop = request.headers.get('shop')

  const session = await sessionStorage.findSessionsByShop(shop)
  console.log(session)

  if (!session) return {}

  const client = new shopifyFront.clients.Rest({
    session: session[0],
  })

  // const { session, admin } = await authenticate.admin(request);
  const getResponse = await client.get({
    path: 'products',
  })
  console.log(getResponse.headers, getResponse.body)

  return json({
    data: getResponse.body,
  })
}

export default function () {
  const { movies } = useLoaderData()

  return (
    <div className="flex flex-wrap gap-4">
      {movies?.map((movie) => (
        <div key={movie.handle} className="w-1/4 relative hover:opacity-80">
          <Link
            to={`/shows/${movie.handle}`}
            className="absolute w-full h-full top-0 left-0"
          />
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
        </div>
      ))}
    </div>
  )
}
