interface TabCardProps {
  children: React.ReactNode
  className?: string
}

export function TabCard({ children, className = "" }: TabCardProps) {
  return (
    <div className={`bg-white rounded-2xl border border-stone-100 p-6 ${className}`}>
      {children}
    </div>
  )
}