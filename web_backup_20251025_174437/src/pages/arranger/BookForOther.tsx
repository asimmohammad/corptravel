import { useNavigate } from 'react-router-dom'

export default function BookForOther() {
  const nav = useNavigate()
  return (
    <div className="grid-page space-y-4">
      <h1 className="text-2xl font-bold">Arranger — Book for Someone Else</h1>
      <div className="card p-4 grid md:grid-cols-3 gap-3">
        <div className="md:col-span-2">
          <label className="label">Traveler</label>
          <input className="input" placeholder="Search by name or email" />
        </div>
        <div className="flex items-end justify-end">
          <button className="btn-primary" onClick={()=>nav('/search/flights')}>Start Booking</button>
        </div>
      </div>
    </div>
  )
}
