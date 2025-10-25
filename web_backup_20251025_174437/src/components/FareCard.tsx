import PolicyBadge from './PolicyBadge'

type Props = {
  name: string
  description?: string
  price: number
  currency: string
  policyStatus: 'in' | 'out'
  onSelect?: () => void
}
export default function FareCard(props: Props) {
  return (
    <div className="card p-4 flex items-center gap-4">
      <div className="flex-1">
        <div className="flex items-center gap-3">
          <h4 className="text-lg font-semibold">{props.name}</h4>
          <PolicyBadge status={props.policyStatus} />
        </div>
        {props.description && <p className="text-sm text-gray-600">{props.description}</p>}
      </div>
      <div className="text-right w-40">
        <div className="text-2xl font-bold">{props.currency} {props.price}</div>
        <button className="btn-primary mt-2" onClick={props.onSelect}>Select</button>
      </div>
    </div>
  )
}
