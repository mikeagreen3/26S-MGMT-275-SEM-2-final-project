export const INITIAL_PROPERTIES = [
  {
    id: 'lock_001',
    name: 'Beachside Studio',
    address: '412 Ocean View Dr, Santa Monica, CA',
    lockName: 'Front Door Encode',
    lockModel: 'Schlage Encode Wi-Fi Deadbolt',
    battery: 12,
    connectivity: 'Online',
    codeSync: 'Synced',
    status: 'At Risk',
    nextCheckIn: {
      guest: 'Sarah K.',
      label: 'Tomorrow 3:00 PM',
      hoursAway: 18,
      iso: '2026-05-11T15:00:00',
    },
    alert: {
      title: 'Action Required Before Check-in',
      body: 'Battery is critically low at 12%. At this level, the lock may fail to respond during your guest\'s check-in tomorrow at 3:00 PM.',
    },
  },
  {
    id: 'lock_002',
    name: 'Downtown Loft',
    address: '88 Spring St #4B, New York, NY',
    lockName: 'Main Entry Encode Plus',
    lockModel: 'Schlage Encode Plus Smart Deadbolt',
    battery: 78,
    connectivity: 'Online',
    codeSync: 'Synced',
    status: 'All Clear',
    nextCheckIn: {
      guest: 'James M.',
      label: 'Friday 4:00 PM',
      hoursAway: 96,
      iso: '2026-05-15T16:00:00',
    },
    alert: null,
  },
  {
    id: 'lock_003',
    name: 'Mountain Cabin',
    address: '27 Pine Ridge Rd, Big Bear, CA',
    lockName: 'Cabin Door Encode',
    lockModel: 'Schlage Encode Wi-Fi Deadbolt',
    battery: 45,
    connectivity: 'Offline',
    codeSync: 'Pending',
    status: 'Offline',
    nextCheckIn: {
      guest: 'Priya R.',
      label: 'Saturday 2:00 PM',
      hoursAway: 120,
      iso: '2026-05-16T14:00:00',
    },
    alert: {
      title: 'Lock Unreachable',
      body: "We haven't heard from this lock in 6 hours. Codes pushed in this window have not synced. Your guest's check-in is Saturday at 2:00 PM.",
    },
  },
]

export const BATTERY_HISTORY = {
  lock_001: [68, 54, 42, 33, 25, 18, 12],
  lock_002: [92, 90, 88, 85, 83, 80, 78],
  lock_003: [60, 58, 55, 52, 50, 47, 45],
}

export const INITIAL_ACCESS_CODES = [
  {
    id: 'c01',
    name: 'Sarah K. — Guest',
    type: 'Guest',
    lockId: 'lock_001',
    lockName: 'Front Door Encode',
    validFrom: 'May 11, 3:00 PM',
    validUntil: 'May 14, 11:00 AM',
    status: 'Pending',
  },
  {
    id: 'c02',
    name: 'Luz — Cleaning',
    type: 'Cleaner',
    lockId: 'lock_002',
    lockName: 'Main Entry Encode Plus',
    validFrom: 'May 10, 11:00 AM',
    validUntil: 'May 10, 2:00 PM',
    status: 'Active',
  },
  {
    id: 'c03',
    name: 'James M. — Guest',
    type: 'Guest',
    lockId: 'lock_002',
    lockName: 'Main Entry Encode Plus',
    validFrom: 'May 15, 4:00 PM',
    validUntil: 'May 18, 11:00 AM',
    status: 'Pending',
  },
  {
    id: 'c04',
    name: 'HVAC Service',
    type: 'Contractor',
    lockId: 'lock_003',
    lockName: 'Cabin Door Encode',
    validFrom: 'May 5, 9:00 AM',
    validUntil: 'May 5, 12:00 PM',
    status: 'Expired',
  },
]

export const HEALTH_CHECK_HISTORY = {
  lock_001: [
    { ts: 'Today, 11:42 AM', outcome: 'Battery low (12%)', tone: 'bad' },
    { ts: 'Today, 7:42 AM', outcome: 'Battery low (14%)', tone: 'bad' },
    { ts: 'Yesterday, 11:42 PM', outcome: 'Battery low (17%)', tone: 'warn' },
    { ts: 'Yesterday, 7:42 PM', outcome: 'Battery low (20%)', tone: 'warn' },
    { ts: 'Yesterday, 3:42 PM', outcome: 'All systems nominal', tone: 'good' },
    { ts: 'Yesterday, 11:42 AM', outcome: 'All systems nominal', tone: 'good' },
    { ts: 'Yesterday, 7:42 AM', outcome: 'All systems nominal', tone: 'good' },
  ],
  lock_002: [
    { ts: 'Today, 11:30 AM', outcome: 'All systems nominal', tone: 'good' },
    { ts: 'Today, 7:30 AM', outcome: 'All systems nominal', tone: 'good' },
    { ts: 'Yesterday, 11:30 PM', outcome: 'All systems nominal', tone: 'good' },
    { ts: 'Yesterday, 7:30 PM', outcome: 'All systems nominal', tone: 'good' },
    { ts: 'Yesterday, 3:30 PM', outcome: 'Code synced successfully', tone: 'good' },
    { ts: 'Yesterday, 11:30 AM', outcome: 'All systems nominal', tone: 'good' },
  ],
  lock_003: [
    { ts: 'Today, 6:00 AM', outcome: 'No response from lock', tone: 'bad' },
    { ts: 'Today, 2:00 AM', outcome: 'No response from lock', tone: 'bad' },
    { ts: 'Yesterday, 10:00 PM', outcome: 'Code push pending', tone: 'warn' },
    { ts: 'Yesterday, 6:00 PM', outcome: 'Code push pending', tone: 'warn' },
    { ts: 'Yesterday, 2:00 PM', outcome: 'All systems nominal', tone: 'good' },
    { ts: 'Yesterday, 10:00 AM', outcome: 'All systems nominal', tone: 'good' },
  ],
}

export const CHECKIN_HISTORY = {
  lock_001: [
    { guest: 'Dana P.', date: 'May 5', status: 'Successful' },
    { guest: 'Ravi S.', date: 'Apr 28', status: 'Successful' },
    { guest: 'Kim L.', date: 'Apr 22', status: 'Failed' },
    { guest: 'Tom W.', date: 'Apr 15', status: 'Successful' },
    { guest: 'Aria N.', date: 'Apr 8', status: 'Successful' },
  ],
  lock_002: [
    { guest: 'Mei T.', date: 'May 3', status: 'Successful' },
    { guest: 'Owen B.', date: 'Apr 26', status: 'Successful' },
    { guest: 'Ines G.', date: 'Apr 18', status: 'Successful' },
    { guest: 'Carl V.', date: 'Apr 10', status: 'Successful' },
    { guest: 'Lin H.', date: 'Apr 2', status: 'Successful' },
  ],
  lock_003: [
    { guest: 'Marco R.', date: 'Apr 30', status: 'Successful' },
    { guest: 'Eva K.', date: 'Apr 20', status: 'No Data' },
    { guest: 'Sven J.', date: 'Apr 12', status: 'Successful' },
    { guest: 'Nora P.', date: 'Apr 3', status: 'Successful' },
    { guest: 'Otto F.', date: 'Mar 27', status: 'Successful' },
  ],
}
