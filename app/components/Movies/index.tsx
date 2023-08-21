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
    <div className="container mx-auto grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 p-8">
      {movies?.map((movie) => (
        <div key={movie.handle} className="relative hover:opacity-80">
          <Link to={`${location.pathname}/${movie.handle}`}>
            <div className="rounded-lg bg-white shadow-lg">
              <img
                className="h-48 w-full object-cover object-center"
                // @ts-ignore-next-line
                src={movie.thumbnail?.image.url || ''}
                alt={movie.thumbnail?.image.altText || movie.title}
              />
              <div className="p-4">
                <h2 className="mb-2 text-2xl font-bold text-gray-900">
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
