import { useEffect, useState } from 'react'
import { createPolicy, getPolicies, publishPolicy } from '../../lib/api'
import type { Policy, PolicyRule } from '../../types'

export default function Policies() {
  const [policies, setPolicies] = useState<Policy[]>([])
  const [name, setName] = useState('New Policy')
  const [rate, setRate] = useState(250)

  useEffect(() => {
    getPolicies().then(setPolicies)
  }, [])

  const add = async () => {
    const rules: PolicyRule[] = [
      { key: 'hotel.max_nightly_rate', op: '<=', value: String(rate) }
    ]
    const p = await createPolicy(name, rules)
    setPolicies(prev => [p, ...prev])
  }

  const publish = async (id: number) => {
    const p = await publishPolicy(id)
    setPolicies(prev => prev.map(x => x.id === id ? p : x))
  }

  return (
    <div className="grid-page space-y-4">
      <h1 className="text-2xl font-bold">Policies</h1>
      <div className="card p-4 grid md:grid-cols-4 gap-3">
        <input className="input" placeholder="Policy name" value={name} onChange={e=>setName(e.target.value)} />
        <div>
          <label className="label">Max Nightly Rate</label>
          <input type="number" className="input" value={rate} onChange={e=>setRate(parseInt(e.target.value||'0'))} />
        </div>
        <div className="md:col-span-2 flex items-end justify-end">
          <button className="btn-primary" onClick={add}>Create Policy</button>
        </div>
      </div>

      <div className="grid gap-3">
        {policies.map(p => (
          <div key={p.id} className="card p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{p.name}</h3>
                <p className="text-sm text-gray-600">Status: {p.status}</p>
              </div>
              <div className="space-x-2">
                <button className="btn-secondary">Preview</button>
                {p.status !== 'published' && <button className="btn-primary" onClick={()=>publish(p.id)}>Publish</button>}
              </div>
            </div>
            <div className="mt-3">
              <h4 className="font-medium">Rules</h4>
              <ul className="text-sm text-gray-700 list-disc ml-5">
                {p.rules.map((r,i)=>(<li key={i}>{r.key} {r.op} {r.value}</li>))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
