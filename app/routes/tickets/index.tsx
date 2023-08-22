import MovieTicket from '~/components/MovieTicket'
import { print } from '~/printer'
import { useCanvas } from '~/hooks'
import type { LoaderArgs } from '@remix-run/node'

export async function loader({}: LoaderArgs) {
  console.log(process.env)
  return {}
}

export default function () {
  const { elmRef } = useCanvas()

  return (
    <div>
      <div ref={elmRef} className="mx-auto w-[500px]">
        <MovieTicket />
      </div>
      <button
        id="print-button"
        className="mx-auto mt-4 block w-[20rem] bg-blue-500 p-4 text-white"
        onClick={print}
      >
        Print
      </button>
    </div>
  )
}
