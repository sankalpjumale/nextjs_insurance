
import { ICoverageSection } from "@/model/Policy"
import { TabCard } from "@/components/policy_detail_tabs/TabCard"
import CountPill from "./CountPill"
import { ClaimDocumentItem } from "./ClaimDocumentItem"

interface ClaimSectionCardProps {
  section: ICoverageSection
  query?: string
}

export function ClaimSectionCard({ section, query = "" }: ClaimSectionCardProps) {
  const filtered = query.trim()
    ? section.claimDocuments.filter((d) =>
        d.toLowerCase().includes(query.toLowerCase())
      )
    : section.claimDocuments

  if (!filtered.length) return null

  return (
    <TabCard>
      <div className="flex items-center gap-2 mb-2">
        <h3 className="text-sm font-bold text-stone-700">{section.title}</h3>
        <CountPill count={filtered.length} label="docs" />
      </div>
      <ul className="divide-y divide-stone-50">
        {filtered.map((doc, i) => (
          <ClaimDocumentItem key={i} text={doc} index={i} query={query} />
        ))}
      </ul>
    </TabCard>
  )
}