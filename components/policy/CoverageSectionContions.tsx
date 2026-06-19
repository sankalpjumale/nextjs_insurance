import { AlertTriangle } from "lucide-react"

interface CoverageSectionConditionsProps {
  conditions: string[]
}

export function CoverageSectionConditions({ conditions }: CoverageSectionConditionsProps) {
  if (!conditions?.length) return null

  return (
    <div className="mt-4 pt-4 border-t border-stone-100">
      <p className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-3">
        Section Conditions
      </p>
      <ul className="space-y-2">
        {conditions.map((c, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-stone-600">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            {c}
          </li>
        ))}
      </ul>
    </div>
  )
}