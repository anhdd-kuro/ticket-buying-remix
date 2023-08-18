import { Link } from '@remix-run/react'

export const TopMenu = ({ prefix = '' }: { prefix?: string }) => {
  return (
    <div className="p-32 flex flex-col justify-center items-center gap-16">
      <Link
        to={`${prefix}/movies`}
        className="p-6 w-[30rem] rounded-lg text-white bg-gray-400 text-center font-bold text-2xl"
      >
        チケット購入
      </Link>
      <Link
        to={`${prefix}/tickets`}
        className="p-6 w-[30rem] rounded-lg text-white bg-blue-400 text-center font-bold text-2xl"
      >
        チケット発券
      </Link>
    </div>
  )
}
