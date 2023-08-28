import { range } from '~/utils'
import { useRef, useState } from 'react'
import { Form, Link } from '@remix-run/react'

export async function loader() {
  console.log(process.env)
  return {}
}

export default function () {
  const orderIdRef = useRef<HTMLInputElement>(null)
  const emailOrPhoneRef = useRef<HTMLInputElement>(null)
  const [selectedElm, setSelectedElm] = useState<string>('')

  const handleSelect = (e: React.MouseEvent<HTMLInputElement>) => {
    orderIdRef.current?.classList.remove('border-2', 'border-gray-500')
    emailOrPhoneRef.current?.classList.remove('border-2', 'border-gray-500')

    const elm = e.currentTarget
    elm.classList.add('border-2', 'border-gray-500')
    setSelectedElm(elm.id)
  }

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const elm = e.currentTarget
    if (selectedElm === 'orderId' && orderIdRef.current) {
      if (orderIdRef.current.value) orderIdRef.current.value += elm.textContent
      else orderIdRef.current.value = elm.textContent || ''
      return
    }

    if (selectedElm === 'emailOrPhone' && emailOrPhoneRef.current) {
      if (emailOrPhoneRef.current.value)
        emailOrPhoneRef.current.value += elm.textContent
      else emailOrPhoneRef.current.value = elm.textContent || ''
    }
  }

  const removeLastChar = () => {
    if (selectedElm === 'orderId' && orderIdRef.current) {
      orderIdRef.current.value = orderIdRef.current.value.slice(0, -1)
      return
    }

    if (selectedElm === 'emailOrPhone' && emailOrPhoneRef.current) {
      emailOrPhoneRef.current.value = emailOrPhoneRef.current.value.slice(0, -1)
    }
  }

  return (
    <div className="p-16">
      <Form
        action="/tickets/print"
        method="get"
        className="mx-auto flex w-[500px] flex-col gap-4"
      >
        <label className="flex items-center font-bold">
          <span className="flex-1">注文番号</span>
          <input
            id="orderId"
            type="text"
            ref={orderIdRef}
            readOnly
            className="ml-2 w-3/4 rounded p-2 focus:outline-none"
            onClick={handleSelect}
            name="orderId"
            defaultValue={'5439692865810'}
          />
        </label>
        <label className="flex items-center font-bold">
          <span className="flex-1">電話番号</span>
          <input
            ref={emailOrPhoneRef}
            id="emailOrPhone"
            type="text"
            readOnly
            className="ml-2 w-3/4 rounded p-2 focus:outline-none"
            onClick={handleSelect}
            name="emailOrPhone"
            defaultValue={'dad.duong+@karabiner.tech'}
          />
        </label>
        {/* <MovieTicket /> */}
        <div className="mx-auto mt-8 flex h-72 w-72 flex-wrap items-start justify-center gap-5">
          {range(0, 9).map((i) => (
            <button
              className="flex h-14 w-20 items-center justify-center gap-2.5 rounded-lg bg-zinc-300 py-5"
              key={i}
              onClick={handleButtonClick}
              type="button"
            >
              <span className="text-center text-4xl font-normal text-black">
                {i}
              </span>
            </button>
          ))}
          <button
            className="flex h-14 w-44 items-center justify-center gap-2.5 rounded-lg bg-zinc-300 py-5"
            onClick={removeLastChar}
            type="button"
          >
            <span className="text-center text-3xl font-normal text-black">
              1文字削除
            </span>
          </button>
        </div>
        <button
          id="print-button"
          className="mx-auto mt-8 block w-[20rem] rounded bg-gray-500 p-4 text-white"
          type="submit"
        >
          次へ
        </button>
      </Form>
      <Link
        to="/"
        className="mt-16 inline-block w-[15rem] rounded bg-gray-400 p-4 text-center font-bold text-white"
      >
        TOPに戻る
      </Link>
    </div>
  )
}
