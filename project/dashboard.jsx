// Dashboard screen: alert banner + property cards.

const SignalRow = ({ icon, label, value, tone }) => {
  const toneClass = {
    good: "text-[#16a34a]",
    warn: "text-[#d97706]",
    bad:  "text-[#dc2626]",
    mute: "text-slate-500",
  }[tone] || "text-slate-700";
  return (
    <div className="flex items-center justify-between py-2.5 px-3 rounded-md bg-slate-50/70 border border-slate-100">
      <div className="flex items-center gap-2 text-xs text-slate-600">
        <Icon name={icon} className={`w-4 h-4 ${toneClass}`} strokeWidth={2} />
        {label}
      </div>
      <div className={`text-xs font-semibold ${toneClass}`}>{value}</div>
    </div>
  );
};

const PropertyCard = ({ property, onView, onResolve }) => {
  const p = property;
  return (
    <Card className="p-5 flex flex-col gap-4 transition hover:shadow-[0_2px_4px_rgba(15,23,42,0.06),0_12px_28px_-8px_rgba(15,23,42,0.12)]">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <Icon name="pin" className="w-3.5 h-3.5" />
            <span className="truncate">{p.address}</span>
          </div>
          <h3 className="text-lg font-semibold text-slate-900 leading-tight">{p.name}</h3>
          <div className="text-xs text-slate-500 mt-1">{p.lockName}</div>
        </div>
        <StatusBadge status={p.status} />
      </div>

      <div className="border-t border-dashed border-slate-200" />

      <div>
        <div className="text-[10px] uppercase tracking-wider text-slate-400 mb-1.5">Next Check-in</div>
        <div className="flex items-center gap-2 text-sm text-slate-800">
          <Icon name="user" className="w-4 h-4 text-slate-400" />
          <span className="font-medium">{p.nextCheckIn.guest}</span>
          <span className="text-slate-400">·</span>
          <span className="text-slate-600">{p.nextCheckIn.label}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-1.5">
        <SignalRow icon="battery" label="Battery" value={`${p.battery}%`} tone={batteryTone(p.battery)} />
        <SignalRow icon={p.connectivity === "Online" ? "wifi" : "wifi-off"} label="Connectivity" value={p.connectivity} tone={connTone(p.connectivity)} />
        <SignalRow icon="sync" label="Code Sync" value={p.codeSync} tone={syncTone(p.codeSync)} />
      </div>

      <div className="flex gap-2 pt-1">
        <Button variant="secondary" className="flex-1" onClick={() => onView(p.id)}>View Details</Button>
        {p.status !== "All Clear" && (
          <Button variant={p.status === "Offline" ? "danger" : "primary"} className="flex-1" onClick={() => onResolve(p.id)}>
            Resolve
          </Button>
        )}
      </div>
    </Card>
  );
};

const AlertBanner = ({ alerts, onResolve }) => {
  if (!alerts.length) return null;
  const tone = alerts.some(a => a.status === "Offline") ? "red" : "amber";
  const bg = tone === "red" ? "bg-[#fef2f2] border-[#fecaca]" : "bg-[#fffbeb] border-[#fde68a]";
  const iconColor = tone === "red" ? "text-[#dc2626]" : "text-[#d97706]";
  return (
    <div className={`rounded-lg border ${bg} px-5 py-4`}>
      <div className="flex items-start gap-3">
        <div className={`mt-0.5 ${iconColor}`}><Icon name="alert" className="w-5 h-5" strokeWidth={2}/></div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-slate-900">
            {alerts.length === 1
              ? `${alerts[0].name}: ${alerts[0].alert.title}`
              : `${alerts.length} locks need attention before check-in`}
          </div>
          <div className="text-sm text-slate-700 mt-0.5">
            {alerts.length === 1
              ? alerts[0].alert.body
              : alerts.map(a => a.name).join(" · ")}
          </div>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          {alerts.length === 1 ? (
            <Button variant={tone === "red" ? "danger" : "primary"} size="sm" onClick={() => onResolve(alerts[0].id)}>
              Resolve
            </Button>
          ) : (
            <Button variant="primary" size="sm" onClick={() => onResolve(alerts[0].id)}>
              Review {alerts.length} alerts
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

const Dashboard = ({ properties, hostName, today, onView, onResolve, onSchedule }) => {
  const alerts = properties.filter(p => p.alert);
  return (
    <div className="space-y-6" data-screen-label="01 Dashboard">
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="text-sm text-slate-500">{today}</div>
          <h1 className="text-3xl font-semibold text-slate-900 tracking-tight">Good morning, {hostName.split(" ")[0]}</h1>
          <p className="text-sm text-slate-600 mt-1">
            {alerts.length > 0
              ? `${alerts.length} of your ${properties.length} locks ${alerts.length === 1 ? "needs" : "need"} attention before the next check-in.`
              : `All ${properties.length} locks are healthy. Next check-in is ${properties[0].nextCheckIn.label.toLowerCase()}.`}
          </p>
        </div>
        <Button variant="primary" icon="plus" onClick={onSchedule}>Schedule Access</Button>
      </div>

      <AlertBanner alerts={alerts} onResolve={onResolve} />

      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Your Properties</h2>
          <div className="text-xs text-slate-400">{properties.length} locks · live status</div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {properties.map((p) => (
            <PropertyCard key={p.id} property={p} onView={onView} onResolve={onResolve} />
          ))}
        </div>
      </div>
    </div>
  );
};

window.Dashboard = Dashboard;
