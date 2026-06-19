'use client'

import { useState } from "react"
import { XCircle, AlertTriangle } from "lucide-react"
import { TabCard } from "@/components/policy_detail_tabs/TabCard"
import { TabEmpty } from "@/components/policy_detail_tabs/TabEmpty"
import SearchInput from "./SearchInput"
import HighlightText from "./HighlightText"
import CountPill from "./CountPill"

type Variant = "exclusion" | "condition"

const variantConfig: Record<Variant, { icon: React.ReactNode; color: string }> = {
  exclusion: {
    icon: <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />,
    color: "text-rose-600",
  },
  condition: {
    icon: <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />,
    color: "text-amber-600",
  },
}

interface StringListTabProps {
  items: string[]
  variant: Variant
  empty: string
}

export function StringListTab({ items, variant, empty }: StringListTabProps) {
  const [query, setQuery] = useState("")

  if (!items?.length) return <TabEmpty text={empty} />

  const { icon } = variantConfig[variant]

  const filtered = query.trim()
    ? items.filter((item) => item.toLowerCase().includes(query.toLowerCase()))
    : items

  return (
    <div>
      <SearchInput
        value={query}
        onChange={setQuery}
        placeholder={`Search ${variant === "exclusion" ? "exclusions" : "conditions"}...`}
      />
      <TabCard>
        <div className="flex items-center gap-2 mb-4">
          <p className="text-xs font-bold text-stone-500 uppercase tracking-widest">
            {variant === "exclusion" ? "Global Exclusions" : "Global Conditions"}
          </p>
          <CountPill count={filtered.length} />
        </div>
        {filtered.length === 0 ? (
          <p className="text-sm text-stone-400 py-4 text-center">No results for "{query}"</p>
        ) : (
          <ul className="divide-y divide-stone-50">
            {filtered.map((item, i) => (
              <li key={i} className="flex items-start gap-3 py-3">
                {icon}
                <p className="text-sm text-stone-700 leading-relaxed">
                  <HighlightText text={item} query={query} />
                </p>
              </li>
            ))}
          </ul>
        )}
      </TabCard>
    </div>
  )
}