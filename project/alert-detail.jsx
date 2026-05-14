// Alert Detail screen.

const SignalDetail = ({ icon, label, value, sublabel, tone }) => {
  const toneClass = {
    good: { bg: "bg-emerald-50", text: "text-[#16a34a]", border: "border-emerald-200" },
    warn: { bg: "bg-amber-50",  text: "text-[#d97706]", border: "border-amber-200" },
    bad:  { bg: "bg-red-50",    text: "text-[#dc2626]", border: "border-red-200" },
    mute: { bg: "bg-slate-50",  text: "text-slate-600", border: "border-slate-200" },
  }[tone];
  return (
    <div className={`rounded-lg border ${toneClass.border} ${toneClass.bg} p-4`}>
      <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-slate-500 mb-2">
        <Icon name={icon} className={`w-4 h-4 ${toneClass.text}`} strokeWidth={2} />
        {label}
      </div>
      <div className={`text-2xl font-semibold ${toneClass.text}`}>{value}</div>
      {sublabel && <div className="text-xs text-slate-600 mt-1">{sublabel}</div>}
    </div>
  );
};

const AlertDetail = ({ property, onBack, onRefreshCode, onNotifyCohost, onContactSupport }) => {
  const p = property;
  const [refreshing, setRefreshing] = React.useState(false);
  const [refreshed,  setRefreshed]  = React.useState(false);
  const [cohostOpen, setCohostOpen] = React.useState(false);
  const [supportOpen, setSupportOpen] = React.useState(false);
  const [cohostSent, setCohostSent] = React.useState(false);
  const [supportSent, setSupportSent] = React.useState(false);
  const [actionTaken, setActionTaken] = React.useState(null); // string message

  const isOffline = p.status === "Offline";
  const tone = isOffline ? "red" : "amber";
  const bannerBg = tone === "red" ? "bg-[#fef2f2] border-[#fecaca]" : "bg-[#fffbeb] border-[#fde68a]";
  const bannerAccent = tone === "red" ? "text-[#dc2626]" : "text-[#d97706]";

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      setRefreshed(true);
      setActionTaken("Access code refreshed and synced to the lock. We'll monitor and notify you if status changes.");
      onRefreshCode(p.id);
    }, 2000);
  };

  const sendCohost = () => {
    setCohostSent(true);
    setActionTaken("Co-host notified. We'll monitor and notify you if status changes.");
    setTimeout(() => { setCohostOpen(false); setCohostSent(false); }, 1500);
  };
  const sendSupport = () => {
    setSupportSent(true);
    setActionTaken("Priority support request sent. A specialist will contact you within 15 minutes.");
    setTimeout(() => { setSupportOpen(false); setSupportSent(false); }, 1500);
  };

  return (
    <div className="space-y-5" data-screen-label="02 Alert Detail">
      <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900">
        <Icon name="arrow-left" className="w-4 h-4"/> Back to Dashboard
      </button>

      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs text-slate-500 uppercase tracking-wide">{p.lockName}</div>
          <h1 className="text-2xl font-semibold text-slate-900 mt-0.5">{p.name}</h1>
          <div className="text-sm text-slate-600 mt-0.5">{p.address}</div>
        </div>
        <StatusBadge status={p.status} size="lg" />
      </div>

      {actionTaken && (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 flex items-start gap-2.5">
          <div className="text-[#16a34a] mt-0.5"><Icon name="check" className="w-5 h-5" strokeWidth={2.5}/></div>
          <div className="text-sm text-emerald-900">{actionTaken}</div>
        </div>
      )}

      {p.alert && (
        <div className={`rounded-lg border ${bannerBg} p-5`}>
          <div className="flex items-start gap-3">
            <div className={`${bannerAccent} mt-0.5`}><Icon name="alert" className="w-6 h-6" strokeWidth={2}/></div>
            <div className="flex-1">
              <h2 className="text-base font-semibold text-slate-900">{p.alert.title}</h2>
              <p className="text-sm text-slate-700 mt-1.5 leading-relaxed">{p.alert.body}</p>
              <div className="flex items-center gap-2 mt-3 text-sm">
                <Icon name="clock" className={`w-4 h-4 ${bannerAccent}`} strokeWidth={2} />
                <span className="font-semibold text-slate-800">{p.nextCheckIn.hoursAway} hours remaining</span>
                <span className="text-slate-500">until {p.nextCheckIn.guest} checks in</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div>
        <h3 className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-3">Lock Health</h3>
        <div className="grid grid-cols-3 gap-3">
          <SignalDetail
            icon="battery"
            label="Battery"
            value={`${p.battery}%`}
            sublabel={p.battery < 20 ? "Replace within 24 hours" : p.battery < 40 ? "Monitor closely" : "Healthy range"}
            tone={batteryTone(p.battery)}
          />
          <SignalDetail
            icon={p.connectivity === "Online" ? "wifi" : "wifi-off"}
            label="Connectivity"
            value={p.connectivity}
            sublabel={p.connectivity === "Online" ? "Strong signal · last seen 2 min ago" : "Last seen 6 hours ago"}
            tone={connTone(p.connectivity)}
          />
          <SignalDetail
            icon="sync"
            label="Code Sync"
            value={refreshed ? "Synced" : p.codeSync}
            sublabel={refreshed ? "Just now" : p.codeSync === "Synced" ? "Last sync 4 min ago" : "Code awaiting push"}
            tone={refreshed ? "good" : syncTone(p.codeSync)}
          />
        </div>
      </div>

      <Card className="p-5">
        <h3 className="text-sm font-semibold text-slate-900">Recommended actions</h3>
        <p className="text-xs text-slate-500 mt-0.5">Resolve the alert before {p.nextCheckIn.guest} arrives at {p.nextCheckIn.label.toLowerCase()}.</p>
        <div className="grid grid-cols-3 gap-3 mt-4">
          <button
            onClick={handleRefresh}
            disabled={refreshing || refreshed}
            className="text-left rounded-lg border border-slate-200 p-4 hover:border-slate-900 hover:bg-slate-50 transition disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <div className="flex items-center gap-2">
              <Icon name={refreshed ? "check" : "sync"} className={`w-4 h-4 ${refreshed ? "text-[#16a34a]" : refreshing ? "text-slate-400 animate-spin" : "text-slate-700"}`} strokeWidth={2}/>
              <div className="font-semibold text-sm text-slate-900">
                {refreshed ? "Code refreshed" : refreshing ? "Pushing code…" : "Refresh Access Code"}
              </div>
            </div>
            <div className="text-xs text-slate-500 mt-1.5 leading-snug">Force-push the current guest code to wake the lock and verify it stored cleanly.</div>
          </button>
          <button
            onClick={() => setCohostOpen(true)}
            className="text-left rounded-lg border border-slate-200 p-4 hover:border-slate-900 hover:bg-slate-50 transition"
          >
            <div className="flex items-center gap-2">
              <Icon name="user" className="w-4 h-4 text-slate-700" strokeWidth={2}/>
              <div className="font-semibold text-sm text-slate-900">Notify Co-Host</div>
            </div>
            <div className="text-xs text-slate-500 mt-1.5 leading-snug">Send a pre-written text to your co-host with the property address and what to check.</div>
          </button>
          <button
            onClick={() => setSupportOpen(true)}
            className="text-left rounded-lg border border-slate-200 p-4 hover:border-slate-900 hover:bg-slate-50 transition"
          >
            <div className="flex items-center gap-2">
              <Icon name="spark" className="w-4 h-4 text-slate-700" strokeWidth={2}/>
              <div className="font-semibold text-sm text-slate-900">Contact Schlage Support</div>
            </div>
            <div className="text-xs text-slate-500 mt-1.5 leading-snug">Open a priority ticket. A specialist will call you back within 15 minutes.</div>
          </button>
        </div>
      </Card>

      <Modal
        open={cohostOpen}
        onClose={() => setCohostOpen(false)}
        title="Notify Co-Host"
        footer={
          <>
            <Button variant="secondary" size="sm" onClick={() => setCohostOpen(false)}>Cancel</Button>
            <Button variant="primary" size="sm" onClick={sendCohost} icon={cohostSent ? "check" : null}>
              {cohostSent ? "Sent" : "Send Alert"}
            </Button>
          </>
        }
      >
        <p className="text-xs text-slate-500 mb-2">Pre-written message · sent via SMS to Diego (co-host)</p>
        <div className="rounded-md border border-slate-200 bg-slate-50 p-3 text-sm text-slate-800 leading-relaxed">
          Hi Diego — the Schlage lock at {p.name} ({p.address}) is showing {p.status === "Offline" ? "as offline" : `low battery (${p.battery}%)`}.
          Sarah K. checks in at {p.nextCheckIn.label.toLowerCase()}. Can you swing by and swap the batteries / verify it responds before then? Thanks.
        </div>
      </Modal>

      <Modal
        open={supportOpen}
        onClose={() => setSupportOpen(false)}
        title="Contact Schlage Support"
        footer={
          <>
            <Button variant="secondary" size="sm" onClick={() => setSupportOpen(false)}>Close</Button>
            <Button variant="primary" size="sm" onClick={sendSupport} icon={supportSent ? "check" : null}>
              {supportSent ? "Sent" : "Send Priority Request"}
            </Button>
          </>
        }
      >
        <p className="text-sm text-slate-700">
          We'll open a priority ticket for <strong>{p.name}</strong> ({p.lockName}). A specialist will contact you within 15 minutes at the number on file.
        </p>
        <ul className="mt-3 text-xs text-slate-500 space-y-1">
          <li>· Diagnostic snapshot will be attached automatically</li>
          <li>· Includes battery, RSSI, and last 24h of sync events</li>
          <li>· Average response time: 8 min</li>
        </ul>
      </Modal>
    </div>
  );
};

window.AlertDetail = AlertDetail;
