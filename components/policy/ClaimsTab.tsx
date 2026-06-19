'use client'

import { useState } from "react"
import { ICoverageSection } from "@/model/Policy"
import { TabEmpty } from "@/components/policy_detail_tabs/TabEmpty"
import SearchInput from "./SearchInput"
import { ClaimSectionCard } from "./ClaimSectionCard"

export function ClaimsTab({ sections }: { sections: ICoverageSection[] }) {
  const [query, setQuery] = useState("")

  const sectionsWithDocs = sections?.filter((s) => s.claimDocuments?.length > 0)
  if (!sectionsWithDocs?.length) return <TabEmpty text="No claim documents listed." />

  return (
    <div>
      <SearchInput
        value={query}
        onChange={setQuery}
        placeholder="Search required documents..."
      />
      <div className="space-y-5">
        {sectionsWithDocs.map((section, i) => (
          <ClaimSectionCard key={i} section={section} query={query} />
        ))}
      </div>
    </div>
  )
}