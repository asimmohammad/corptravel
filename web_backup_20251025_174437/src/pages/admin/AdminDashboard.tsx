import { Link } from 'react-router-dom'

export default function AdminDashboard() {
  return (
    <div className="grid-page">
      <div className="grid md:grid-cols-3 gap-4">
        <Link to="/admin/policies" className="card p-4">
          <h3 className="font-semibold">Policy Management</h3>
          <p className="text-sm text-gray-600">Create, edit, preview, and publish travel policies.</p>
        </Link>
        <Link to="/admin/users" className="card p-4">
          <h3 className="font-semibold">Users & Roles</h3>
          <p className="text-sm text-gray-600">Invite users, assign roles, manage arrangers.</p>
        </Link>
        <Link to="/admin/reports" className="card p-4">
          <h3 className="font-semibold">Reports</h3>
          <p className="text-sm text-gray-600">Spend & compliance insights.</p>
        </Link>
      </div>
    </div>
  )
}
