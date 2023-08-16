import { create } from 'zustand'

interface Ticket {
  seat: string
  type?: string
  price?: number
}

export const useTicketsStore = create<{
  tickets: Ticket[]
  getTicketIndexBySeat: (seat: string) => number
  toggleTicketBySeat: (seat: string) => void
  modifyTicket: (seat: string, type: string, price?: number) => void
  isAllTicketsSet: () => boolean
}>((set, get) => ({
  tickets: [] as Ticket[],
  getTicketIndexBySeat: (seat: string) => {
    return get().tickets.findIndex((ticket) => ticket.seat === seat)
  },
  toggleTicketBySeat: (seat: string) => {
    const ticketIndex = get().getTicketIndexBySeat(seat)
    if (ticketIndex === -1) {
      set({
        tickets: [...get().tickets, { seat }],
      })
    } else {
      set({
        tickets: get().tickets.filter((ticket) => ticket.seat !== seat),
      })
    }
  },
  modifyTicket: (seat: string, type: string, price?: number) => {
    const ticketIndex = get().getTicketIndexBySeat(seat)
    if (ticketIndex === -1) {
      return
    }
    const newTickets = [...get().tickets]
    newTickets[ticketIndex] = { ...newTickets[ticketIndex], seat, type, price }
    set({
      tickets: newTickets,
    })
  },
  isAllTicketsSet: () => {
    return get().tickets.every((ticket) => ticket.type)
  },
}))
