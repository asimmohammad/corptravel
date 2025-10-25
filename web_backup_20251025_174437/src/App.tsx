import { Routes, Route, Navigate, Link } from 'react-router-dom'
import Login from './pages/Login'
import Search from './pages/Search'
import Results from './pages/Results'
import Details from './pages/Details'
import Checkout from './pages/Checkout'
import Confirmation from './pages/Confirmation'
import Policies from './pages/admin/Policies'
import AdminDashboard from './pages/admin/AdminDashboard'
import Users from './pages/admin/Users'
import Reports from './pages/admin/Reports'
import BookForOther from './pages/arranger/BookForOther'
import ArrangerTravelers from './pages/arranger/Travelers'
import MyTrips from './pages/trips/MyTrips'
import Profile from './pages/profile/Profile'
import { useAuthStore } from './store'

function Shell({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuthStore()
  return (
    <div>
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-3 flex items-center gap-4">
          <Link to="/" className="text-xl font-bold">LaaSy Travel</Link>
          <nav className="flex items-center gap-3 text-sm">
            <Link to="/search/flights">Book</Link>
            <Link to="/trips">My Trips</Link>
            <Link to="/profile">Profile</Link>
            {user?.role === 'OrgAdmin' && <Link to="/admin">Admin</Link>}
            <Link to="/arranger">Arranger</Link>
          </nav>
          <div className="ml-auto flex items-center gap-3">
            {user ? (
              <>
                <span className="text-sm text-gray-600">{user.email} • {user.role}</span>
                <button className="btn-secondary" onClick={logout}>Logout</button>
              </>
            ) : (
              <Link to="/login" className="btn-primary">Login</Link>
            )}
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to="/search/flights" replace />} />
      <Route path="/*" element={
        <Shell>
          <Routes>
            <Route path="search/:mode" element={<Search />} />
            <Route path="results/:mode" element={<Results />} />
            <Route path="details/:mode/:id" element={<Details />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="confirmation/:id" element={<Confirmation />} />
            <Route path="trips" element={<MyTrips />} />
            <Route path="profile" element={<Profile />} />
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="admin/policies" element={<Policies />} />
            <Route path="admin/users" element={<Users />} />
            <Route path="admin/reports" element={<Reports />} />
            <Route path="arranger" element={<BookForOther />} />
            <Route path="arranger/travelers" element={<ArrangerTravelers />} />
          </Routes>
        </Shell>
      } />
    </Routes>
  )
}
