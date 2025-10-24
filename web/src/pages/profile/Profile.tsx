export default function Profile() {
  return (
    <div className="grid-page space-y-4">
      <h1 className="text-2xl font-bold">Traveler Profile</h1>
      <div className="card p-4 grid md:grid-cols-3 gap-3">
        <div>
          <label className="label">Full Name</label>
          <input className="input" defaultValue="John Doe" />
        </div>
        <div>
          <label className="label">Email</label>
          <input className="input" defaultValue="john@corp.com" />
        </div>
        <div>
          <label className="label">Phone</label>
          <input className="input" defaultValue="+1 312-555-1234" />
        </div>
        <div className="md:col-span-3">
          <h3 className="font-semibold mt-2">Loyalty Numbers</h3>
        </div>
        <div>
          <label className="label">Airline</label>
          <input className="input" placeholder="AA Advantage #" />
        </div>
        <div>
          <label className="label">Hotel</label>
          <input className="input" placeholder="Marriott Bonvoy #" />
        </div>
        <div>
          <label className="label">Car</label>
          <input className="input" placeholder="Hertz Gold #" />
        </div>
      </div>
    </div>
  )
}
