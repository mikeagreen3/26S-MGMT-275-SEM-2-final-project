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
