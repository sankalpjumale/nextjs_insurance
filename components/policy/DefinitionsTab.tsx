'use client'

import { useState, useMemo } from "react"
import { IDefinition } from "@/model/Policy"
import { TabEmpty } from "@/components/policy_detail_tabs/TabEmpty"
import SearchInput from "./SearchInput"
import DefinitionCard from "./DefinitionCard"
import CountPill from "./CountPill"

export function DefinitionsTab({ definitions }: { definitions: IDefinition[] }) {
  const [query, setQuery] = useState("")

  if (!definitions?.length) return <TabEmpty text="No definitions available." />

  const filtered = useMemo(() => {
    if (!query.trim()) return definitions
    const q = query.toLowerCase()
    return definitions.filter(
      (d) =>
        d.term.toLowerCase().includes(q) ||
        d.meaning.toLowerCase().includes(q) ||
        d.example?.toLowerCase().includes(q)
    )
  }, [definitions, query])

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1">
          <SearchInput
            value={query}
            onChange={setQuery}
            placeholder="Search terms and definitions..."
          />
        </div>
        <CountPill count={filtered.length} label="terms" />
      </div>

      {filtered.length === 0 ? (
        <TabEmpty text={`No definitions match "${query}"`} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.map((def, i) => (
            <DefinitionCard key={i} definition={def} query={query} />
          ))}
        </div>
      )}
    </div>
  )
}