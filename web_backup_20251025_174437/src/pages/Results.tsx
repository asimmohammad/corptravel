import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import FiltersPanel from '../components/FiltersPanel'
import FareCard from '../components/FareCard'
import { searchOffers } from '../lib/api'
import type { Mode, Offer } from '../types'
import { useAuthStore } from '../store'

export default function Results() {
  const { mode } = useParams()
  const m = (mode as Mode) ?? 'flights'
  const { search } = useLocation()
  const [offers, setOffers] = useState<Offer[]>([])
  const [loading, setLoading] = useState(true)
  const nav = useNavigate()
  const { setCart } = useAuthStore()

  useEffect(() => {
    setLoading(true)
    searchOffers({ mode: m }).then(data => setOffers(data)).finally(()=>setLoading(false))
  }, [m, search])

  const queryParams = new URLSearchParams(search)
  const inPolicyFilter = queryParams.get('inPolicy')

  const filtered = useMemo(() => {
    if (!inPolicyFilter || inPolicyFilter === 'all') return offers
    return offers.filter(o => o.policyStatus === inPolicyFilter)
  }, [offers, inPolicyFilter])

  return (
    <div className="grid-page grid grid-cols-1 md:grid-cols-[16rem_1fr] gap-4">
      <FiltersPanel />
      <div className="space-y-3">
        <h2 className="text-xl font-semibold">Results — {m}</h2>
        {loading ? <p>Loading…</p> :
          filtered.map(o => (
            <FareCard key={o.id} {...o} onSelect={() => {
              setCart([o])
              nav(`/details/${m}/${o.id}`)
            }} />
          ))
        }
      </div>
    </div>
  )
}
