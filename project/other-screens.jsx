// Properties list (nav item) — compact alternative view of all properties.

const PropertiesList = ({ properties, onView }) => (
  <div className="space-y-6" data-screen-label="05 Properties">
    <div>
      <h1 className="text-3xl font-semibold text-slate-900 tracking-tight">Properties</h1>
      <p className="text-sm text-slate-600 mt-1">All locks across all properties.</p>
    </div>
    <Card className="overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
          <tr>
            <th className="text-left font-semibold px-5 py-3">Property</th>
            <th className="text-left font-semibold px-5 py-3">Lock</th>
            <th className="text-left font-semibold px-5 py-3">Battery</th>
            <th className="text-left font-semibold px-5 py-3">Connectivity</th>
            <th className="text-left font-semibold px-5 py-3">Sync</th>
            <th className="text-left font-semibold px-5 py-3">Status</th>
            <th className="text-left font-semibold px-5 py-3">Next Check-in</th>
            <th className="px-5 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {properties.map((p) => (
            <tr key={p.id} className="border-t border-slate-100 hover:bg-slate-50/50">
              <td className="px-5 py-3">
                <div className="font-medium text-slate-900">{p.name}</div>
                <div className="text-xs text-slate-500">{p.address}</div>
              </td>
              <td className="px-5 py-3 text-slate-700">{p.lockName}</td>
              <td className={`px-5 py-3 font-medium ${
                batteryTone(p.battery) === "bad" ? "text-[#dc2626]" : batteryTone(p.battery) === "warn" ? "text-[#d97706]" : "text-[#16a34a]"
              }`}>{p.battery}%</td>
              <td className={`px-5 py-3 ${p.connectivity === "Online" ? "text-[#16a34a]" : "text-[#dc2626]"}`}>{p.connectivity}</td>
              <td className={`px-5 py-3 ${p.codeSync === "Synced" ? "text-[#16a34a]" : "text-[#d97706]"}`}>{p.codeSync}</td>
              <td className="px-5 py-3"><StatusBadge status={p.status} /></td>
              <td className="px-5 py-3 text-slate-600 text-xs">
                <div className="font-medium text-slate-700">{p.nextCheckIn.guest}</div>
                <div>{p.nextCheckIn.label}</div>
              </td>
              <td className="px-5 py-3 text-right">
                <Button variant="secondary" size="sm" onClick={() => onView(p.id)}>View</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  </div>
);

const Settings = () => (
  <div className="space-y-6" data-screen-label="06 Settings">
    <div>
      <h1 className="text-3xl font-semibold text-slate-900 tracking-tight">Settings</h1>
      <p className="text-sm text-slate-600 mt-1">Account, notifications, and integrations.</p>
    </div>
    <Card className="p-12 text-center">
      <div className="inline-flex w-12 h-12 rounded-full bg-slate-100 grid place-items-center mb-3">
        <Icon name="gear" className="w-6 h-6 text-slate-400" />
      </div>
      <div className="text-base font-semibold text-slate-700">Settings coming soon</div>
      <div className="text-sm text-slate-500 mt-1">We're still building this part out.</div>
    </Card>
  </div>
);

Object.assign(window, { PropertiesList, Settings });
