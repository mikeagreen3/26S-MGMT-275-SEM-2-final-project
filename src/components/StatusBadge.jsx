const STATUS_MAP = {
  'All Clear':        { bg: '#16a34a', dot: '#bbf7d0' },
  'At Risk':          { bg: '#d97706', dot: '#fed7aa' },
  'Offline':          { bg: '#dc2626', dot: '#fecaca' },
  'Action Pending':   { bg: '#2563eb', dot: '#bfdbfe' },
  'Action Scheduled': { bg: '#2563eb', dot: '#bfdbfe' },
  'Active':           { bg: '#16a34a', dot: '#bbf7d0' },
  'Pending':          { bg: '#d97706', dot: '#fed7aa' },
  'Expired':          { bg: '#64748b', dot: '#cbd5e1' },
  'Successful':       { bg: '#16a34a', dot: '#bbf7d0' },
  'Failed':           { bg: '#dc2626', dot: '#fecaca' },
  'No Data':          { bg: '#64748b', dot: '#cbd5e1' },
}

export default function StatusBadge({ status, size = 'md' }) {
  const s = STATUS_MAP[status] || STATUS_MAP['No Data']
  const pad = size === 'lg' ? 'px-3 py-1 text-xs' : 'px-2.5 py-0.5 text-[11px]'
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-semibold uppercase tracking-wide text-white whitespace-nowrap ${pad}`}
      style={{ backgroundColor: s.bg, letterSpacing: '0.04em' }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: s.dot }} />
      {status}
    </span>
  )
}
