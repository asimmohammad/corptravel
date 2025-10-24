import { useEffect, useState } from 'react'
import { getTrips } from '../../lib/api'
import type { Trip } from '../../types'

export default function MyTrips() {
  const [trips, setTrips] = useState<Trip[]>([])
  useEffect(()=>{ getTrips().then(setTrips) },[])

  return (
    <div className="grid-page">
      <h1 className="text-2xl font-bold mb-4">My Trips</h1>
      <div className="grid gap-3">
        {trips.map(t => (
          <div key={t.id} className="card p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">{t.segments.join(' • ')}</div>
                <div className="text-sm text-gray-600">{t.startDate} → {t.endDate}</div>
              </div>
              <span className="badge bg-gray-100">{t.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
