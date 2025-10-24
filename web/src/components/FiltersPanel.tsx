import { useSearchParams } from 'react-router-dom'

export default function FiltersPanel() {
  const [params, setParams] = useSearchParams()
  const inPolicy = params.get('inPolicy') ?? 'all'
  const set = (k: string, v: string) => {
    if (v === 'all') params.delete(k)
    else params.set(k, v)
    setParams(params, { replace: true })
  }

  return (
    <aside className="card p-4 w-64">
      <h3 className="font-semibold mb-3">Filters</h3>
      <div className="space-y-2">
        <label className="label">Policy</label>
        <select className="input" value={inPolicy} onChange={e => set('inPolicy', e.target.value)}>
          <option value="all">All</option>
          <option value="in">In Policy</option>
          <option value="out">Out of Policy</option>
        </select>
      </div>
    </aside>
  )
}
