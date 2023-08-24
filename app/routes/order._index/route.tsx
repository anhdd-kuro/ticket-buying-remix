import { dayNumToJapanese, range } from '~/utils'
import { Link } from '@remix-run/react'
import clsx from 'clsx'

export default function () {
  const fiveDaysFromNowArray = Array.from(Array(5).keys()).map((i) => {
    const date = new Date()
    date.setDate(date.getDate() + i)
    return date
  })

  return (
    <div className="flex h-full flex-col p-1">
      <ol className="flex justify-center gap-1">
        {fiveDaysFromNowArray.map((date, index) => (
          <li
            key={date.toDateString()}
            className={clsx(
              'flex-1 rounded border px-5 py-3 text-center leading-relaxed ',
              index === 0 ? 'bg-black text-white ' : 'border-black'
            )}
          >
            <p className="text-xl font-bold">
              {date.getMonth() + 1}/{date.getDate()}
              {`(${dayNumToJapanese(date.getDay())})`}
            </p>
            <p
              className={clsx(
                'text-sm font-bold ',
                index === 0 && 'text-yellow-300'
              )}
            >
              シネマ会員デー
            </p>
          </li>
        ))}
      </ol>
      <ul className="mt-4 flex flex-wrap">
        {range(1, 6).map((i) => (
          <li key={i} className="flex w-1/2 divide-x border">
            <div className="w-1/5 p-2">
              <img
                className="h-full w-full object-cover"
                src="https://via.placeholder.com/240x360"
                alt=""
              />
            </div>
            <div className="flex flex-1 flex-col divide-y">
              <div className="p-2 text-xl leading-none">
                <h1 className="font-bold">
                  シモーヌ フランスに最も愛された政治家
                </h1>
              </div>
              <ol className="flex flex-1 divide-x">
                <li className="flex flex-1 flex-col">
                  <p className="p-1 text-center">
                    <span className="text-lg font-bold">10:10</span>
                    <br />
                    <span className="text-sm">~12:10</span>
                  </p>
                  <p className="p-1 text-center text-sm">招待券利用不可</p>
                  <div className="mb-0 mt-auto px-1 pb-1">
                    <button className="block w-full rounded bg-black py-2 text-sm font-bold text-white">
                      ◎ 購入
                    </button>
                  </div>
                </li>
                <li className="flex-1"></li>
                <li className="flex-1"></li>
                <li className="flex-1"></li>
                <li className="flex-1"></li>
              </ol>
            </div>
          </li>
        ))}
      </ul>
      <div className="mb-0 mt-auto flex font-bold">
        <Link to="/" className="rounded bg-black px-6 py-3 text-xl text-white">
          はじめから
        </Link>
        <div className="ml-auto mr-0 flex items-center gap-2">
          <button className="flex-center gap-4 rounded bg-black px-6 py-3 text-xl text-white ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="24"
              viewBox="0 0 14 24"
              fill="none"
              className="rotate-180"
            >
              <path
                d="M3.31738 2.45215L12.2929 11.4277C12.6834 11.8182 12.6834 12.4513 12.2929 12.8419L3.31738 21.8174"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            前の作品
          </button>
          {range(1, 3).map((i) => (
            <button
              key={i}
              className={clsx(
                'flex-center ¥¥ h-10 w-10 gap-4 rounded border text-lg leading-none ',
                i === 1 && 'bg-black text-white'
              )}
            >
              {i}
            </button>
          ))}

          <button className="flex-center gap-4 rounded bg-black px-6 py-3 text-xl text-white">
            次の作品
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="24"
              viewBox="0 0 14 24"
              fill="none"
            >
              <path
                d="M3.31738 2.45215L12.2929 11.4277C12.6834 11.8182 12.6834 12.4513 12.2929 12.8419L3.31738 21.8174"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
