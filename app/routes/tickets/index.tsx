import html2canvas from 'html2canvas'
import { useEffect, useRef } from 'react'

export default function () {
  const receiptRef = useRef(null)

  useEffect(() => {
    if (!receiptRef.current) return

    html2canvas(receiptRef.current).then((canvas) => {
      canvas.setAttribute('id', 'receipt-canvas')
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
      <div ref={receiptRef}>Test</div>

      <button id="print-button">Print</button>

      <div id="overlay" style={{ display: 'none' }}>
        <div id="nowPrintingWrapper">
          <section id="nowPrinting">
            <h1>Now Printing</h1>
          </section>
        </div>
        <div id="nowLoadingWrapper">
          <section id="nowLoading">
            <h1>Now Loading</h1>
          </section>
        </div>
      </div>
    </div>
  )
}
