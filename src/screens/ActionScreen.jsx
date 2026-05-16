import { useState, useEffect } from 'react'
import Icon from '../components/Icon'
import StatusBadge from '../components/StatusBadge'
import Card from '../components/Card'
import Button from '../components/Button'
import Modal from '../components/Modal'
import {
  SCHEDULED_LABELS, formatTimeUntil, formatScheduledLabel,
  defaultScheduleIso, SNOOZE_PRESETS,
} from '../lib/utils'
import {
  buildAlertContext, generateAlertCopy, validateAlertCopy,
  templatedFallback, expectedPrimaryAction,
} from '../lib/alertCopy'

const ACTION_DEFS = {
  refresh_code: {
    icon: 'sync',
    primaryLabel: 'Refresh access code now',
    primaryLoadingLabel: 'Pushing fresh code to the lock…',
    escLabel: 'Refresh access code',
    escDesc: 'Force a fresh code push to the lock and verify it stored.',
    successHeadline: 'Code refreshed',
    successBody: (p) => `${p.nextCheckIn.guest} is good to go. We'll keep monitoring and ping you only if something changes.`,
  },
  notify_cohost: {
    icon: 'user',
    primaryLabel: 'Notify your co-host',
    primaryLoadingLabel: 'Notifying co-host…',
    escLabel: 'Notify co-host',
    escDesc: 'Send a pre-written SMS to Diego with the address and what to check.',
    successHeadline: 'Co-host notified',
    successBody: (p) => `Diego will swing by ${p.name} to check the lock before ${p.nextCheckIn.guest} arrives. We'll mark this as Action Pending until the lock reports healthy again.`,
  },
  contact_support: {
    icon: 'spark',
    primaryLabel: 'Contact Schlage support',
    primaryLoadingLabel: 'Opening priority ticket…',
    escLabel: 'Contact Schlage support',
    escDesc: 'Open a priority ticket. A specialist responds within 15 minutes.',
    successHeadline: 'Support contacted',
    successBody: () => "A Schlage specialist will reach out within 15 minutes. We've attached the diagnostic snapshot automatically and will hold the lock in Action Pending until support confirms a fix.",
  },
  replace_battery: {
    icon: 'battery',
    primaryLabel: 'Replace battery in person',
    primaryLoadingLabel: 'Replace battery in person',
    escLabel: 'Replace battery in person',
    escDesc: 'Step-by-step guide for swapping AA batteries on this lock model.',
    successHeadline: 'Batteries replaced',
    successBody: (p) => `Great. We'll verify the new battery level on the next health check and clear the alert automatically before ${p.nextCheckIn.guest} arrives.`,
  },
}
const ACTION_ORDER = ['refresh_code', 'replace_battery', 'notify_cohost', 'contact_support']

export default function ActionScreen({
  property, onBack, onRefreshCode, onActionTaken, onScheduleAction,
  onSnooze, onViewLockDetails, alertCopyCache, onCacheAlertCopy,
}) {
  const p = property
  const [activeAction, setActiveAction] = useState(null)
  const [refreshState, setRefreshState] = useState('idle')
  const [successContext, setSuccessContext] = useState(null)
  const [cohostStep, setCohostStep] = useState(null)
  const [batteryStep, setBatteryStep] = useState(null)
  const [supportOpen, setSupportOpen] = useState(false)
  const [cohostSent, setCohostSent] = useState(false)
  const [supportSent, setSupportSent] = useState(false)
  const [scheduleTime, setScheduleTime] = useState(() => defaultScheduleIso(property))

  const cached = alertCopyCache?.[p.id]
  const [copyState, setCopyState] = useState(cached || { status: 'loading' })

  useEffect(() => {
    if (cached) { setCopyState(cached); return }
    if (!p.alert) { setCopyState({ status: 'none' }); return }
    let cancelled = false
    setCopyState({ status: 'loading' })
    const context = buildAlertContext(p)
    ;(async () => {
      let raw, copy, validation, source
      try {
        raw = await generateAlertCopy(context)
        validation = validateAlertCopy(raw, context)
        if (validation.passed) { copy = raw; source = 'ai' }
        else { console.warn('[alert-copy] validation failed, using template:', validation.checks); copy = templatedFallback(context); source = 'fallback' }
      } catch (e) {
        console.warn('[alert-copy] API error, using template:', e.message)
        copy = templatedFallback(context)
        validation = { passed: false, checks: { schema: { label: 'Schema valid', pass: false, detail: `API error: ${e.message}` } } }
        source = 'fallback'
      }
      if (cancelled) return
      const result = { status: 'ready', copy, validation, context, source, raw }
      setCopyState(result)
      onCacheAlertCopy?.(p.id, result)
    })()
    return () => { cancelled = true }
  }, [p.id])

  const isOffline = p.status === 'Offline'
  const accent = isOffline ? 'red' : 'amber'
  const bannerBg = accent === 'red' ? 'bg-[#fef2f2] border-[#fecaca]' : 'bg-[#fffbeb] border-[#fde68a]'
  const bannerAccent = accent === 'red' ? 'text-[#dc2626]' : 'text-[#d97706]'

  const commit = (info) => {
    setActiveAction(info.actionKey)
    setSuccessContext(info)
    setRefreshState('success')
    if (info.kind === 'did') {
      if (info.actionKey === 'refresh_code') onRefreshCode(p.id)
      else onActionTaken(p.id, info.actionKey)
    } else if (info.kind === 'scheduled') {
      onScheduleAction(p.id, info.actionKey, info.dueAt)
    } else if (info.kind === 'snoozed') {
      onSnooze(p.id, info.until)
    }
  }

  const handleRefresh = () => {
    if (refreshState !== 'idle') return
    setActiveAction('refresh_code')
    setRefreshState('running')
    setTimeout(() => {
      setRefreshState('success')
      setSuccessContext({ kind: 'did', actionKey: 'refresh_code' })
      onRefreshCode(p.id)
    }, 2000)
  }

  const sendCohost = () => {
    setCohostSent(true)
    setTimeout(() => { setCohostStep(null); setCohostSent(false); commit({ kind: 'did', actionKey: 'notify_cohost' }) }, 1500)
  }
  const sendSupport = () => {
    setSupportSent(true)
    setTimeout(() => { setSupportOpen(false); setSupportSent(false); commit({ kind: 'did', actionKey: 'contact_support' }) }, 1500)
  }
  const confirmBatteryReplaced = () => { setBatteryStep(null); commit({ kind: 'did', actionKey: 'replace_battery' }) }

  const parseScheduleMs = () => { const ms = new Date(scheduleTime).getTime(); return Number.isFinite(ms) ? ms : Date.now() + 4 * 3600 * 1000 }

  const scheduleFor = (actionKey) => {
    const dueAt = parseScheduleMs()
    setCohostStep(null); setBatteryStep(null)
    commit({ kind: 'scheduled', actionKey, dueAt })
  }
  const snoozeFor = (preset) => {
    const until = preset.ms ? Date.now() + preset.ms : preset.at()
    setCohostStep(null); setBatteryStep(null)
    commit({ kind: 'snoozed', actionKey: activeAction || 'replace_battery', until })
  }
  const snoozeCustom = () => {
    const until = parseScheduleMs()
    setCohostStep(null); setBatteryStep(null)
    commit({ kind: 'snoozed', actionKey: activeAction || 'replace_battery', until })
  }

  const runAction = (key) => {
    if (refreshState !== 'idle') return
    setActiveAction(key)
    if (key === 'refresh_code') return handleRefresh()
    if (key === 'notify_cohost') return setCohostStep('choice')
    if (key === 'contact_support') return setSupportOpen(true)
    if (key === 'replace_battery') return setBatteryStep('choice')
  }

  const loading = copyState.status === 'loading'
  const copy = copyState.copy
  const headline = loading ? 'Loading alert…' : (copy?.in_app?.headline || p.alert?.title || 'Action required')
  const body = loading ? 'Generating alert copy…' : (copy?.in_app?.body || p.alert?.body || '')

  const primaryKey = (copy && ACTION_DEFS[copy.primary_action])
    ? copy.primary_action
    : expectedPrimaryAction(buildAlertContext(p))
  const primaryDef = ACTION_DEFS[primaryKey]
  const escalationKeys = ACTION_ORDER.filter((k) => k !== primaryKey)

  // SUCCESS STATE
  if (refreshState === 'success') {
    const def = ACTION_DEFS[activeAction] || ACTION_DEFS.refresh_code
    const ctx = successContext || { kind: 'did', actionKey: activeAction }
    let headlineText, bodyText
    if (ctx.kind === 'scheduled') {
      headlineText = 'Action scheduled'
      bodyText = `${SCHEDULED_LABELS[ctx.actionKey] || 'Action'} ${formatScheduledLabel(ctx.dueAt)}. We'll remind you and hold the card in Action Scheduled until you mark it complete.`
    } else if (ctx.kind === 'snoozed') {
      headlineText = 'Reminder set'
      bodyText = `We'll nudge you ${formatTimeUntil(ctx.until)} (${new Date(ctx.until).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}). The alert stays visible but quieted on the dashboard.`
    } else {
      headlineText = def.successHeadline
      bodyText = def.successBody(p)
    }
    return (
      <div className="space-y-5 max-w-2xl mx-auto">
        <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900">
          <Icon name="arrow-left" className="w-4 h-4" /> Back to dashboard
        </button>
        <div className="flex items-start justify-between">
          <div>
            <div className="text-xs text-slate-500 uppercase tracking-wide">{p.lockName}</div>
            <h1 className="text-2xl font-semibold text-slate-900 mt-0.5">{p.name}</h1>
          </div>
          <StatusBadge status={p.status} size="lg" />
        </div>
        <Card className="p-8 text-center border-emerald-200">
          <div className="inline-flex w-14 h-14 rounded-full bg-emerald-100 grid place-items-center mb-4">
            <Icon name={ctx.kind === 'scheduled' ? 'calendar-clock' : ctx.kind === 'snoozed' ? 'moon' : 'check'} className="w-7 h-7 text-[#16a34a]" strokeWidth={2.5} />
          </div>
          <h2 className="text-xl font-semibold text-slate-900">{headlineText}</h2>
          <p className="text-sm text-slate-700 mt-2 leading-relaxed max-w-md mx-auto">{bodyText}</p>
          <div className="mt-6">
            <Button variant="primary" onClick={onBack}>Back to dashboard</Button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-5 max-w-2xl mx-auto">
      <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900">
        <Icon name="arrow-left" className="w-4 h-4" /> Back to dashboard
      </button>

      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs text-slate-500 uppercase tracking-wide">{p.lockName}</div>
          <h1 className="text-2xl font-semibold text-slate-900 mt-0.5">{p.name}</h1>
        </div>
        <StatusBadge status={p.status} size="lg" />
      </div>

      {/* AI-generated alert card */}
      <div className={`rounded-lg border ${bannerBg} p-5`}>
        <div className="flex items-start gap-3">
          <div className={`${bannerAccent} mt-0.5`}><Icon name="alert" className="w-6 h-6" strokeWidth={2} /></div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-base font-semibold text-slate-900">{headline}</h2>
              {!loading && copyState.source && (
                <span className="inline-flex items-center gap-1 text-[11px] text-slate-500 bg-slate-100 border border-slate-200 rounded-full px-2 py-0.5" title={copyState.source === 'ai' ? 'Generated by Claude for this specific alert' : 'AI output failed validation — using templated fallback'}>
                  <Icon name="spark" className="w-3 h-3" strokeWidth={2} />
                  {copyState.source === 'ai' ? 'AI-generated' : 'AI fallback'}
                </span>
              )}
              {loading && (
                <span className="inline-flex items-center gap-1 text-[11px] text-slate-400">
                  <Icon name="sync" className="w-3 h-3 animate-spin" strokeWidth={2} /> Generating…
                </span>
              )}
            </div>
            <p className="text-sm text-slate-700 mt-1.5 leading-relaxed">{body}</p>
            <div className="flex items-center gap-2 mt-3 text-sm">
              <Icon name="clock" className={`w-4 h-4 ${bannerAccent}`} strokeWidth={2} />
              <span className="font-semibold text-slate-800">{p.nextCheckIn.hoursAway} hours remaining</span>
              <span className="text-slate-500">until {p.nextCheckIn.guest} checks in</span>
            </div>
          </div>
        </div>
      </div>

      {/* Primary action button */}
      <button
        onClick={() => runAction(primaryKey)}
        disabled={refreshState !== 'idle' || loading}
        className={`w-full rounded-lg px-6 py-5 text-white font-semibold text-base transition flex items-center justify-center gap-2.5 ${
          refreshState === 'running'
            ? 'bg-slate-400 cursor-wait'
            : 'bg-[#0072BC] hover:bg-[#005A9D] shadow-[0_4px_12px_rgba(15,23,42,0.18)] disabled:opacity-60 disabled:cursor-wait'
        }`}
      >
        <Icon name={primaryDef.icon} className={`w-5 h-5 ${refreshState === 'running' && primaryKey === 'refresh_code' ? 'animate-spin' : ''}`} strokeWidth={2.5} />
        {refreshState === 'running' ? primaryDef.primaryLoadingLabel : primaryDef.primaryLabel}
      </button>

      {/* Escalation options */}
      <div>
        <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-2">If that doesn't fix it</div>
        <div className="grid grid-cols-1 gap-2">
          {escalationKeys.map((key) => {
            const def = ACTION_DEFS[key]
            return (
              <button
                key={key}
                onClick={() => runAction(key)}
                disabled={refreshState !== 'idle'}
                className="flex items-center gap-3 w-full text-left rounded-lg border border-slate-200 bg-white px-4 py-3 hover:border-slate-900 hover:bg-slate-50 transition disabled:opacity-50"
              >
                <div className="w-9 h-9 rounded-md bg-slate-100 grid place-items-center">
                  <Icon name={def.icon} className="w-4 h-4 text-slate-700" strokeWidth={2} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm text-slate-900">{def.escLabel}</div>
                  <div className="text-xs text-slate-500">{def.escDesc}</div>
                </div>
                <Icon name="arrow-left" className="w-4 h-4 text-slate-400 rotate-180" strokeWidth={2} />
              </button>
            )
          })}
        </div>
      </div>

      <div className="text-center pt-2">
        <button onClick={() => onViewLockDetails(p.id)} className="text-sm text-slate-500 hover:text-slate-900 underline underline-offset-4 decoration-slate-300 hover:decoration-slate-700">
          View full lock details
        </button>
      </div>

      {/* Notify Co-Host modal */}
      <Modal
        open={cohostStep != null}
        onClose={() => setCohostStep(null)}
        title={
          cohostStep === 'send' ? 'Send to co-host' :
          cohostStep === 'schedule' ? 'Schedule co-host SMS' :
          cohostStep === 'snooze' || cohostStep === 'customSnooze' ? 'Remind me later' :
          'Notify co-host'
        }
        footer={
          cohostStep === 'send' ? (
            <><Button variant="secondary" size="sm" onClick={() => setCohostStep('choice')}>Back</Button>
            <Button variant="primary" size="sm" onClick={sendCohost} icon={cohostSent ? 'check' : null}>{cohostSent ? 'Sent' : 'Send Alert'}</Button></>
          ) : cohostStep === 'schedule' ? (
            <><Button variant="secondary" size="sm" onClick={() => setCohostStep('choice')}>Back</Button>
            <Button variant="primary" size="sm" onClick={() => scheduleFor('notify_cohost')} icon="calendar-clock">Confirm schedule</Button></>
          ) : cohostStep === 'customSnooze' ? (
            <><Button variant="secondary" size="sm" onClick={() => setCohostStep('snooze')}>Back</Button>
            <Button variant="primary" size="sm" onClick={snoozeCustom} icon="moon">Set reminder</Button></>
          ) : (
            <Button variant="secondary" size="sm" onClick={() => setCohostStep(null)}>Cancel</Button>
          )
        }
      >
        {cohostStep === 'choice' && (
          <div className="space-y-2">
            <p className="text-sm text-slate-600">When do you want to notify Diego?</p>
            <button onClick={() => setCohostStep('send')} className="w-full flex items-center gap-3 text-left rounded-lg border border-slate-200 px-3 py-3 hover:border-slate-900 hover:bg-slate-50 transition">
              <Icon name="user" className="w-4 h-4 text-slate-700" strokeWidth={2} />
              <div className="flex-1"><div className="font-semibold text-sm text-slate-900">Send now</div><div className="text-xs text-slate-500">Pre-written SMS goes out immediately.</div></div>
            </button>
            <button onClick={() => setCohostStep('schedule')} className="w-full flex items-center gap-3 text-left rounded-lg border border-slate-200 px-3 py-3 hover:border-slate-900 hover:bg-slate-50 transition">
              <Icon name="calendar-clock" className="w-4 h-4 text-slate-700" strokeWidth={2} />
              <div className="flex-1"><div className="font-semibold text-sm text-slate-900">Schedule for later</div><div className="text-xs text-slate-500">Pick a time. We'll send it then.</div></div>
            </button>
            <button onClick={() => setCohostStep('snooze')} className="w-full flex items-center gap-3 text-left rounded-lg border border-slate-200 px-3 py-3 hover:border-slate-900 hover:bg-slate-50 transition">
              <Icon name="moon" className="w-4 h-4 text-slate-700" strokeWidth={2} />
              <div className="flex-1"><div className="font-semibold text-sm text-slate-900">Remind me to send</div><div className="text-xs text-slate-500">Snooze the alert; we'll nudge you to decide later.</div></div>
            </button>
          </div>
        )}
        {cohostStep === 'send' && (
          <>
            <p className="text-xs text-slate-500 mb-2">Pre-written message · sent via SMS to Diego (co-host)</p>
            <div className="rounded-md border border-slate-200 bg-slate-50 p-3 text-sm text-slate-800 leading-relaxed">
              Hi Diego — the Schlage lock at {p.name} ({p.address}) is showing {p.status === 'Offline' ? 'as offline' : `low battery (${p.battery}%)`}.{' '}
              {p.nextCheckIn.guest} checks in at {p.nextCheckIn.label.toLowerCase()}. Can you swing by and swap the batteries / verify it responds before then? Thanks.
            </div>
          </>
        )}
        {cohostStep === 'schedule' && (
          <>
            <p className="text-sm text-slate-700 mb-3">When should we send the SMS to Diego?</p>
            <input type="datetime-local" value={scheduleTime} onChange={(e) => setScheduleTime(e.target.value)} className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#0072BC]/20 focus:border-[#0072BC]" />
            <p className="text-xs text-slate-500 mt-2">Default is 4 hours before {p.nextCheckIn.guest} checks in.</p>
          </>
        )}
        {cohostStep === 'snooze' && (
          <div className="space-y-2">
            <p className="text-sm text-slate-600">Remind me to deal with this:</p>
            {SNOOZE_PRESETS.map((opt) => (
              <button key={opt.key} onClick={() => snoozeFor(opt)} className="w-full flex items-center justify-between text-left rounded-lg border border-slate-200 px-3 py-2.5 hover:border-slate-900 hover:bg-slate-50 transition">
                <span className="text-sm font-semibold text-slate-900">{opt.label}</span>
                <Icon name="moon" className="w-4 h-4 text-slate-400" strokeWidth={2} />
              </button>
            ))}
            <button onClick={() => setCohostStep('customSnooze')} className="w-full flex items-center justify-between text-left rounded-lg border border-slate-200 px-3 py-2.5 hover:border-slate-900 hover:bg-slate-50 transition">
              <span className="text-sm font-semibold text-slate-900">Custom time…</span>
              <Icon name="clock" className="w-4 h-4 text-slate-400" strokeWidth={2} />
            </button>
          </div>
        )}
        {cohostStep === 'customSnooze' && (
          <>
            <p className="text-sm text-slate-700 mb-3">Remind me at:</p>
            <input type="datetime-local" value={scheduleTime} onChange={(e) => setScheduleTime(e.target.value)} className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#0072BC]/20 focus:border-[#0072BC]" />
          </>
        )}
      </Modal>

      {/* Contact Support modal */}
      <Modal
        open={supportOpen}
        onClose={() => setSupportOpen(false)}
        title="Contact Schlage Support"
        footer={
          <><Button variant="secondary" size="sm" onClick={() => setSupportOpen(false)}>Close</Button>
          <Button variant="primary" size="sm" onClick={sendSupport} icon={supportSent ? 'check' : null}>{supportSent ? 'Sent' : 'Send Priority Request'}</Button></>
        }
      >
        <p className="text-sm text-slate-700">We'll open a priority ticket for <strong>{p.name}</strong> ({p.lockName}). A specialist will contact you within 15 minutes at the number on file.</p>
        <ul className="mt-3 text-xs text-slate-500 space-y-1">
          <li>· Diagnostic snapshot will be attached automatically</li>
          <li>· Includes battery, RSSI, and last 24h of sync events</li>
          <li>· Average response time: 8 min</li>
        </ul>
      </Modal>

      {/* Replace Battery modal */}
      <Modal
        open={batteryStep != null}
        onClose={() => setBatteryStep(null)}
        title={
          batteryStep === 'instructions' ? 'Replace battery in person' :
          batteryStep === 'schedule' ? 'Schedule battery replacement' :
          batteryStep === 'snooze' || batteryStep === 'customSnooze' ? 'Remind me later' :
          'Replace battery — when?'
        }
        footer={
          batteryStep === 'instructions' ? (
            <><Button variant="secondary" size="sm" onClick={() => setBatteryStep('choice')}>Back</Button>
            <Button variant="primary" size="sm" onClick={confirmBatteryReplaced} icon="check">I replaced them</Button></>
          ) : batteryStep === 'schedule' ? (
            <><Button variant="secondary" size="sm" onClick={() => setBatteryStep('choice')}>Back</Button>
            <Button variant="primary" size="sm" onClick={() => scheduleFor('replace_battery')} icon="calendar-clock">Confirm schedule</Button></>
          ) : batteryStep === 'customSnooze' ? (
            <><Button variant="secondary" size="sm" onClick={() => setBatteryStep('snooze')}>Back</Button>
            <Button variant="primary" size="sm" onClick={snoozeCustom} icon="moon">Set reminder</Button></>
          ) : (
            <Button variant="secondary" size="sm" onClick={() => setBatteryStep(null)}>Cancel</Button>
          )
        }
      >
        {batteryStep === 'choice' && (
          <div className="space-y-2">
            <p className="text-sm text-slate-600">When can you do this?</p>
            <button onClick={() => setBatteryStep('instructions')} className="w-full flex items-center gap-3 text-left rounded-lg border border-slate-200 px-3 py-3 hover:border-slate-900 hover:bg-slate-50 transition">
              <Icon name="battery" className="w-4 h-4 text-slate-700" strokeWidth={2} />
              <div className="flex-1"><div className="font-semibold text-sm text-slate-900">I'm there now</div><div className="text-xs text-slate-500">Walk through the 4-step swap and confirm when done.</div></div>
            </button>
            <button onClick={() => setBatteryStep('schedule')} className="w-full flex items-center gap-3 text-left rounded-lg border border-slate-200 px-3 py-3 hover:border-slate-900 hover:bg-slate-50 transition">
              <Icon name="calendar-clock" className="w-4 h-4 text-slate-700" strokeWidth={2} />
              <div className="flex-1"><div className="font-semibold text-sm text-slate-900">I'll do it by a specific time</div><div className="text-xs text-slate-500">Commit to a deadline. Card moves to Action Scheduled.</div></div>
            </button>
            <button onClick={() => { setBatteryStep(null); setCohostStep('send') }} className="w-full flex items-center gap-3 text-left rounded-lg border border-slate-200 px-3 py-3 hover:border-slate-900 hover:bg-slate-50 transition">
              <Icon name="user" className="w-4 h-4 text-slate-700" strokeWidth={2} />
              <div className="flex-1"><div className="font-semibold text-sm text-slate-900">I can't — notify my co-host</div><div className="text-xs text-slate-500">Hand off to Diego. We'll mark the card Action Pending.</div></div>
            </button>
            <button onClick={() => setBatteryStep('snooze')} className="w-full flex items-center gap-3 text-left rounded-lg border border-slate-200 px-3 py-3 hover:border-slate-900 hover:bg-slate-50 transition">
              <Icon name="moon" className="w-4 h-4 text-slate-700" strokeWidth={2} />
              <div className="flex-1"><div className="font-semibold text-sm text-slate-900">Remind me later</div><div className="text-xs text-slate-500">Snooze the alert and decide later.</div></div>
            </button>
          </div>
        )}
        {batteryStep === 'instructions' && (
          <>
            <p className="text-sm text-slate-700">If you're nearby, swapping the batteries takes about 2 minutes.</p>
            <ol className="mt-3 text-sm text-slate-700 space-y-1.5 list-decimal pl-5">
              <li>Open the cover on the interior side of the lock.</li>
              <li>Replace all 4 AA alkaline batteries (do not mix old and new).</li>
              <li>Close the cover. The lock will beep once when ready.</li>
              <li>We'll automatically confirm the new battery level within a few minutes.</li>
            </ol>
          </>
        )}
        {batteryStep === 'schedule' && (
          <>
            <p className="text-sm text-slate-700 mb-3">By when will the batteries be replaced?</p>
            <input type="datetime-local" value={scheduleTime} onChange={(e) => setScheduleTime(e.target.value)} className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#0072BC]/20 focus:border-[#0072BC]" />
            <p className="text-xs text-slate-500 mt-2">Default is 4 hours before {p.nextCheckIn.guest} checks in.</p>
          </>
        )}
        {batteryStep === 'snooze' && (
          <div className="space-y-2">
            <p className="text-sm text-slate-600">Remind me to deal with this:</p>
            {SNOOZE_PRESETS.map((opt) => (
              <button key={opt.key} onClick={() => snoozeFor(opt)} className="w-full flex items-center justify-between text-left rounded-lg border border-slate-200 px-3 py-2.5 hover:border-slate-900 hover:bg-slate-50 transition">
                <span className="text-sm font-semibold text-slate-900">{opt.label}</span>
                <Icon name="moon" className="w-4 h-4 text-slate-400" strokeWidth={2} />
              </button>
            ))}
            <button onClick={() => setBatteryStep('customSnooze')} className="w-full flex items-center justify-between text-left rounded-lg border border-slate-200 px-3 py-2.5 hover:border-slate-900 hover:bg-slate-50 transition">
              <span className="text-sm font-semibold text-slate-900">Custom time…</span>
              <Icon name="clock" className="w-4 h-4 text-slate-400" strokeWidth={2} />
            </button>
          </div>
        )}
        {batteryStep === 'customSnooze' && (
          <>
            <p className="text-sm text-slate-700 mb-3">Remind me at:</p>
            <input type="datetime-local" value={scheduleTime} onChange={(e) => setScheduleTime(e.target.value)} className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#0072BC]/20 focus:border-[#0072BC]" />
          </>
        )}
      </Modal>
    </div>
  )
}
