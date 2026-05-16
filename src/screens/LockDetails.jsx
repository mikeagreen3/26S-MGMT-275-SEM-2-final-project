import { useState } from 'react'
import Icon from '../components/Icon'
import StatusBadge from '../components/StatusBadge'
import Card from '../components/Card'
import Button from '../components/Button'
import { batteryTone, connTone, syncTone } from '../lib/utils'
import { HEALTH_CHECK_HISTORY, CHECKIN_HISTORY } from '../data/index'

function BatteryChart({ history, currentTone }) {
  const W = 600, H = 160, P = 28
  const max = 100
  const xStep = (W - P * 2) / (history.length - 1)
  const points = history.map((v, i) => [P + i * xStep, H - P - ((v / max) * (H - P * 2))])
  const pathD = points.map((pt, i) => `${i === 0 ? 'M' : 'L'} ${pt[0]} ${pt[1]}`).join(' ')
  const areaD = `${pathD} L ${points[points.length - 1][0]} ${H - P} L ${points[0][0]} ${H - P} Z`
  const accent = currentTone === 'bad' ? '#dc2626' : currentTone === 'warn' ? '#d97706' : '#16a34a'
  const fillId = `bf-${accent.replace('#', '')}`
  const days = ['6d', '5d', '4d', '3d', '2d', '1d', 'Today']
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
          <line x1={P} x2={W - P} y1={H - P - (y / max) * (H - P * 2)} y2={H - P - (y / max) * (H - P * 2)} stroke="#e2e8f0" strokeDasharray="2 4" />
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
      <text x={points[points.length - 1][0] - 6} y={points[points.length - 1][1] - 10} textAnchor="end" fontSize="11" fontWeight="600" fill={accent}>
        {history[history.length - 1]}%
      </text>
    </svg>
  )
}

function SignalDetail({ icon, label, value, sublabel, tone }) {
  const toneClass = {
    good: { bg: 'bg-emerald-50', text: 'text-[#16a34a]', border: 'border-emerald-200' },
    warn: { bg: 'bg-amber-50',  text: 'text-[#d97706]', border: 'border-amber-200' },
    bad:  { bg: 'bg-red-50',    text: 'text-[#dc2626]', border: 'border-red-200' },
    mute: { bg: 'bg-slate-50',  text: 'text-slate-600', border: 'border-slate-200' },
  }[tone]
  return (
    <div className={`rounded-lg border ${toneClass.border} ${toneClass.bg} p-4`}>
      <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-slate-500 mb-2">
        <Icon name={icon} className={`w-4 h-4 ${toneClass.text}`} strokeWidth={2} />
        {label}
      </div>
      <div className={`text-2xl font-semibold ${toneClass.text}`}>{value}</div>
      {sublabel && <div className="text-xs text-slate-600 mt-1">{sublabel}</div>}
    </div>
  )
}

export default function LockDetails({ property, codes, history, onBack, onAddAccess, settings, alertCopyCache }) {
  const p = property
  const propCodes = codes.filter((c) => c.lockId === p.id)
  const healthChecks = HEALTH_CHECK_HISTORY[p.id] || []
  const checkins = CHECKIN_HISTORY[p.id] || []
  const aiResult = alertCopyCache?.[p.id]
  const [showDev, setShowDev] = useState(false)

  const toneColor = (t) => t === 'bad' ? 'text-[#dc2626]' : t === 'warn' ? 'text-[#d97706]' : 'text-[#16a34a]'

  return (
    <div className="space-y-6">
      <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900">
        <Icon name="arrow-left" className="w-4 h-4" /> Back to dashboard
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

      {/* Lock Health */}
      <div>
        <h3 className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-3">Lock Health</h3>
        <div className="grid grid-cols-3 gap-3">
          <SignalDetail icon="battery" label="Battery" value={`${p.battery}%`} sublabel={p.battery < 20 ? 'Replace within 24 hours' : p.battery < 40 ? 'Monitor closely' : 'Healthy range'} tone={batteryTone(p.battery)} />
          <SignalDetail icon={p.connectivity === 'Online' ? 'wifi' : 'wifi-off'} label="Connectivity" value={p.connectivity} sublabel={p.connectivity === 'Online' ? 'Strong signal · last seen 2 min ago' : 'Last seen 6 hours ago'} tone={connTone(p.connectivity)} />
          <SignalDetail icon="sync" label="Code Sync" value={p.codeSync} sublabel={p.codeSync === 'Synced' ? 'Last sync 4 min ago' : 'Code awaiting push'} tone={syncTone(p.codeSync)} />
        </div>
      </div>

      {/* Battery chart */}
      <Card className="p-5">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Battery — last 7 days</h3>
            <div className="text-xs text-slate-500">Tracking trend so you can replace batteries before they fail.</div>
          </div>
        </div>
        <BatteryChart history={history} currentTone={batteryTone(p.battery)} />
      </Card>

      {/* Recent health checks */}
      <Card className="overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Recent health checks</h3>
            <div className="text-xs text-slate-500">Background pings every 4 hours. Last {healthChecks.length} shown.</div>
          </div>
          <div className="text-[10px] uppercase tracking-wider text-slate-400">Automated</div>
        </div>
        {healthChecks.length === 0 ? (
          <div className="px-5 py-8 text-sm text-slate-500 text-center">No checks logged yet.</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="text-left font-semibold px-5 py-3">Timestamp</th>
                <th className="text-left font-semibold px-5 py-3">Outcome</th>
                <th className="text-left font-semibold px-5 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {healthChecks.map((h, i) => (
                <tr key={i} className="border-t border-slate-100">
                  <td className="px-5 py-3 text-slate-700 font-medium whitespace-nowrap">{h.ts}</td>
                  <td className={`px-5 py-3 ${toneColor(h.tone)} font-medium`}>{h.outcome}</td>
                  <td className="px-5 py-3 text-right">
                    <Icon name={h.tone === 'good' ? 'check' : 'alert'} className={`w-4 h-4 inline ${toneColor(h.tone)}`} strokeWidth={2.5} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>

      {/* Recent check-ins */}
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
            {checkins.map((h, i) => (
              <tr key={i} className="border-t border-slate-100">
                <td className="px-5 py-3 text-slate-900 font-medium">{h.guest}</td>
                <td className="px-5 py-3 text-slate-600">{h.date}</td>
                <td className="px-5 py-3"><StatusBadge status={h.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Active access codes */}
      <Card className="overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Active access codes</h3>
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

      {/* Developer mode panel */}
      {settings?.developerMode && (
        <div className="rounded-lg border border-slate-300 border-dashed bg-slate-50">
          <button onClick={() => setShowDev(!showDev)} className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-slate-100 rounded-lg">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 bg-slate-200 rounded px-1.5 py-0.5">Dev</span>
              <span className="text-sm font-semibold text-slate-800">Alert copy: channels + validation</span>
              {aiResult
                ? <span className="text-xs text-slate-500">{Object.values(aiResult.validation?.checks || {}).filter((c) => c.pass).length}/{Object.keys(aiResult.validation?.checks || {}).length} checks passed · source: {aiResult.source}</span>
                : <span className="text-xs text-slate-500">Open the Action screen first to generate copy</span>}
            </div>
            <span className="text-slate-400 text-sm">{showDev ? 'Hide' : 'Show'}</span>
          </button>
          {showDev && aiResult && (
            <div className="px-4 pb-4 space-y-5 text-xs">
              {/* Channel previews */}
              <div>
                <div className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 mb-2">Channel previews</div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="rounded-lg border border-slate-200 bg-white overflow-hidden">
                    <div className="px-3 py-2 bg-slate-100 border-b border-slate-200 flex items-center justify-between">
                      <div className="text-xs font-semibold text-slate-700">SMS</div>
                      <div className="text-[10px] text-slate-400">{aiResult.copy.sms.body.length}/160</div>
                    </div>
                    <div className="p-3">
                      <div className="rounded-2xl rounded-bl-sm bg-slate-100 text-sm text-slate-900 px-3 py-2 leading-relaxed">{aiResult.copy.sms.body}</div>
                      <div className="text-[10px] text-slate-400 mt-1.5">Schlage · just now</div>
                    </div>
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-white overflow-hidden">
                    <div className="px-3 py-2 bg-slate-100 border-b border-slate-200 flex items-center justify-between">
                      <div className="text-xs font-semibold text-slate-700">Push</div>
                      <div className="text-[10px] text-slate-400">{aiResult.copy.push.title.length}/50 · {aiResult.copy.push.body.length}/120</div>
                    </div>
                    <div className="p-3">
                      <div className="rounded-xl bg-white border border-slate-200 shadow-sm px-3 py-2.5">
                        <div className="flex items-center gap-2 text-[10px] text-slate-500 uppercase tracking-wide">
                          <div className="w-3 h-3 rounded-sm bg-[#0072BC]"></div>
                          Schlage · now
                        </div>
                        <div className="text-sm font-semibold text-slate-900 mt-1">{aiResult.copy.push.title}</div>
                        <div className="text-xs text-slate-700 mt-0.5">{aiResult.copy.push.body}</div>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-white overflow-hidden">
                    <div className="px-3 py-2 bg-slate-100 border-b border-slate-200 flex items-center justify-between">
                      <div className="text-xs font-semibold text-slate-700">In-App</div>
                      <div className="text-[10px] text-slate-400">{aiResult.copy.in_app.headline.length}/80 · {aiResult.copy.in_app.body.length}/280</div>
                    </div>
                    <div className="p-3">
                      <div className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2.5">
                        <div className="text-sm font-semibold text-slate-900">{aiResult.copy.in_app.headline}</div>
                        <div className="text-xs text-slate-700 mt-1 leading-relaxed">{aiResult.copy.in_app.body}</div>
                        <div className="mt-2 inline-block text-[11px] font-medium text-white bg-[#0072BC] rounded px-2 py-1">{aiResult.copy.in_app.primary_cta}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Validation checks */}
              <div>
                <div className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 mb-2">Validation</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {Object.entries(aiResult.validation.checks).map(([k, v]) => (
                    <div key={k} className={`rounded border px-3 py-2 flex items-start gap-2 ${v.pass ? 'border-emerald-200 bg-emerald-50' : 'border-red-200 bg-red-50'}`}>
                      <span className={`mt-0.5 ${v.pass ? 'text-[#16a34a]' : 'text-[#dc2626]'}`}>
                        <Icon name={v.pass ? 'check' : 'x'} className="w-3.5 h-3.5" strokeWidth={2.5} />
                      </span>
                      <div className="min-w-0">
                        <div className="font-semibold text-slate-800">{v.label || k}</div>
                        <div className="text-slate-600 mt-0.5 break-words">{v.detail}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Character counts */}
              <div>
                <div className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 mb-2">Character counts</div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {[
                    ['sms.body', aiResult.copy.sms.body.length, 160],
                    ['push.title', aiResult.copy.push.title.length, 50],
                    ['push.body', aiResult.copy.push.body.length, 120],
                    ['in_app.headline', aiResult.copy.in_app.headline.length, 80],
                    ['in_app.body', aiResult.copy.in_app.body.length, 280],
                    ['in_app.primary_cta', aiResult.copy.in_app.primary_cta.length, 30],
                  ].map(([name, len, max]) => {
                    const pct = Math.min(100, (len / max) * 100)
                    const over = len > max
                    return (
                      <div key={name} className="rounded border border-slate-200 bg-white px-3 py-2">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-mono text-slate-700">{name}</span>
                          <span className={over ? 'text-[#dc2626] font-semibold' : 'text-slate-500'}>{len}/{max}</span>
                        </div>
                        <div className="h-1 rounded-full bg-slate-100 mt-1.5 overflow-hidden">
                          <div className={over ? 'bg-[#dc2626]' : pct > 90 ? 'bg-[#d97706]' : 'bg-[#16a34a]'} style={{ width: `${pct}%`, height: '100%' }} />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Raw JSON */}
              <div>
                <div className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 mb-2">Raw JSON output</div>
                <pre className="rounded border border-slate-200 bg-[#1a1a2e] text-slate-100 p-3 overflow-x-auto text-[11px] leading-relaxed font-mono">
                  {JSON.stringify(aiResult.raw || aiResult.copy, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
