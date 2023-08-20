import MovieTicket from '~/components/MovieTicket'
import { print } from '~/printer'
import html2canvas from 'html2canvas'
import { useEffect, useRef } from 'react'

export default function () {
  const receiptRef = useRef(null)

  useEffect(() => {
    if (!receiptRef.current) return

    html2canvas(receiptRef.current, {
      backgroundColor: '#fff',
      useCORS: true,
    }).then((canvas) => {
      canvas.setAttribute('id', 'receipt-canvas')
      console.log(canvas.style)

      const existingCanvas = document.getElementById('receipt-canvas')
      if (!existingCanvas) {
        document.body.appendChild(canvas)
      } else {
        document.body.replaceChild(canvas, existingCanvas)
      }
    })
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
