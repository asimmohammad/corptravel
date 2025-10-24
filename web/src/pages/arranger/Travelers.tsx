export default function ArrangerTravelers() {
  const travelers = [
    { id: 1, name: 'Jane Doe', email: 'jane@corp.com' },
    { id: 2, name: 'Chris Lee', email: 'chris@corp.com' },
  ]
  return (
    <div className="grid-page">
      <div className="card p-4">
        <h1 className="text-xl font-semibold">Arranger — Travelers</h1>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="py-2">Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {travelers.map(t => (
              <tr key={t.id} className="border-b">
                <td className="py-2">{t.name}</td>
                <td>{t.email}</td>
                <td><button className="btn-secondary">Set as Delegate</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
