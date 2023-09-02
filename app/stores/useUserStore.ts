import { create } from 'zustand'

export type User = {
  email: string
  name: string
  id: string
  rank: string
  dateOfBirth: string
}

const initialUser = {
  email: '',
  name: '',
  id: '',
  rank: '',
  dateOfBirth: '',
}

export const useUserStore = create<{
  user: User
}>((set, get) => ({
  user: { ...initialUser },
  setUser: (user: User) => {
    set({
      user: {
        ...user,
      },
    })
  },
  reset: () => {
    set({
      user: { ...initialUser },
    })
  },
}))
