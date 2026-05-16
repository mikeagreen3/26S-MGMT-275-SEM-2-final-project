import { useState } from 'react'
import TopNav from './components/TopNav'
import Dashboard from './screens/Dashboard'
import ActionScreen from './screens/ActionScreen'
import LockDetails from './screens/LockDetails'
import Scheduling from './screens/Scheduling'
import Settings from './screens/Settings'
import PropertiesList from './screens/PropertiesList'
import { INITIAL_PROPERTIES, INITIAL_ACCESS_CODES, BATTERY_HISTORY } from './data/index'

const HOST_NAME = 'Jess Reyes'

export default function App() {
  const [properties, setProperties] = useState(INITIAL_PROPERTIES)
  const [accessCodes, setAccessCodes] = useState(INITIAL_ACCESS_CODES)
  const [screen, setScreen] = useState('dashboard')
  const [selectedId, setSelectedId] = useState(null)
  const [schedulePrefillLock, setSchedulePrefillLock] = useState(null)
  const [settings, setSettings] = useState({
    channels: { sms: false, push: true, in_app: false },
    developerMode: false,
  })
  const [alertCopyCache, setAlertCopyCache] = useState({})

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })

  const handleNavigate = (id) => {
    if (id === 'schedule') setSchedulePrefillLock(null)
    setScreen(id)
  }

  const handleView = (propId) => {
    setSelectedId(propId)
    setScreen('lockDetails')
  }

  const handleResolve = (propId) => {
    setSelectedId(propId)
    setScreen('action')
  }

  const handleRefreshFromAction = (propId) => {
    setProperties((prev) => prev.map((p) => {
      if (p.id !== propId) return p
      return { ...p, status: 'All Clear', codeSync: 'Synced', battery: p.battery < 20 ? 18 : p.battery, alert: null, pendingAction: null }
    }))
  }

  const handleActionTaken = (propId, actionKey) => {
    setProperties((prev) => prev.map((p) => {
      if (p.id !== propId) return p
      return { ...p, status: 'Action Pending', alert: null, pendingAction: { key: actionKey, takenAt: Date.now() }, scheduledAction: null, snooze: null }
    }))
  }

  const handleScheduleAction = (propId, actionKey, dueAt) => {
    setProperties((prev) => prev.map((p) => {
      if (p.id !== propId) return p
      return { ...p, status: 'Action Scheduled', alert: null, scheduledAction: { key: actionKey, dueAt }, pendingAction: null, snooze: null }
    }))
  }

  const handleSnooze = (propId, until) => {
    setProperties((prev) => prev.map((p) => p.id === propId ? { ...p, snooze: { until } } : p))
  }

  const handleMarkComplete = (propId) => {
    setProperties((prev) => prev.map((p) => {
      if (p.id !== propId) return p
      return { ...p, status: 'All Clear', codeSync: 'Synced', battery: p.battery < 20 ? 80 : p.battery, alert: null, scheduledAction: null, pendingAction: null, snooze: null }
    }))
  }

  const handleResolveNow = (propId) => {
    setProperties((prev) => prev.map((p) => p.id === propId ? { ...p, snooze: null } : p))
    setSelectedId(propId)
    setScreen('action')
  }

  const handleMarkResolved = (propId) => {
    setProperties((prev) => prev.map((p) => {
      if (p.id !== propId) return p
      return { ...p, status: 'All Clear', codeSync: 'Synced', alert: null, pendingAction: null }
    }))
  }

  const handleRefreshOnCard = (propId) => {
    setProperties((prev) => prev.map((p) => {
      if (p.id !== propId) return p
      return { ...p, status: 'All Clear', codeSync: 'Synced', battery: p.battery < 20 ? 18 : p.battery, alert: null, pendingAction: null }
    }))
  }

  const handleAddCode = (code) => {
    setAccessCodes((prev) => [...prev, code])
  }

  const handleAddAccess = (propId) => {
    setSchedulePrefillLock(propId)
    setScreen('schedule')
  }

  const handleCacheAlertCopy = (id, result) => {
    setAlertCopyCache((prev) => ({ ...prev, [id]: result }))
  }

  const currentProperty = properties.find((p) => p.id === selectedId)

  const renderScreen = () => {
    switch (screen) {
      case 'dashboard':
        return (
          <Dashboard
            properties={properties}
            hostName={HOST_NAME}
            today={today}
            onView={handleView}
            onResolve={handleResolve}
            onRefreshOnCard={handleRefreshOnCard}
            onMarkResolved={handleMarkResolved}
            onMarkComplete={handleMarkComplete}
            onResolveNow={handleResolveNow}
            onSchedule={() => setScreen('schedule')}
          />
        )
      case 'action':
        if (!currentProperty) return null
        return (
          <ActionScreen
            property={currentProperty}
            onBack={() => setScreen('dashboard')}
            onRefreshCode={handleRefreshFromAction}
            onActionTaken={handleActionTaken}
            onScheduleAction={handleScheduleAction}
            onSnooze={handleSnooze}
            onViewLockDetails={handleView}
            alertCopyCache={alertCopyCache}
            onCacheAlertCopy={handleCacheAlertCopy}
          />
        )
      case 'schedule':
        return (
          <Scheduling
            properties={properties}
            accessCodes={accessCodes}
            onAddCode={handleAddCode}
            prefillLockId={schedulePrefillLock}
            onClearPrefill={() => setSchedulePrefillLock(null)}
          />
        )
      case 'properties':
        return <PropertiesList properties={properties} onView={handleView} />
      case 'lockDetails':
        if (!currentProperty) return null
        return (
          <LockDetails
            property={currentProperty}
            codes={accessCodes}
            history={BATTERY_HISTORY[currentProperty.id]}
            onBack={() => setScreen('dashboard')}
            onAddAccess={handleAddAccess}
            settings={settings}
            alertCopyCache={alertCopyCache}
          />
        )
      case 'settings':
        return <Settings settings={settings} onSettingsChange={setSettings} />
      default:
        return (
          <Dashboard
            properties={properties}
            hostName={HOST_NAME}
            today={today}
            onView={handleView}
            onResolve={handleResolve}
            onRefreshOnCard={handleRefreshOnCard}
            onMarkResolved={handleMarkResolved}
            onMarkComplete={handleMarkComplete}
            onResolveNow={handleResolveNow}
            onSchedule={() => setScreen('schedule')}
          />
        )
    }
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <TopNav active={screen} onNavigate={handleNavigate} hostName={HOST_NAME} />
      <main className="max-w-[1200px] mx-auto px-8 py-8">
        {renderScreen()}
      </main>
      <footer className="max-w-[1200px] mx-auto px-8 pb-10 pt-2 text-xs text-slate-400">
        Schlage AI Access Concierge · Vite + React
      </footer>
    </div>
  )
}
