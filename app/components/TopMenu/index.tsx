import { Link } from '@remix-run/react'

export const TopMenu = ({ prefix = '' }: { prefix?: string }) => {
  return (
    <div className="flex-center h-screen gap-12 p-16">
      <Link
        to={`${prefix}/tickets`}
        className="inline-flex h-56 w-96 items-center justify-center rounded-lg bg-black p-8"
      >
        <span className="text-center text-3xl font-bold leading-relaxed text-white">
          チケット
          <br />
          受け取る
        </span>
      </Link>
      <Link
        to={`${prefix}/order`}
        className="inline-flex h-56 w-96 items-center justify-center rounded-lg bg-red-400 p-8"
      >
        <span className="text-center text-3xl font-bold leading-relaxed text-white">
          チケットの購入
        </span>
      </Link>
    </div>
  )
}
