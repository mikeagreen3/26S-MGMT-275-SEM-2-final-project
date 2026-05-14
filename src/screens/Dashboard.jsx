import { useState, useEffect } from 'react'
import Icon from '../components/Icon'
import StatusBadge from '../components/StatusBadge'
import Card from '../components/Card'
import Button from '../components/Button'
import {
  batteryTone, connTone, syncTone,
  PENDING_LABELS, SCHEDULED_LABELS,
  formatTimeAgo, formatTimeUntil, formatScheduledLabel,
} from '../lib/utils'

function SignalRow({ icon, label, value, tone }) {
  const toneClass = { good: 'text-[#16a34a]', warn: 'text-[#d97706]', bad: 'text-[#dc2626]', mute: 'text-slate-500' }[tone] || 'text-slate-700'
  return (
    <div className="flex items-center justify-between py-2.5 px-3 rounded-md bg-slate-50/70 border border-slate-100">
      <div className="flex items-center gap-2 text-xs text-slate-600">
        <Icon name={icon} className={`w-4 h-4 ${toneClass}`} strokeWidth={2} />
        {label}
      </div>
      <div className={`text-xs font-semibold ${toneClass}`}>{value}</div>
    </div>
  )
}

function PropertyCard({ property, onView, onRefreshOnCard, onMarkResolved, onMarkComplete, onResolveNow }) {
  const p = property
  const [refreshState, setRefreshState] = useState('idle')
  const [, forceTick] = useState(0)

  useEffect(() => {
    if (p.status === 'All Clear' && !p.snooze) return
    const id = setInterval(() => forceTick((n) => n + 1), 30000)
    return () => clearInterval(id)
  }, [p.status, !!p.snooze])

  const handleRefresh = (e) => {
    e.stopPropagation()
    setRefreshState('refreshing')
    setTimeout(() => {
      setRefreshState('success')
      onRefreshOnCard(p.id)
      setTimeout(() => setRefreshState('idle'), 3000)
    }, 2000)
  }

  const status = p.status
  const isAllClear        = status === 'All Clear'
  const isOffline         = status === 'Offline'
  const isActionPending   = status === 'Action Pending'
  const isActionScheduled = status === 'Action Scheduled'
  const snoozed   = !!p.snooze
  const pending   = p.pendingAction
  const scheduled = p.scheduledAction
  const snooze    = p.snooze

  const cardSoftClass  = snoozed ? 'opacity-80' : ''
  const badgeSoftStyle = snoozed ? { opacity: 0.5 } : null

  return (
    <Card className={`p-5 flex flex-col gap-4 transition hover:shadow-[0_2px_4px_rgba(15,23,42,0.06),0_12px_28px_-8px_rgba(15,23,42,0.12)] ${cardSoftClass}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <Icon name="pin" className="w-3.5 h-3.5" />
            <span className="truncate">{p.address}</span>
          </div>
          <h3 className="text-lg font-semibold text-slate-900 leading-tight">{p.name}</h3>
          <div className="text-xs text-slate-500 mt-1">{p.lockName}</div>
        </div>
        <span style={badgeSoftStyle}><StatusBadge status={status} /></span>
      </div>

      {snoozed && (
        <div className="-mt-2 -mb-1 flex items-center gap-1.5 text-xs text-slate-600">
          <Icon name="moon" className="w-3.5 h-3.5 text-slate-500" strokeWidth={2} />
          <span className="font-medium">Reminder set</span>
          <span className="text-slate-400">·</span>
          <span className="text-slate-500">{formatTimeUntil(snooze.until)}</span>
        </div>
      )}
      {!snoozed && isActionPending && pending && (
        <div className="-mt-2 -mb-1 flex items-center gap-1.5 text-xs text-[#2563eb]">
          <Icon name="user" className="w-3.5 h-3.5" strokeWidth={2} />
          <span className="font-medium">{PENDING_LABELS[pending.key] || 'Action taken'}</span>
          <span className="text-slate-400">·</span>
          <span className="text-slate-500">{formatTimeAgo(pending.takenAt)}</span>
        </div>
      )}
      {!snoozed && isActionScheduled && scheduled && (
        <div className="-mt-2 -mb-1 flex items-center gap-1.5 text-xs text-[#2563eb]">
          <Icon name="clock" className="w-3.5 h-3.5" strokeWidth={2} />
          <span className="font-medium">{SCHEDULED_LABELS[scheduled.key] || 'Action scheduled'}</span>
          <span className="text-slate-400">·</span>
          <span className="text-slate-500">{formatScheduledLabel(scheduled.dueAt)}</span>
        </div>
      )}

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
        <SignalRow icon={p.connectivity === 'Online' ? 'wifi' : 'wifi-off'} label="Connectivity" value={p.connectivity} tone={connTone(p.connectivity)} />
        <SignalRow icon="sync" label="Code Sync" value={p.codeSync} tone={syncTone(p.codeSync)} />
      </div>

      {refreshState === 'refreshing' && (
        <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2.5 flex items-center gap-2">
          <Icon name="sync" className="w-4 h-4 text-slate-500 animate-spin" strokeWidth={2} />
          <span className="text-sm text-slate-700">Pushing fresh code to the lock…</span>
        </div>
      )}
      {refreshState === 'success' && (
        <div className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2.5 flex items-start gap-2">
          <Icon name="check" className="w-4 h-4 text-[#16a34a] mt-0.5" strokeWidth={2.5} />
          <span className="text-sm text-emerald-900 leading-snug">Code refreshed. {p.nextCheckIn.guest} is good to go. We'll keep monitoring.</span>
        </div>
      )}

      {refreshState === 'idle' && (
        <div className="flex gap-2 pt-1">
          {snoozed ? (
            <>
              <Button variant="primary" className="flex-1" onClick={() => onResolveNow(p.id)} icon="alert">Resolve now</Button>
              <Button variant="secondary" className="flex-1" onClick={() => onView(p.id)}>View details</Button>
            </>
          ) : isAllClear ? (
            <Button variant="secondary" className="flex-1" onClick={() => onView(p.id)}>View details</Button>
          ) : isActionPending ? (
            <>
              <Button variant="secondary" className="flex-1" onClick={() => onView(p.id)}>View status</Button>
              <Button variant="primary" className="flex-1" onClick={() => onMarkResolved(p.id)} icon="check">Mark resolved</Button>
            </>
          ) : isActionScheduled ? (
            <>
              <Button variant="secondary" className="flex-1" onClick={() => onMarkComplete(p.id)} icon="check">Mark complete</Button>
              <Button variant="secondary" className="flex-1" onClick={() => onView(p.id)}>View details</Button>
            </>
          ) : (
            <>
              <Button variant={isOffline ? 'danger' : 'primary'} className="flex-1" onClick={handleRefresh} icon="sync">
                Refresh code
              </Button>
              <Button variant="secondary" className="flex-1" onClick={() => onView(p.id)}>View details</Button>
            </>
          )}
        </div>
      )}
    </Card>
  )
}

function AlertBanner({ alerts, onResolve }) {
  if (!alerts.length) return null
  const tone = alerts.some((a) => a.status === 'Offline') ? 'red' : 'amber'
  const bg = tone === 'red' ? 'bg-[#fef2f2] border-[#fecaca]' : 'bg-[#fffbeb] border-[#fde68a]'
  const iconColor = tone === 'red' ? 'text-[#dc2626]' : 'text-[#d97706]'
  return (
    <div className={`rounded-lg border ${bg} px-5 py-4`}>
      <div className="flex items-start gap-3">
        <div className={`mt-0.5 ${iconColor}`}><Icon name="alert" className="w-5 h-5" strokeWidth={2} /></div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-slate-900">
            {alerts.length === 1
              ? `${alerts[0].name}: ${alerts[0].alert.title}`
              : `${alerts.length} locks need attention before check-in`}
          </div>
          <div className="text-sm text-slate-700 mt-0.5">
            {alerts.length === 1 ? alerts[0].alert.body : alerts.map((a) => a.name).join(' · ')}
          </div>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          {alerts.length === 1 ? (
            <Button variant={tone === 'red' ? 'danger' : 'primary'} size="sm" onClick={() => onResolve(alerts[0].id)}>
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
  )
}

export default function Dashboard({ properties, hostName, today, onView, onResolve, onRefreshOnCard, onMarkResolved, onMarkComplete, onResolveNow, onSchedule }) {
  const alerts = properties.filter((p) => p.alert)
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="text-sm text-slate-500">{today}</div>
          <h1 className="text-3xl font-semibold text-slate-900 tracking-tight">Good morning, {hostName.split(' ')[0]}</h1>
          <p className="text-sm text-slate-600 mt-1">
            {alerts.length > 0
              ? `${alerts.length} of your ${properties.length} locks ${alerts.length === 1 ? 'needs' : 'need'} attention before the next check-in.`
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
            <PropertyCard
              key={p.id}
              property={p}
              onView={onView}
              onRefreshOnCard={onRefreshOnCard}
              onMarkResolved={onMarkResolved}
              onMarkComplete={onMarkComplete}
              onResolveNow={onResolveNow}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
