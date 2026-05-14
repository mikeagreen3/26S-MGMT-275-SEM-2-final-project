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
