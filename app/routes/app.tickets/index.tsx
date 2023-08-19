import html2canvas from 'html2canvas'
import { useEffect, useRef } from 'react'
import MovieTicket from '~/components/MovieTicket'
import { print } from '~/printer'

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
      <div ref={receiptRef} className="w-[500px] mx-auto">
        <MovieTicket />
      </div>
      <button
        id="print-button"
        className="block p-4 w-[20rem] bg-blue-500 mx-auto text-white mt-4"
        onClick={print}
      >
        Print
      </button>
    </div>
  )
}
