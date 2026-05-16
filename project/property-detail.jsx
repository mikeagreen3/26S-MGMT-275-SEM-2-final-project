// Property Detail screen — battery chart, access codes, check-in history.

const BatteryChart = ({ history, currentTone }) => {
  const W = 600, H = 160, P = 28;
  const max = 100;
  const xStep = (W - P * 2) / (history.length - 1);
  const points = history.map((v, i) => [P + i * xStep, H - P - ((v / max) * (H - P * 2))]);
  const pathD = points.map((pt, i) => `${i === 0 ? "M" : "L"} ${pt[0]} ${pt[1]}`).join(" ");
  const areaD = `${pathD} L ${points[points.length - 1][0]} ${H - P} L ${points[0][0]} ${H - P} Z`;

  const accent = currentTone === "bad" ? "#dc2626" : currentTone === "warn" ? "#d97706" : "#16a34a";
  const fillId = `bf-${accent.replace("#","")}`;
  const days = ["6d", "5d", "4d", "3d", "2d", "1d", "Today"];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-40">
      <defs>
        <linearGradient id={fillId} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.18" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0, 25, 50, 75, 100].map((y) => (
        <g key={y}>
          <line
            x1={P} x2={W - P}
            y1={H - P - (y / max) * (H - P * 2)}
            y2={H - P - (y / max) * (H - P * 2)}
            stroke="#e2e8f0" strokeDasharray="2 4"
          />
          <text x={P - 6} y={H - P - (y / max) * (H - P * 2) + 3} textAnchor="end" fontSize="9" fill="#94a3b8">{y}</text>
        </g>
      ))}
      <path d={areaD} fill={`url(#${fillId})`} />
      <path d={pathD} fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" />
      {points.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={i === points.length - 1 ? 4 : 2.5} fill="#fff" stroke={accent} strokeWidth="2" />
          <text x={x} y={H - P + 14} textAnchor="middle" fontSize="9" fill="#94a3b8">{days[i]}</text>
        </g>
      ))}
      <text
        x={points[points.length - 1][0] - 6}
        y={points[points.length - 1][1] - 10}
        textAnchor="end"
        fontSize="11"
        fontWeight="600"
        fill={accent}
      >
        {history[history.length - 1]}%
      </text>
    </svg>
  );
};

const PropertyDetail = ({ property, codes, history, onBack, onAddAccess }) => {
  const p = property;
  const propCodes = codes.filter(c => c.lockId === p.id);
  return (
    <div className="space-y-6" data-screen-label="04 Property Detail">
      <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900">
        <Icon name="arrow-left" className="w-4 h-4"/> Back to Dashboard
      </button>

      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs text-slate-500 uppercase tracking-wide">{p.lockModel}</div>
          <h1 className="text-3xl font-semibold text-slate-900 tracking-tight mt-0.5">{p.name}</h1>
          <div className="text-sm text-slate-600 mt-0.5 flex items-center gap-1.5">
            <Icon name="pin" className="w-3.5 h-3.5" /> {p.address}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <StatusBadge status={p.status} size="lg" />
          <Button variant="primary" icon="plus" onClick={() => onAddAccess(p.id)}>Add Access Code</Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="p-4">
          <div className="text-[10px] uppercase tracking-wider text-slate-400">Battery</div>
          <div className={`text-2xl font-semibold mt-0.5 ${
            batteryTone(p.battery) === "bad" ? "text-[#dc2626]" : batteryTone(p.battery) === "warn" ? "text-[#d97706]" : "text-[#16a34a]"
          }`}>{p.battery}%</div>
          <div className="text-xs text-slate-500 mt-0.5">Estimated 6 weeks remaining</div>
        </Card>
        <Card className="p-4">
          <div className="text-[10px] uppercase tracking-wider text-slate-400">Connectivity</div>
          <div className={`text-2xl font-semibold mt-0.5 ${p.connectivity === "Online" ? "text-[#16a34a]" : "text-[#dc2626]"}`}>{p.connectivity}</div>
          <div className="text-xs text-slate-500 mt-0.5">{p.connectivity === "Online" ? "Last seen 2 min ago" : "Last seen 6 hours ago"}</div>
        </Card>
        <Card className="p-4">
          <div className="text-[10px] uppercase tracking-wider text-slate-400">Code Sync</div>
          <div className={`text-2xl font-semibold mt-0.5 ${p.codeSync === "Synced" ? "text-[#16a34a]" : "text-[#d97706]"}`}>{p.codeSync}</div>
          <div className="text-xs text-slate-500 mt-0.5">Last sync 4 min ago</div>
        </Card>
      </div>

      <Card className="p-5">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Battery — last 7 days</h3>
            <div className="text-xs text-slate-500">Tracking trend so you can replace batteries before they fail.</div>
          </div>
        </div>
        <BatteryChart history={history} currentTone={batteryTone(p.battery)} />
      </Card>

      <Card className="overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Current access codes</h3>
            <div className="text-xs text-slate-500">{propCodes.length} codes assigned to this lock</div>
          </div>
          <Button variant="secondary" size="sm" icon="plus" onClick={() => onAddAccess(p.id)}>Add</Button>
        </div>
        {propCodes.length === 0 ? (
          <div className="px-5 py-8 text-sm text-slate-500 text-center">No codes yet. Click <strong>Add</strong> to schedule access.</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="text-left font-semibold px-5 py-3">Name</th>
                <th className="text-left font-semibold px-5 py-3">Type</th>
                <th className="text-left font-semibold px-5 py-3">Valid From</th>
                <th className="text-left font-semibold px-5 py-3">Valid Until</th>
                <th className="text-left font-semibold px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {propCodes.map((c) => (
                <tr key={c.id} className="border-t border-slate-100">
                  <td className="px-5 py-3 text-slate-900 font-medium">{c.name}</td>
                  <td className="px-5 py-3 text-slate-600">{c.type}</td>
                  <td className="px-5 py-3 text-slate-600">{c.validFrom}</td>
                  <td className="px-5 py-3 text-slate-600">{c.validUntil}</td>
                  <td className="px-5 py-3"><StatusBadge status={c.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>

      <Card className="overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100">
          <h3 className="text-sm font-semibold text-slate-900">Recent check-ins</h3>
          <div className="text-xs text-slate-500">Last 5 guest arrivals at this property</div>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="text-left font-semibold px-5 py-3">Guest</th>
              <th className="text-left font-semibold px-5 py-3">Date</th>
              <th className="text-left font-semibold px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {history && (window.CHECKIN_HISTORY[p.id] || []).map((h, i) => (
              <tr key={i} className="border-t border-slate-100">
                <td className="px-5 py-3 text-slate-900 font-medium">{h.guest}</td>
                <td className="px-5 py-3 text-slate-600">{h.date}</td>
                <td className="px-5 py-3"><StatusBadge status={h.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

window.PropertyDetail = PropertyDetail;
