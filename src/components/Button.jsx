import Icon from './Icon'

const SIZES = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-5 py-2.5 text-sm',
}

const VARIANTS = {
  primary:   'bg-[#1a1a2e] text-white hover:bg-[#2a2a44] disabled:bg-slate-300',
  secondary: 'bg-white text-slate-800 border border-slate-300 hover:bg-slate-50 disabled:opacity-60',
  danger:    'bg-[#dc2626] text-white hover:bg-[#b91c1c]',
  success:   'bg-[#16a34a] text-white hover:bg-[#15803d]',
  ghost:     'text-slate-600 hover:text-slate-900 hover:bg-slate-100',
}

export default function Button({ children, variant = 'primary', size = 'md', onClick, disabled, className = '', icon }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-md font-medium transition disabled:cursor-not-allowed ${SIZES[size]} ${VARIANTS[variant]} ${className}`}
    >
      {icon && <Icon name={icon} className="w-4 h-4" />}
      {children}
    </button>
  )
}
