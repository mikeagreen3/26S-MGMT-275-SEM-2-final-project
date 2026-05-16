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
