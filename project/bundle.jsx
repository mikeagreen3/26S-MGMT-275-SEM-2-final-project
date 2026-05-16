
// ===== data.js =====
// Shared sample data for the AI Access Concierge prototype.
// Mutating these arrays is fine — state lives in React.

window.INITIAL_PROPERTIES = [
  {
    id: "lock_001",
    name: "Beachside Studio",
    address: "412 Ocean View Dr, Santa Monica, CA",
    lockName: "Front Door Encode",
    lockModel: "Schlage Encode Wi-Fi Deadbolt",
    battery: 12,
    connectivity: "Online",
    codeSync: "Synced",
    status: "At Risk",
    nextCheckIn: {
      guest: "Sarah K.",
      label: "Tomorrow 3:00 PM",
      hoursAway: 18,
      iso: "2026-05-11T15:00:00",
    },
    alert: {
      title: "Action Required Before Check-in",
      body: "Battery is critically low at 12%. At this level, the lock may fail to respond during your guest's check-in tomorrow at 3:00 PM.",
    },
  },
  {
    id: "lock_002",
    name: "Downtown Loft",
    address: "88 Spring St #4B, New York, NY",
    lockName: "Main Entry Encode Plus",
    lockModel: "Schlage Encode Plus Smart Deadbolt",
    battery: 78,
    connectivity: "Online",
    codeSync: "Synced",
    status: "All Clear",
    nextCheckIn: {
      guest: "James M.",
      label: "Friday 4:00 PM",
      hoursAway: 96,
      iso: "2026-05-15T16:00:00",
    },
    alert: null,
  },
  {
    id: "lock_003",
    name: "Mountain Cabin",
    address: "27 Pine Ridge Rd, Big Bear, CA",
    lockName: "Cabin Door Encode",
    lockModel: "Schlage Encode Wi-Fi Deadbolt",
    battery: 45,
    connectivity: "Offline",
    codeSync: "Pending",
    status: "Offline",
    nextCheckIn: {
      guest: "Priya R.",
      label: "Saturday 2:00 PM",
      hoursAway: 120,
      iso: "2026-05-16T14:00:00",
    },
    alert: {
      title: "Lock Unreachable",
      body: "We haven't heard from this lock in 6 hours. Codes pushed in this window have not synced. Your guest's check-in is Saturday at 2:00 PM.",
    },
  },
];

// 7-day battery history per lock (oldest -> newest, today is last)
window.BATTERY_HISTORY = {
  lock_001: [68, 54, 42, 33, 25, 18, 12],
  lock_002: [92, 90, 88, 85, 83, 80, 78],
  lock_003: [60, 58, 55, 52, 50, 47, 45],
};

window.INITIAL_ACCESS_CODES = [
  {
    id: "c01",
    name: "Sarah K. — Guest",
    type: "Guest",
    lockId: "lock_001",
    lockName: "Front Door Encode",
    validFrom: "May 11, 3:00 PM",
    validUntil: "May 14, 11:00 AM",
    status: "Pending",
  },
  {
    id: "c02",
    name: "Luz — Cleaning",
    type: "Cleaner",
    lockId: "lock_002",
    lockName: "Main Entry Encode Plus",
    validFrom: "May 10, 11:00 AM",
    validUntil: "May 10, 2:00 PM",
    status: "Active",
  },
  {
    id: "c03",
    name: "James M. — Guest",
    type: "Guest",
    lockId: "lock_002",
    lockName: "Main Entry Encode Plus",
    validFrom: "May 15, 4:00 PM",
    validUntil: "May 18, 11:00 AM",
    status: "Pending",
  },
  {
    id: "c04",
    name: "HVAC Service",
    type: "Contractor",
    lockId: "lock_003",
    lockName: "Cabin Door Encode",
    validFrom: "May 5, 9:00 AM",
    validUntil: "May 5, 12:00 PM",
    status: "Expired",
  },
];

window.CHECKIN_HISTORY = {
  lock_001: [
    { guest: "Dana P.", date: "May 5", status: "Successful" },
    { guest: "Ravi S.", date: "Apr 28", status: "Successful" },
    { guest: "Kim L.", date: "Apr 22", status: "Failed" },
    { guest: "Tom W.", date: "Apr 15", status: "Successful" },
    { guest: "Aria N.", date: "Apr 8", status: "Successful" },
  ],
  lock_002: [
    { guest: "Mei T.", date: "May 3", status: "Successful" },
    { guest: "Owen B.", date: "Apr 26", status: "Successful" },
    { guest: "Ines G.", date: "Apr 18", status: "Successful" },
    { guest: "Carl V.", date: "Apr 10", status: "Successful" },
    { guest: "Lin H.", date: "Apr 2", status: "Successful" },
  ],
  lock_003: [
    { guest: "Marco R.", date: "Apr 30", status: "Successful" },
    { guest: "Eva K.", date: "Apr 20", status: "No Data" },
    { guest: "Sven J.", date: "Apr 12", status: "Successful" },
    { guest: "Nora P.", date: "Apr 3", status: "Successful" },
    { guest: "Otto F.", date: "Mar 27", status: "Successful" },
  ],
};


// ===== components.jsx =====
// Shared UI primitives: icons, badges, nav, modals.

const Icon = ({ name, className = "w-5 h-5", strokeWidth = 1.8 }) => {
  const props = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  switch (name) {
    case "home":
      return (<svg {...props}><path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/></svg>);
    case "calendar":
      return (<svg {...props}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>);
    case "building":
      return (<svg {...props}><rect x="4" y="3" width="16" height="18" rx="1"/><path d="M9 8h2M13 8h2M9 12h2M13 12h2M9 16h2M13 16h2"/></svg>);
    case "gear":
      return (<svg {...props}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>);
    case "battery":
      return (<svg {...props}><rect x="2" y="7" width="17" height="10" rx="2"/><path d="M22 11v2"/></svg>);
    case "wifi":
      return (<svg {...props}><path d="M5 12.5a10 10 0 0 1 14 0"/><path d="M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r=".8" fill="currentColor"/><path d="M2 9a14 14 0 0 1 20 0"/></svg>);
    case "wifi-off":
      return (<svg {...props}><path d="M3 3l18 18"/><path d="M5 12.5a10 10 0 0 1 4-2.9"/><path d="M16 10a10 10 0 0 1 3 2.5"/><path d="M8.5 16a5 5 0 0 1 6-1"/><circle cx="12" cy="19.5" r=".8" fill="currentColor"/></svg>);
    case "sync":
      return (<svg {...props}><path d="M21 12a9 9 0 0 1-15.5 6.3L3 16"/><path d="M3 12a9 9 0 0 1 15.5-6.3L21 8"/><path d="M21 3v5h-5M3 21v-5h5"/></svg>);
    case "arrow-left":
      return (<svg {...props}><path d="M15 18l-6-6 6-6"/></svg>);
    case "alert":
      return (<svg {...props}><path d="M12 3l10 17H2L12 3z"/><path d="M12 10v4M12 17.5v.5"/></svg>);
    case "check":
      return (<svg {...props}><path d="M5 12l5 5L20 7"/></svg>);
    case "lock":
      return (<svg {...props}><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>);
    case "spark":
      return (<svg {...props}><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z"/></svg>);
    case "x":
      return (<svg {...props}><path d="M6 6l12 12M18 6L6 18"/></svg>);
    case "plus":
      return (<svg {...props}><path d="M12 5v14M5 12h14"/></svg>);
    case "clock":
      return (<svg {...props}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>);
    case "user":
      return (<svg {...props}><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>);
    case "pin":
      return (<svg {...props}><path d="M12 21s-7-7.5-7-12a7 7 0 1 1 14 0c0 4.5-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>);
    default:
      return null;
  }
};

const StatusBadge = ({ status, size = "md" }) => {
  const map = {
    "All Clear":  { bg: "#16a34a", dot: "#bbf7d0" },
    "At Risk":    { bg: "#d97706", dot: "#fed7aa" },
    "Offline":    { bg: "#dc2626", dot: "#fecaca" },
    "Active":     { bg: "#16a34a", dot: "#bbf7d0" },
    "Pending":    { bg: "#d97706", dot: "#fed7aa" },
    "Expired":    { bg: "#64748b", dot: "#cbd5e1" },
    "Successful": { bg: "#16a34a", dot: "#bbf7d0" },
    "Failed":     { bg: "#dc2626", dot: "#fecaca" },
    "No Data":    { bg: "#64748b", dot: "#cbd5e1" },
  };
  const s = map[status] || map["No Data"];
  const pad = size === "lg" ? "px-3 py-1 text-xs" : "px-2.5 py-0.5 text-[11px]";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-semibold uppercase tracking-wide text-white ${pad}`}
      style={{ backgroundColor: s.bg, letterSpacing: "0.04em" }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: s.dot }}></span>
      {status}
    </span>
  );
};

const Card = ({ children, className = "", onClick, style }) => (
  <div
    onClick={onClick}
    style={style}
    className={`bg-white rounded-lg border border-slate-200 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_4px_12px_-2px_rgba(15,23,42,0.05)] ${className}`}
  >
    {children}
  </div>
);

const Button = ({ children, variant = "primary", size = "md", onClick, disabled, className = "", icon }) => {
  const sizes = { sm: "px-3 py-1.5 text-sm", md: "px-4 py-2 text-sm", lg: "px-5 py-2.5 text-sm" };
  const variants = {
    primary: "bg-[#1a1a2e] text-white hover:bg-[#2a2a44] disabled:bg-slate-300",
    secondary: "bg-white text-slate-800 border border-slate-300 hover:bg-slate-50 disabled:opacity-60",
    danger: "bg-[#dc2626] text-white hover:bg-[#b91c1c]",
    success: "bg-[#16a34a] text-white hover:bg-[#15803d]",
    ghost: "text-slate-600 hover:text-slate-900 hover:bg-slate-100",
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-md font-medium transition disabled:cursor-not-allowed ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {icon && <Icon name={icon} className="w-4 h-4" />}
      {children}
    </button>
  );
};

const Modal = ({ open, onClose, title, children, footer }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
          <h3 className="font-semibold text-slate-900">{title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700"><Icon name="x" className="w-5 h-5" /></button>
        </div>
        <div className="px-5 py-4 text-sm text-slate-700">{children}</div>
        {footer && <div className="px-5 py-3 border-t border-slate-200 bg-slate-50 flex justify-end gap-2">{footer}</div>}
      </div>
    </div>
  );
};

const batteryTone = (b) => (b < 20 ? "bad" : b < 40 ? "warn" : "good");
const connTone = (c) => (c === "Online" ? "good" : "bad");
const syncTone = (s) => (s === "Synced" ? "good" : s === "Pending" ? "warn" : "bad");

Object.assign(window, { Icon, StatusBadge, Card, Button, Modal, batteryTone, connTone, syncTone });


// ===== nav.jsx =====
// Top navigation bar.

const TopNav = ({ active, onNavigate, hostName }) => {
  const items = [
    { id: "dashboard", label: "Dashboard", icon: "home" },
    { id: "schedule",  label: "Schedule Access", icon: "calendar" },
    { id: "properties", label: "Properties", icon: "building" },
    { id: "settings",  label: "Settings", icon: "gear" },
  ];
  return (
    <nav className="bg-[#1a1a2e] text-white" data-screen-label="00 Nav">
      <div className="max-w-[1200px] mx-auto px-8 h-16 flex items-center justify-between">
        <button
          onClick={() => onNavigate("dashboard")}
          className="flex items-center gap-3 group"
        >
          <div className="w-9 h-9 rounded-md bg-white/10 grid place-items-center border border-white/15">
            <Icon name="lock" className="w-5 h-5 text-white" />
          </div>
          <div className="text-left leading-tight">
            <div className="text-[10px] uppercase tracking-[0.2em] text-white/50">Schlage</div>
            <div className="text-sm font-semibold">AI Access Concierge</div>
          </div>
        </button>

        <div className="flex items-center gap-1">
          {items.map((it) => {
            const isActive = active === it.id || (it.id === "properties" && active === "property");
            return (
              <button
                key={it.id}
                onClick={() => onNavigate(it.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-md text-sm transition ${
                  isActive ? "bg-white/15 text-white" : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon name={it.icon} className="w-4 h-4" />
                {it.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right text-xs">
            <div className="text-white/50">Signed in</div>
            <div className="text-white/90 font-medium">{hostName}</div>
          </div>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-300 to-rose-400 grid place-items-center text-[#1a1a2e] font-semibold text-sm">
            {hostName.split(" ").map(w => w[0]).join("")}
          </div>
        </div>
      </div>
    </nav>
  );
};

window.TopNav = TopNav;


// ===== dashboard.jsx =====
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


// ===== alert-detail.jsx =====
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


// ===== scheduling.jsx =====
// AI Scheduling screen — natural language -> structured access code via Claude.

const SYSTEM_PROMPT = `You are an AI scheduling assistant for a smart lock management app used by short-term rental hosts.

Your job is to parse a natural-language access request and return a structured JSON object.

The host manages the following properties and locks:
- Property: "Beachside Studio", Lock: "Front Door Encode", Lock ID: "lock_001"
- Property: "Downtown Loft", Lock: "Main Entry Encode Plus", Lock ID: "lock_002"
- Property: "Mountain Cabin", Lock: "Cabin Door Encode", Lock ID: "lock_003"

The current date is __DATE__.

Existing bookings (check for conflicts):
- lock_001: Guest checked in June 5 3pm through June 8 11am
- lock_001: Guest checked in June 14 4pm through June 17 11am
- lock_002: Guest checked in June 6 3pm through June 9 11am
- lock_003: Guest checked in June 20 2pm through June 23 10am

Return ONLY a valid JSON object with this exact structure. Do not include any explanation or markdown.

{
  "parsed": {
    "who": "string — who is getting access (e.g. cleaning crew, guest name)",
    "lock_id": "string — which lock (lock_001, lock_002, or lock_003, infer from context or default to lock_001)",
    "lock_name": "string — human-readable lock name",
    "property_name": "string — property name",
    "schedule": "string — human-readable schedule description",
    "start": "ISO 8601 datetime of first access window start",
    "end": "ISO 8601 datetime of first access window end",
    "recurring": "boolean",
    "recurrence_description": "string or null"
  },
  "conflict": {
    "detected": "boolean",
    "description": "string or null — plain language description of the conflict if detected",
    "suggested_adjustment": "string or null — suggested alternative window if conflict detected"
  },
  "confidence": "number between 0 and 1",
  "clarification_needed": "boolean — true if request is too ambiguous to parse",
  "clarification_prompt": "string or null — question to ask the host if clarification is needed"
}

If the request does not specify a property, default to lock_001 (Beachside Studio).
If the request is completely unrelated to access scheduling, set clarification_needed to true.`;

const formatTimeRange = (startIso, endIso) => {
  try {
    const s = new Date(startIso);
    const e = new Date(endIso);
    const dOpts = { month: "short", day: "numeric" };
    const tOpts = { hour: "numeric", minute: "2-digit" };
    const sameDay = s.toDateString() === e.toDateString();
    if (sameDay) {
      return `${s.toLocaleDateString("en-US", dOpts)}, ${s.toLocaleTimeString("en-US", tOpts)} – ${e.toLocaleTimeString("en-US", tOpts)}`;
    }
    return `${s.toLocaleDateString("en-US", dOpts)} ${s.toLocaleTimeString("en-US", tOpts)} – ${e.toLocaleDateString("en-US", dOpts)} ${e.toLocaleTimeString("en-US", tOpts)}`;
  } catch {
    return `${startIso} – ${endIso}`;
  }
};

const ParsedRow = ({ label, value }) => (
  <div className="flex items-start gap-3 py-2 border-b border-slate-100 last:border-0">
    <div className="text-[10px] uppercase tracking-wider text-slate-400 w-20 pt-0.5">{label}</div>
    <div className="text-sm text-slate-800 font-medium flex-1">{value || "—"}</div>
  </div>
);

const ParsedCard = ({ parsed }) => (
  <div className="rounded-lg border border-slate-200 bg-white p-4">
    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Here's what I understood</div>
    <ParsedRow label="Who"    value={parsed.who} />
    <ParsedRow label="Lock"   value={`${parsed.lock_name} — ${parsed.property_name}`} />
    <ParsedRow label="When"   value={parsed.schedule} />
    <ParsedRow label="Window" value={parsed.start && parsed.end ? formatTimeRange(parsed.start, parsed.end) : null} />
    {parsed.recurring && parsed.recurrence_description && (
      <ParsedRow label="Repeats" value={parsed.recurrence_description} />
    )}
  </div>
);

const Scheduling = ({ properties, accessCodes, onAddCode, prefillLockId, onClearPrefill }) => {
  const [input, setInput] = React.useState("");
  const [selectedLockId, setSelectedLockId] = React.useState(prefillLockId || "");
  const [loading, setLoading] = React.useState(false);
  const [response, setResponse] = React.useState(null); // parsed full JSON
  const [error, setError] = React.useState(null);
  const [confirmed, setConfirmed] = React.useState(false); // becomes true after add / adjust

  React.useEffect(() => {
    if (prefillLockId) {
      setSelectedLockId(prefillLockId);
      onClearPrefill && onClearPrefill();
    }
  }, [prefillLockId]);

  const submit = async () => {
    if (!input.trim() || loading) return;
    setLoading(true);
    setError(null);
    setResponse(null);
    setConfirmed(false);

    const todayStr = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    let prompt = SYSTEM_PROMPT.replace("__DATE__", todayStr);
    if (selectedLockId) {
      const prop = properties.find(p => p.id === selectedLockId);
      if (prop) {
        prompt += `\n\nThe host has pre-selected the property "${prop.name}" (${prop.lockName}, ${prop.id}). Use this lock unless the request clearly references a different one.`;
      }
    }

    try {
      const reply = await window.claude.complete({
        messages: [
          { role: "user", content: `${prompt}\n\nRequest: ${input.trim()}` },
        ],
      });
      // Strip any stray markdown fences just in case.
      const cleaned = reply.replace(/^```(?:json)?/i, "").replace(/```$/, "").trim();
      const parsed = JSON.parse(cleaned);
      setResponse(parsed);
    } catch (e) {
      setError("Couldn't parse the response. Try rephrasing — e.g. include who, when, and which lock.");
    } finally {
      setLoading(false);
    }
  };

  const addCodeFromResponse = (override) => {
    if (!response || !response.parsed) return;
    const p = response.parsed;
    const lockId = p.lock_id || selectedLockId || "lock_001";
    const lockName = p.lock_name || properties.find(x => x.id === lockId)?.lockName || "—";
    const codeWindow = override?.window || (p.start && p.end ? formatTimeRange(p.start, p.end) : p.schedule);
    onAddCode({
      id: `c${Date.now()}`,
      name: p.who,
      type: /clean/i.test(p.who) ? "Cleaner" : /contractor|hvac|plumber/i.test(p.who) ? "Contractor" : "Guest",
      lockId,
      lockName,
      validFrom: codeWindow.split("–")[0]?.trim() || "—",
      validUntil: codeWindow.split("–")[1]?.trim() || "—",
      window: codeWindow,
      status: "Pending",
    });
    setConfirmed(true);
  };

  const renderResponse = () => {
    if (!response) return null;
    const { parsed, conflict, confidence, clarification_needed, clarification_prompt } = response;

    // Case 1: clarification
    if (clarification_needed) {
      return (
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
          <div className="flex items-start gap-3">
            <div className="text-blue-600 mt-0.5"><Icon name="spark" className="w-5 h-5" strokeWidth={2}/></div>
            <div>
              <div className="text-sm font-semibold text-blue-900">I need a bit more info</div>
              <div className="text-sm text-blue-800 mt-1">{clarification_prompt || "Could you rephrase that with a clearer who/when?"}</div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-3">
        <ParsedCard parsed={parsed} />

        {/* Case 2: conflict */}
        {conflict?.detected && !confirmed && (
          <div className="rounded-lg border border-[#fde68a] bg-[#fffbeb] p-4">
            <div className="flex items-start gap-3">
              <div className="text-[#d97706] mt-0.5"><Icon name="alert" className="w-5 h-5" strokeWidth={2}/></div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-amber-900">Conflict detected</div>
                <div className="text-sm text-amber-900 mt-1">{conflict.description}</div>
                {conflict.suggested_adjustment && (
                  <div className="text-sm text-amber-900 mt-2">
                    <span className="font-medium">Suggestion:</span> {conflict.suggested_adjustment}
                  </div>
                )}
                <div className="flex gap-2 mt-3">
                  <Button variant="primary" size="sm" onClick={() => addCodeFromResponse({ window: conflict.suggested_adjustment || (parsed.start && parsed.end ? formatTimeRange(parsed.start, parsed.end) : parsed.schedule) })}>
                    Yes, adjust
                  </Button>
                  <Button variant="secondary" size="sm" onClick={() => addCodeFromResponse()}>
                    Enter manually
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Case 3: low confidence */}
        {!conflict?.detected && !confirmed && confidence < 0.7 && (
          <div className="rounded-lg border border-[#fde68a] bg-[#fefce8] p-4">
            <div className="flex items-start gap-3">
              <div className="text-[#a16207] mt-0.5"><Icon name="spark" className="w-5 h-5" strokeWidth={2}/></div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-yellow-900">I want to make sure I understood correctly</div>
                <div className="text-sm text-yellow-900 mt-1">
                  I'm only {Math.round(confidence * 100)}% confident I parsed this correctly. Please confirm the details above before I push the code.
                </div>
                <div className="flex gap-2 mt-3">
                  <Button variant="primary" size="sm" onClick={() => addCodeFromResponse()}>Looks right — schedule it</Button>
                  <Button variant="secondary" size="sm" onClick={() => { setResponse(null); }}>Let me rephrase</Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Case 4: success (no conflict, high confidence, or after confirm) */}
        {(confirmed || (!conflict?.detected && confidence >= 0.7)) && (
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
            <div className="flex items-start gap-3">
              <div className="text-[#16a34a] mt-0.5"><Icon name="check" className="w-5 h-5" strokeWidth={2.5}/></div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-emerald-900">
                  {confirmed ? "Access scheduled" : "Ready to schedule"}
                </div>
                <div className="text-sm text-emerald-900 mt-1">
                  {confirmed
                    ? `Code synced to ${parsed.lock_name}. ${parsed.who} will have access ${parsed.recurring ? parsed.recurrence_description : "during the window above"}.`
                    : `No conflicts found. I'll push this code to ${parsed.lock_name} when you confirm.`
                  }
                </div>
                {!confirmed && (
                  <div className="flex gap-2 mt-3">
                    <Button variant="success" size="sm" onClick={() => addCodeFromResponse()} icon="check">Confirm & sync</Button>
                    <Button variant="secondary" size="sm" onClick={() => setResponse(null)}>Edit</Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const examples = [
    "Give the cleaning crew access every Saturday from 11am to 2pm in June",
    "Maria checks into Downtown Loft June 6 from 10am to 5pm",
    "HVAC tech needs the cabin tomorrow 9am-noon",
  ];

  return (
    <div className="space-y-6" data-screen-label="03 Schedule Access">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900 tracking-tight">Schedule Access</h1>
        <p className="text-sm text-slate-600 mt-1">Describe who needs access in plain language. I'll handle the rest — parsing, conflict checks, and syncing the code to the lock.</p>
      </div>

      <Card className="p-5">
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs uppercase tracking-wider font-semibold text-slate-500">Property</label>
        </div>
        <select
          value={selectedLockId}
          onChange={(e) => setSelectedLockId(e.target.value)}
          className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm text-slate-800 mb-4 bg-white"
        >
          <option value="">Auto-detect from request</option>
          {properties.map((p) => (
            <option key={p.id} value={p.id}>{p.name} — {p.lockName}</option>
          ))}
        </select>

        <label className="text-xs uppercase tracking-wider font-semibold text-slate-500">Your request</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) submit(); }}
          rows={3}
          placeholder="e.g., Give the cleaning crew access from 11am to 2pm every Saturday in June"
          className="w-full mt-1.5 border border-slate-300 rounded-md px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1a1a2e]/20 focus:border-[#1a1a2e] resize-none"
        />

        <div className="flex flex-wrap items-center gap-2 mt-3">
          <span className="text-xs text-slate-500">Try:</span>
          {examples.map((ex) => (
            <button
              key={ex}
              onClick={() => setInput(ex)}
              className="text-xs px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
            >
              {ex}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="text-xs text-slate-400">⌘+Enter to submit · powered by Claude</div>
          <Button variant="primary" onClick={submit} disabled={loading || !input.trim()} icon={loading ? null : "spark"}>
            {loading ? "Parsing…" : "Schedule"}
          </Button>
        </div>
      </Card>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">{error}</div>
      )}

      {renderResponse()}

      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Access code log</h2>
          <div className="text-xs text-slate-400">{accessCodes.length} codes</div>
        </div>
        <Card className="overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="text-left font-semibold px-4 py-3">Name</th>
                <th className="text-left font-semibold px-4 py-3">Type</th>
                <th className="text-left font-semibold px-4 py-3">Lock</th>
                <th className="text-left font-semibold px-4 py-3">Window</th>
                <th className="text-left font-semibold px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {accessCodes.slice().reverse().map((c) => (
                <tr key={c.id} className="border-t border-slate-100">
                  <td className="px-4 py-3 text-slate-900 font-medium">{c.name}</td>
                  <td className="px-4 py-3 text-slate-600">{c.type}</td>
                  <td className="px-4 py-3 text-slate-600">{c.lockName}</td>
                  <td className="px-4 py-3 text-slate-600">{c.window || `${c.validFrom} – ${c.validUntil}`}</td>
                  <td className="px-4 py-3"><StatusBadge status={c.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
};

window.Scheduling = Scheduling;


// ===== property-detail.jsx =====
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


// ===== other-screens.jsx =====
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


// ===== app.jsx =====
// Main App — state, navigation, glue.

const { useState, useEffect } = React;

const App = () => {
  const [properties, setProperties] = useState(window.INITIAL_PROPERTIES);
  const [accessCodes, setAccessCodes] = useState(window.INITIAL_ACCESS_CODES);
  const [screen, setScreen] = useState("dashboard"); // dashboard, alert, schedule, properties, property, settings
  const [selectedId, setSelectedId] = useState(null);
  const [schedulePrefillLock, setSchedulePrefillLock] = useState(null);

  const hostName = "Jess Reyes";
  const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

  const handleNavigate = (id) => {
    if (id === "schedule") { setSchedulePrefillLock(null); }
    setScreen(id);
  };

  const handleView = (propId) => {
    setSelectedId(propId);
    setScreen("property");
  };

  const handleResolve = (propId) => {
    setSelectedId(propId);
    setScreen("alert");
  };

  const handleRefreshCode = (propId) => {
    // After Refresh Access Code: At Risk -> All Clear, clear alert, mark code synced.
    setProperties((prev) => prev.map((p) => {
      if (p.id !== propId) return p;
      return {
        ...p,
        status: "All Clear",
        codeSync: "Synced",
        battery: p.battery < 20 ? 18 : p.battery, // slight bump from refresh re-pairing
        alert: null,
      };
    }));
  };

  const handleAddCode = (code) => {
    setAccessCodes((prev) => [...prev, code]);
  };

  const handleAddAccess = (propId) => {
    setSchedulePrefillLock(propId);
    setScreen("schedule");
  };

  const currentProperty = properties.find((p) => p.id === selectedId);

  let body = null;
  if (screen === "dashboard") {
    body = (
      <Dashboard
        properties={properties}
        hostName={hostName}
        today={today}
        onView={handleView}
        onResolve={handleResolve}
        onSchedule={() => setScreen("schedule")}
      />
    );
  } else if (screen === "alert" && currentProperty) {
    body = (
      <AlertDetail
        property={currentProperty}
        onBack={() => setScreen("dashboard")}
        onRefreshCode={handleRefreshCode}
        onNotifyCohost={() => {}}
        onContactSupport={() => {}}
      />
    );
  } else if (screen === "schedule") {
    body = (
      <Scheduling
        properties={properties}
        accessCodes={accessCodes}
        onAddCode={handleAddCode}
        prefillLockId={schedulePrefillLock}
        onClearPrefill={() => setSchedulePrefillLock(null)}
      />
    );
  } else if (screen === "properties") {
    body = <PropertiesList properties={properties} onView={handleView} />;
  } else if (screen === "property" && currentProperty) {
    body = (
      <PropertyDetail
        property={currentProperty}
        codes={accessCodes}
        history={window.BATTERY_HISTORY[currentProperty.id]}
        onBack={() => setScreen("dashboard")}
        onAddAccess={handleAddAccess}
      />
    );
  } else if (screen === "settings") {
    body = <Settings />;
  } else {
    body = <Dashboard properties={properties} hostName={hostName} today={today} onView={handleView} onResolve={handleResolve} onSchedule={() => setScreen("schedule")} />;
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <TopNav active={screen} onNavigate={handleNavigate} hostName={hostName} />
      <main className="max-w-[1200px] mx-auto px-8 py-8">
        {body}
      </main>
      <footer className="max-w-[1200px] mx-auto px-8 pb-10 pt-2 text-xs text-slate-400">
        Schlage AI Access Concierge · prototype · MGMT 275
      </footer>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

