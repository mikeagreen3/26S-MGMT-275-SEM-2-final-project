export const batteryTone = (b) => (b < 20 ? 'bad' : b < 40 ? 'warn' : 'good')
export const connTone = (c) => (c === 'Online' ? 'good' : 'bad')
export const syncTone = (s) => (s === 'Synced' ? 'good' : s === 'Pending' ? 'warn' : 'bad')

export const PENDING_LABELS = {
  notify_cohost: 'Co-host notified',
  replace_battery: 'Battery replacement requested',
  contact_support: 'Support ticket open',
}

export const SCHEDULED_LABELS = {
  notify_cohost: 'Co-host notification scheduled',
  replace_battery: 'Battery replacement',
  contact_support: 'Support call scheduled',
  refresh_code: 'Code refresh scheduled',
}

export const formatTimeAgo = (ts) => {
  const sec = Math.max(0, Math.floor((Date.now() - ts) / 1000))
  if (sec < 30) return 'Just now'
  if (sec < 60) return `${sec}s ago`
  const min = Math.floor(sec / 60)
  if (min < 60) return `${min} min ago`
  const hr = Math.floor(min / 60)
  if (hr < 24) return `${hr}h ago`
  return `${Math.floor(hr / 24)}d ago`
}

export const formatTimeUntil = (ts) => {
  const sec = Math.max(0, Math.floor((ts - Date.now()) / 1000))
  if (sec < 60) return 'in under a minute'
  const min = Math.floor(sec / 60)
  if (min < 60) return `in ${min} min`
  const hr = Math.floor(min / 60)
  if (hr < 24) return `in ${hr} hour${hr === 1 ? '' : 's'}`
  const d = Math.floor(hr / 24)
  return `in ${d} day${d === 1 ? '' : 's'}`
}

export const formatScheduledLabel = (ts) => {
  const d = new Date(ts)
  const now = new Date()
  const sameDay = d.toDateString() === now.toDateString()
  const tomorrow = new Date(now)
  tomorrow.setDate(tomorrow.getDate() + 1)
  const isTomorrow = d.toDateString() === tomorrow.toDateString()
  const time = d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  if (sameDay) return `today by ${time}`
  if (isTomorrow) return `tomorrow by ${time}`
  return `${d.toLocaleDateString('en-US', { weekday: 'short' })} by ${time}`
}

export const defaultScheduleIso = (p) => {
  const checkIn = p.nextCheckIn?.iso ? new Date(p.nextCheckIn.iso) : null
  let target = checkIn ? new Date(checkIn.getTime() - 4 * 3600 * 1000) : null
  if (!target || target.getTime() < Date.now() + 30 * 60 * 1000) {
    target = new Date(Date.now() + 4 * 3600 * 1000)
  }
  const pad = (n) => String(n).padStart(2, '0')
  return `${target.getFullYear()}-${pad(target.getMonth() + 1)}-${pad(target.getDate())}T${pad(target.getHours())}:${pad(target.getMinutes())}`
}

export const SNOOZE_PRESETS = [
  { key: '1h', label: 'In 1 hour', ms: 1 * 3600 * 1000 },
  { key: '4h', label: 'In 4 hours', ms: 4 * 3600 * 1000 },
  {
    key: 'morning',
    label: 'Tomorrow morning',
    at: () => {
      const d = new Date()
      d.setDate(d.getDate() + 1)
      d.setHours(8, 0, 0, 0)
      return d.getTime()
    },
  },
]
