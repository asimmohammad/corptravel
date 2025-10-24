import { create } from 'zustand'
import type { User, Offer, SearchParams, Policy, Trip } from './types'

type State = {
  user: User | null
  cart: Offer[]
  lastSearch?: SearchParams
  policies: Policy[]
  trips: Trip[]
}

type Actions = {
  login: (u: User) => void
  logout: () => void
  setCart: (items: Offer[]) => void
  setLastSearch: (s: SearchParams) => void
  setPolicies: (p: Policy[]) => void
  addTrip: (t: Trip) => void
}

export const useAuthStore = create<State & Actions>((set) => ({
  user: null,
  cart: [],
  policies: [],
  trips: [],
  login: (u) => set({ user: u }),
  logout: () => set({ user: null, cart: [] }),
  setCart: (items) => set({ cart: items }),
  setLastSearch: (s) => set({ lastSearch: s }),
  setPolicies: (p) => set({ policies: p }),
  addTrip: (t) => set((state) => ({ trips: [...state.trips, t] })),
}))
