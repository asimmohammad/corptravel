import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import type { Mode } from '../types'

export default function SearchForm() {
  const { mode } = useParams()
  const m = (mode as Mode) ?? 'flights'
  const nav = useNavigate()
  const [origin, setOrigin] = useState('ORD')
  const [destination, setDestination] = useState('JFK')
  const [departDate, setDepartDate] = useState('2025-11-20')

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const qs = new URLSearchParams({ origin, destination, departDate })
    nav(`/results/${m}?` + qs.toString())
  }

  return (
    <form onSubmit={submit} className="card p-4 grid grid-cols-1 md:grid-cols-5 gap-3">
      <div>
        <label className="label">Mode</label>
        <select className="input" defaultValue={m} onChange={e => nav(`/search/${e.target.value}`)}>
          <option value="flights">Flights</option>
          <option value="hotels">Hotels</option>
          <option value="cars">Cars</option>
        </select>
      </div>
      {m === 'flights' && <>
        <div>
          <label className="label">From</label>
          <input className="input" value={origin} onChange={e=>setOrigin(e.target.value)} />
        </div>
        <div>
          <label className="label">To</label>
          <input className="input" value={destination} onChange={e=>setDestination(e.target.value)} />
        </div>
        <div>
          <label className="label">Depart</label>
          <input type="date" className="input" value={departDate} onChange={e=>setDepartDate(e.target.value)} />
        </div>
      </>}
      {m !== 'flights' && <div className="md:col-span-3">
        <label className="label">City</label>
        <input className="input" placeholder="e.g. New York" />
      </div>}
      <div className="self-end">
        <button className="btn-primary w-full">Search</button>
      </div>
    </form>
  )
}
