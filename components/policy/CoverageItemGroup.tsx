import { CheckCircle, XCircle } from "lucide-react"
import { ICoverageItem } from "@/model/Policy"
import CoverageItemRow from "./CoverageItemRow"
import CountPill from "./CountPill"

interface CoverageItemGroupProps {
  label: string
  type: "covered" | "notCovered"
  items: ICoverageItem[]
  query?: string
}

const typeConfig = {
  covered: {
    labelColor: "text-emerald-700",
    bgColor: "bg-emerald-50",
    border: "border-emerald-100",
    icon: <CheckCircle className="w-4 h-4 text-emerald-500" />,
  },
  notCovered: {
    labelColor: "text-rose-700",
    bgColor: "bg-rose-50",
    border: "border-rose-100",
    icon: <XCircle className="w-4 h-4 text-rose-400" />,
  },
}

export function CoverageItemGroup({ label, type, items, query = "" }: CoverageItemGroupProps) {
  const config = typeConfig[type]

  const filtered = query.trim()
    ? items.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description?.toLowerCase().includes(query.toLowerCase())
      )
    : items

  if (!filtered.length) return null

  return (
    <div className={`rounded-xl border ${config.border} ${config.bgColor} p-4`}>
      <div className="flex items-center gap-2 mb-2">
        <p className={`text-xs font-bold uppercase tracking-widest ${config.labelColor}`}>
          {label}
        </p>
        <CountPill count={filtered.length} />
      </div>
      <ul className="divide-y divide-stone-100">
        {filtered.map((item, i) => (
          <CoverageItemRow key={i} item={item} icon={config.icon} query={query} />
        ))}
      </ul>
    </div>
  )
}