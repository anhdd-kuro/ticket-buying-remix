import { Seat } from '../icons'
import { toggleCSSclasses } from '~/utils'
import { useTicketsStore } from '~/stores'
import { useCallback, useEffect } from 'react'
import type { Ticket } from '~/stores'

const selectedStyles = ['selected']

export const SeatsSelect = ({
  selectSeat,
  className,
}: {
  selectSeat?: (tickets: Ticket[]) => void
  className?: string
}) => {
  const tickets = useTicketsStore((state) => state.tickets)
  const toggleTicketBySeat = useTicketsStore(
    (state) => state.toggleTicketBySeat
  )

  const choseSeat = useCallback(
    (e: Event) => {
      console.log('chosed seat')
      console.log(e.target)

      const seat = e.currentTarget as HTMLElement
      const seatNumber = seat?.getAttribute('id')
      if (!seatNumber) {
        return
      }

      toggleTicketBySeat(seatNumber)
      toggleCSSclasses(seat, ...selectedStyles)
    },
    [toggleTicketBySeat]
  )

  useEffect(() => {
    const seatMap = document.querySelectorAll('#seatmap > g')
    seatMap.forEach((seat) => {
      seat.addEventListener('click', choseSeat)
    })
  }, [choseSeat])

  useEffect(() => {
    const selectedSeats = tickets.map((ticket) => ticket.seat)
    const seatMap = document.querySelectorAll('#seatmap > g')
    seatMap.forEach((seat) => {
      const seatNumber = seat?.getAttribute('id')
      if (!seatNumber) {
        return
      }
      if (selectedSeats.includes(seatNumber)) {
        seat.classList.add(...selectedStyles)
      }
    })

    selectSeat?.(tickets)
  }, [tickets, selectSeat])

  return <Seat className={className} />
}
