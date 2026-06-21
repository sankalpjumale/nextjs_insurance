interface FilterChipProps {
  label: string
  active: boolean
  onClick: () => void
}

export function FilterChip({ label, active, onClick }: FilterChipProps) {
  return (
    <button
      onClick={onClick}
      className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all ${
        active
          ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
          : "bg-white text-stone-500 border-stone-200 hover:border-indigo-300 hover:text-indigo-600"
      }`}
    >
      {label}
    </button>
  )
}