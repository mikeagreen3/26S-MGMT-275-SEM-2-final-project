import Icon from './Icon'

const SIZES = {
  sm: 'text-sm px-4 py-2',
  md: 'text-sm px-5 py-3',
  lg: 'text-sm px-6 py-3',
}

const VARIANTS = {
  primary:   'btn-primary',
  secondary: 'btn-secondary',
  danger:    'bg-[#dc2626] text-white hover:bg-[#b91c1c] border border-transparent',
  success:   'bg-[#16a34a] text-white hover:bg-[#15803d] border border-transparent',
  ghost:     'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-transparent',
}

export default function Button({ children, variant = 'primary', size = 'md', onClick, disabled, className = '', icon }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-full font-medium transition disabled:cursor-not-allowed ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
    >
      {icon && <Icon name={icon} className="w-4 h-4" />}
      {children}
    </button>
  )
}
