export default function Card({ children, className = '', onClick, style }) {
  return (
    <div
      onClick={onClick}
      style={style}
      className={`card border border-[var(--schlage-border)] shadow-[0_1px_2px_rgba(15,23,42,0.04),0_4px_12px_-2px_rgba(15,23,42,0.05)] ${className}`}
    >
      {children}
    </div>
  )
}
