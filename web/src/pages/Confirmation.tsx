import { Link, useParams } from 'react-router-dom'

export default function Confirmation() {
  const { id } = useParams()
  return (
    <div className="grid-page">
      <div className="card p-6 text-center space-y-3">
        <h1 className="text-2xl font-bold">Booking Confirmed</h1>
        <p>Your confirmation ID is <strong>{id}</strong>.</p>
        <p>A confirmation email has been sent. Safe travels!</p>
        <div className="space-x-2">
          <Link to="/trips" className="btn-secondary">View My Trips</Link>
          <Link to="/search/flights" className="btn-primary">Book Another</Link>
        </div>
      </div>
    </div>
  )
}
