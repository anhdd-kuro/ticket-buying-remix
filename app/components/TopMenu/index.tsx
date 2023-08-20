import { Link } from '@remix-run/react'

export const TopMenu = ({ prefix = '' }: { prefix?: string }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-16 p-32">
      <Link
        to={`${prefix}/movies`}
        className="w-[30rem] rounded-lg bg-gray-400 p-6 text-center text-2xl font-bold text-white"
      >
        チケット購入
      </Link>
      <Link
        to={`${prefix}/tickets`}
        className="w-[30rem] rounded-lg bg-blue-400 p-6 text-center text-2xl font-bold text-white"
      >
        チケット発券
      </Link>
    </div>
  )
}
