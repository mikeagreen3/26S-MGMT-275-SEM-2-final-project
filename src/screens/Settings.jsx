import Icon from '../components/Icon'
import Card from '../components/Card'

const CHANNEL_ROWS = [
  { key: 'sms',    label: 'SMS',    sub: 'Text message to the number on file. Max 160 characters.' },
  { key: 'push',   label: 'Push',   sub: 'Mobile push notification. Best for time-sensitive alerts.' },
  { key: 'in_app', label: 'In-App', sub: 'Banner on the dashboard plus full detail on the Action screen.' },
]

export default function Settings({ settings, onSettingsChange }) {
  const channels = settings?.channels || { sms: false, push: true, in_app: false }
  const updateChannel = (k, v) => onSettingsChange({ ...settings, channels: { ...channels, [k]: v } })
  const toggleDev = (v) => onSettingsChange({ ...settings, developerMode: v })

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900 tracking-tight">Settings</h1>
        <p className="text-sm text-slate-600 mt-1">Notifications and developer options.</p>
      </div>

      <Card className="p-6">
        <div>
          <h2 className="text-base font-semibold text-slate-900">Alert channels</h2>
          <p className="text-sm text-slate-500 mt-1">Pick one or more channels for lock-health alerts. We default to Push.</p>
        </div>
        <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3">
          {CHANNEL_ROWS.map((row) => {
            const on = !!channels[row.key]
            return (
              <button
                key={row.key}
                onClick={() => updateChannel(row.key, !on)}
                role="checkbox"
                aria-checked={on}
                className={`text-left rounded-lg border p-4 transition ${
                  on ? 'border-[#1a1a2e] bg-[#1a1a2e]/[0.04] ring-1 ring-[#1a1a2e]/30' : 'border-slate-200 bg-white hover:border-slate-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-slate-900">{row.label}</div>
                  <div className={`w-5 h-5 rounded grid place-items-center border-2 transition ${
                    on ? 'bg-[#1a1a2e] border-[#1a1a2e] text-white' : 'border-slate-300 text-transparent'
                  }`}>
                    <Icon name="check" className="w-3.5 h-3.5" strokeWidth={3} />
                  </div>
                </div>
                <div className="text-xs text-slate-500 mt-1.5 leading-snug">{row.sub}</div>
              </button>
            )
          })}
        </div>
        <div className="text-xs text-slate-500 mt-3">
          {Object.entries(channels).filter(([, v]) => v).length === 0
            ? <span className="text-[#d97706] font-medium">At least one channel must be enabled.</span>
            : <>Sending to: <span className="font-medium text-slate-700">{Object.entries(channels).filter(([, v]) => v).map(([k]) => k.replace('_', '-').toUpperCase()).join(' · ')}</span></>}
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-base font-semibold text-slate-900">Developer mode</h2>
        <p className="text-sm text-slate-500 mt-1">For eval demos. Reveals the channel previews, validation checks, character counts, and raw AI JSON on the Lock Details screen.</p>
        <div className="mt-5 flex items-center justify-between py-3 border-t border-slate-100">
          <div>
            <div className="text-sm font-semibold text-slate-900">Show developer panel</div>
            <div className="text-xs text-slate-500 mt-0.5">Off by default. Turn on for the AI evaluation demo.</div>
          </div>
          <button
            onClick={() => toggleDev(!settings?.developerMode)}
            role="switch"
            aria-checked={!!settings?.developerMode}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${settings?.developerMode ? 'bg-[#1a1a2e]' : 'bg-slate-300'}`}
          >
            <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${settings?.developerMode ? 'translate-x-5' : 'translate-x-0.5'}`} />
          </button>
        </div>
      </Card>

      <Card className="p-6 opacity-70">
        <h2 className="text-base font-semibold text-slate-900">Account</h2>
        <p className="text-sm text-slate-500 mt-1">Profile, billing, and integrations — coming soon.</p>
      </Card>
    </div>
  )
}
