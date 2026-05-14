import Icon from './Icon'

export default function Modal({ open, onClose, title, children, footer }) {
  if (!open) return null
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
          <h3 className="font-semibold text-slate-900">{title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700">
            <Icon name="x" className="w-5 h-5" />
          </button>
        </div>
        <div className="px-5 py-4 text-sm text-slate-700">{children}</div>
        {footer && (
          <div className="px-5 py-3 border-t border-slate-200 bg-slate-50 flex justify-end gap-2">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}
