import { Seat, Seat1 } from '~/components/icons'
import { useCallback, useEffect, useState } from 'react'
import { Button, Modal } from '@shopify/polaris'
import { toast } from 'react-toastify'
import { createPortal } from 'react-dom'
import clsx from 'clsx'

export default function Screen({ id = 1 }: { id?: number }) {
  const [openModal, setOpenModal] = useState(false)

  const [selectedSeats, setSelectedSeats] = useState<string[]>([])

  const [unavailableSeats, setUnavailableSeats] = useState<string[]>([])

  useEffect(() => {
    const seats = document.querySelectorAll('#seatmap > g')

    seats.forEach((seat) => {
      const seatId = seat.getAttribute('id')

      seat.addEventListener('click', () => {
        if (!seatId) return
        setSelectedSeats((cur) => {
          if (!cur.includes(seatId)) return [...cur, seatId]
          return cur.filter((selectedSeat) => selectedSeat !== seatId)
        })
      })
    })
  }, [])

  useEffect(() => {
    const seats = document.querySelectorAll('#seatmap > g')

    seats.forEach((seat) => {
      const seatId = seat.getAttribute('id') || ''

      if (selectedSeats.includes(seatId)) {
        seat.classList.add('selected')
      } else {
        seat.classList.remove('selected')
      }

      if (unavailableSeats.includes(seatId)) {
        seat.classList.add('unavailable')
      } else {
        seat.classList.remove('unavailable')
      }
    })
  }, [selectedSeats, unavailableSeats])

  const handleFormSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const formData = new FormData(e.currentTarget)
      const data = Object.fromEntries(formData.entries())
      const status = data['status']

      if (status === 'unavailable') {
        setUnavailableSeats((cur) =>
          Array.from(new Set([...cur, ...selectedSeats]))
        )
      }
      if (status === 'available') {
        setUnavailableSeats((cur) =>
          cur.filter((seat) => !selectedSeats.includes(seat))
        )
      }
      setOpenModal(false)
      toast.success('状態を更新しました')
    },
    [selectedSeats]
  )

  const parentModal = document.querySelector('.Polaris-Modal-Dialog__Modal')

  return (
    <div className="flex-center flex-col">
      {id === 1 && <Seat1 className="flex-center screenImg" />}
      {id !== 1 && <Seat className="flex-center screenImg" />}
      {selectedSeats.length > 0 &&
        createPortal(
          <div
            className={clsx(
              'bottom-4 right-6',
              parentModal ? 'absolute' : 'fixed'
            )}
          >
            <Button onClick={() => setOpenModal(true)}>一括編集</Button>
          </div>,
          parentModal || document.body
        )}
      {createPortal(
        <Modal
          open={openModal}
          onClose={() => setOpenModal(false)}
          title="一括編集"
        >
          <Modal.Section>
            <form className="space-y-6" onSubmit={handleFormSubmit}>
              <div className="flex flex-col gap-2">
                <label className="font-bold" htmlFor="status">
                  状態:
                </label>
                <select
                  name="status"
                  id="status"
                  className="w-1/3 rounded-md border border-gray-300 p-2"
                >
                  <option value="unavailable">販売不可</option>
                  <option value="available">販売可</option>
                </select>
              </div>
              <button className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
                確認
              </button>
            </form>
          </Modal.Section>
        </Modal>,
        document.body
      )}
    </div>
  )
}
