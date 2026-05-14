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
