export type Mode = 'flights' | 'hotels' | 'cars'

export interface User {
  email: string
  role: 'OrgAdmin' | 'Traveler' | 'Arranger' | 'TravelManager'
  token: string
}

export interface SearchParams {
  origin?: string
  destination?: string
  departDate?: string
  returnDate?: string
  travelers?: number
  city?: string
  checkIn?: string
  checkOut?: string
  carPickup?: string
  carDropoff?: string
  mode: Mode
}

export interface Offer {
  id: string
  mode: Mode
  name: string
  description?: string
  price: number
  currency: string
  policyStatus: 'in' | 'out'
  details?: Record<string, any>
}

export interface PolicyRule {
  key: string
  op: '<=' | '<' | '>=' | '>' | '==' | 'in'
  value: string
}

export interface Policy {
  id: number
  name: string
  status: 'draft' | 'published'
  rules: PolicyRule[]
}

export interface Trip {
  id: string
  traveler: string
  segments: string[]
  startDate: string
  endDate: string
  status: 'upcoming' | 'completed' | 'canceled'
}
