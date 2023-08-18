import { Link, useLocation } from '@remix-run/react'

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

type Props = {
  movies: Movie[]
}

export default function Movies({ movies }: Props) {
  const location = useLocation()
  console.log(location)

  return (
    <div className="flex flex-wrap gap-4 container mx-auto p-8">
      {movies?.map((movie) => (
        <div key={movie.handle} className="w-1/4 relative hover:opacity-80">
          <Link to={`${location.pathname}/${movie.handle}`}>
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
