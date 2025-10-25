import CheckoutForm from '../components/CheckoutForm'
import { useAuthStore } from '../store'

export default function Checkout() {
  const { cart } = useAuthStore()
  const total = cart.reduce((s,c)=>s+c.price,0)
  return (
    <div className="grid-page grid grid-cols-1 md:grid-cols-[1fr_20rem] gap-4">
      <CheckoutForm />
      <aside className="card p-4 h-fit">
        <h3 className="font-semibold mb-2">Order Summary</h3>
        <ul className="text-sm text-gray-700 space-y-1">
          {cart.map(i => <li key={i.id}>{i.name} — {i.currency} {i.price}</li>)}
        </ul>
        <div className="border-t mt-3 pt-3 font-semibold">Total: USD {total}</div>
      </aside>
    </div>
  )
}
