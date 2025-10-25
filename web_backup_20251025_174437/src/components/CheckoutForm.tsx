import { useNavigate } from 'react-router-dom'
import PolicyBanner from './PolicyBanner'
import { useAuthStore } from '../store'
import { postBookingConfirm } from '../lib/api'

export default function CheckoutForm() {
  const nav = useNavigate()
  const { cart } = useAuthStore()
  const inPolicy = cart.every(c => c.policyStatus === 'in')

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const resp = await postBookingConfirm({ items: cart })
    nav(`/confirmation/${resp.id}`)
  }

  return (
    <form onSubmit={onSubmit} className="card p-4 space-y-3">
      <PolicyBanner inPolicy={inPolicy} />
      {!inPolicy && (
        <div>
          <label className="label">Justification</label>
          <textarea className="input" placeholder="Reason for out-of-policy selection" required />
        </div>
      )}
      <div className="grid md:grid-cols-2 gap-3">
        <div>
          <label className="label">Traveler Name</label>
          <input className="input" defaultValue="John Doe" />
        </div>
        <div>
          <label className="label">Payment</label>
          <select className="input">
            <option>Corporate Card (•••• 4242)</option>
            <option>Virtual Card</option>
          </select>
        </div>
      </div>
      <div className="flex justify-end">
        <button className="btn-primary">Confirm Booking</button>
      </div>
    </form>
  )
}
