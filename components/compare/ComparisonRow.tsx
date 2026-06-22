interface ComparisonRowProps {
  label: string
  values: React.ReactNode[]
  highlight?: boolean
}

export function ComparisonRow({ label, values, highlight = false }: ComparisonRowProps) {
  return (
    <div
      className={`grid gap-4 py-4 border-b border-stone-100 items-start ${
        highlight ? "bg-indigo-50/40 -mx-2 px-2 rounded-lg" : ""
      }`}
      style={{ gridTemplateColumns: `200px repeat(${values.length}, 1fr)` }}
    >
      <p className="text-xs font-bold text-stone-500 uppercase tracking-widest pt-1">{label}</p>
      {values.map((val, i) => (
        <div key={i} className="text-sm text-stone-700">{val}</div>
      ))}
    </div>
  )
}