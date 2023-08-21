import MovieTicket from '~/components/MovieTicket'
import { print } from '~/printer'
import html2canvas from 'html2canvas'
import { useEffect, useRef } from 'react'
import type { LoaderArgs } from '@remix-run/node'

export async function loader({}: LoaderArgs) {
  console.log(process.env)
  return {}
}

export default function () {
  const receiptRef = useRef(null)

  useEffect(() => {
    if (!receiptRef.current) return

    html2canvas(receiptRef.current, {
      backgroundColor: '#fff',
      useCORS: true,
    }).then((canvas) => {
      canvas.setAttribute('id', 'receipt-canvas')
      canvas.style.display = 'none'
      console.log(canvas.style)

      const existingCanvas = document.getElementById('receipt-canvas')
      if (!existingCanvas) {
        document.body.appendChild(canvas)
      } else {
        document.body.replaceChild(canvas, existingCanvas)
      }
    })
  }, [])

  useEffect(() => {
    // code
    const script = document.createElement('script')
    script.src = '/StarWebPrintTrader.js'
    document.body.appendChild(script)
  }, [])

  return (
    <div>
      <div ref={receiptRef} className="mx-auto w-[500px]">
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
