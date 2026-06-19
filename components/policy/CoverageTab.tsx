'use client'

import { useState } from "react"
import { ICoverageSection } from "@/model/Policy"
import { TabEmpty } from "@/components/policy_detail_tabs/TabEmpty"
import SearchInput from "./SearchInput"
import { CoverageSectionCard } from "./CoverageSectionCard"

export function CoverageTab({ sections }: { sections: ICoverageSection[] }) {
  const [query, setQuery] = useState("")

  if (!sections?.length) return <TabEmpty text="No coverage sections available." />

  const sorted = [...sections].sort((a, b) => a.displayOrder - b.displayOrder)

  return (
    <div>
      <SearchInput
        value={query}
        onChange={setQuery}
        placeholder="Search covered items..."
      />
      <div className="space-y-6">
        {sorted.map((section, i) => (
          <CoverageSectionCard key={i} section={section} query={query} />
        ))}
      </div>
    </div>
  )
}