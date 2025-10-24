import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../lib/api'
import { useAuthStore } from '../store'

export default function Login() {
  const [email, setEmail] = useState('admin@laasy.com')
  const [password, setPassword] = useState('password')
  const [loading, setLoading] = useState(false)
  const nav = useNavigate()
  const { login: doLogin } = useAuthStore()

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const u = await login(email, password)
      doLogin(u)
      nav('/search/flights')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid place-items-center h-screen">
      <form onSubmit={submit} className="card p-6 w-full max-w-md space-y-3">
        <h1 className="text-2xl font-bold">Sign in</h1>
        <div>
          <label className="label">Email</label>
          <input className="input" value={email} onChange={e=>setEmail(e.target.value)} />
        </div>
        <div>
          <label className="label">Password</label>
          <input type="password" className="input" value={password} onChange={e=>setPassword(e.target.value)} />
        </div>
        <button className="btn-primary w-full" disabled={loading}>
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
        <p className="text-sm text-gray-600">Use any email. <em>@laasy.com</em> gets admin role in mock mode.</p>
      </form>
    </div>
  )
}
