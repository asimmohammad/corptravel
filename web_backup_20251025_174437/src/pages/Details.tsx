import { useParams, useNavigate } from 'react-router-dom'
import PolicyBadge from '../components/PolicyBadge'
import { useAuthStore } from '../store'

export default function Details() {
  const { mode, id } = useParams()
  const { cart } = useAuthStore()
  const nav = useNavigate()
  const sel = cart[0]

  if (!sel) return <div className="grid-page">No selection. Go back to results.</div>

  return (
    <div className="grid-page space-y-4">
      <div className="card p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">{sel.name}</h2>
            <p className="text-gray-600">{mode} • Offer ID: {id}</p>
          </div>
          <PolicyBadge status={sel.policyStatus} />
        </div>
        <div className="mt-4 grid md:grid-cols-3 gap-3">
          <div><strong>Price:</strong> {sel.currency} {sel.price}</div>
          <div><strong>Rules:</strong> Refundable, Seat selection</div>
          <div><strong>Extras:</strong> 1 bag included</div>
        </div>
      </div>
      <div className="flex justify-end">
        <button className="btn-primary" onClick={()=>nav('/checkout')}>Continue to Checkout</button>
      </div>
    </div>
  )
}
