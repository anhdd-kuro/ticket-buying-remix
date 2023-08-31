import html2canvas from 'html2canvas'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

const TicketPrint = ({
  movie,
  orderId,
  price,
  seat,
  variantTitle,
  rate,
  screen,
  end,
  start,
  now,
  tenMinutesFromNow,
}: {
  seat: string
  orderId: string
  price: string
  variantTitle: string
  movie: string
  rate: string
  screen: string
  start: string
  end: string
  now: string
  tenMinutesFromNow: string
}) => {
  const isClientSide = typeof window !== 'undefined'

  const componentRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!isClientSide) return
    if (!componentRef.current) return

    componentRef.current.style.transform = `scale(${
      // 576 / componentRef.current.clientWidth
      // Ipad
      1.4
    })`

    html2canvas(componentRef.current, {
      scrollX: -window.scrollX,
      scrollY: -window.scrollY,
      windowWidth: document.documentElement.offsetWidth,
      windowHeight: document.documentElement.offsetHeight,
    }).then((canvas) => {
      canvas.style.display = 'none'
      const id = `${orderId}_${seat}`
      canvas.setAttribute('id', id)
      canvas.setAttribute('data-selector', 'ticket-canvas')

      const existingCanvas = document.getElementById(id)
      if (!existingCanvas) {
        document.body.appendChild(canvas)
      } else {
        document.body.replaceChild(canvas, existingCanvas)
      }
    })
  }, [orderId, seat, isClientSide, price])

  return (
    <div
      ref={componentRef}
      className="absolute left-[-9999px] top-[-9999px] inline-flex flex-col gap-2 bg-white px-5 py-4 leading-none"
    >
      <div className="flex flex-col items-start justify-start gap-1 self-stretch">
        <div>
          <span className="font-bold">{tenMinutesFromNow}</span>
          <span className="text-[10px] font-medium">
            までに窓口でお支払いください。
          </span>
        </div>
        <div className="text-xs font-medium">注文番号：{orderId}</div>
      </div>
      <hr className="h-px border border-zinc-600" />
      <div className="flex flex-col items-end justify-start gap-1.5 self-stretch [&>*]:w-full">
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold leading-none">KBCシネマ</p>
          <p className="box-border rounded border border-black p-1 font-bold">
            未払い
          </p>
        </div>
        <div className="rounded bg-black p-1">
          <div className="flex items-center justify-start gap-2 text-xs">
            <p className="font-bold text-white">{movie}</p>
            <p className="rounded-sm border bg-white p-[2px] leading-none text-black">
              {rate}
            </p>
          </div>
          <div className="mt-1 text-xs font-bold text-white">
            舞台挨拶付き (13:00〜)
          </div>
        </div>
        <div className="flex flex-col text-xs font-bold [&>*]:w-full">
          <div className="border border-neutral-400 px-4 py-1 text-center">
            8/22(火) 　 {start}〜{end}
          </div>
          <div className="flex text-center">
            <p className="w-2/3 border border-neutral-400 p-1 font-bold">
              {screen}
            </p>
            <p className="flex-1 border border-neutral-400 p-1 font-bold">
              {seat}
            </p>
          </div>
        </div>
        <div className="flex w-full justify-between text-xs font-bold">
          <span>{variantTitle}</span>
          <span>{price}</span>
        </div>
        <div className="text-right text-[10px] font-medium">
          発行日時：
          {now}
        </div>
      </div>
    </div>
  )
}

export default TicketPrint
