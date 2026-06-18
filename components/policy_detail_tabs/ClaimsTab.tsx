import { FileText } from "lucide-react"
import { TabCard } from "@/components/policy_detail_tabs/TabCard"
import { TabEmpty } from "@/components/policy_detail_tabs/TabEmpty"
import { ICoverageSection } from "@/model/Policy"

export function ClaimsTab({ sections }: { sections: ICoverageSection[] }) {
  const sectionsWithDocs = sections?.filter((s) => s.claimDocuments?.length > 0)
  if (!sectionsWithDocs?.length) return <TabEmpty text="No claim documents listed." />

  return (
    <div className="space-y-5">
      {sectionsWithDocs.map((section, i) => (
        <TabCard key={i}>
          <h3 className="text-sm font-bold text-stone-700 mb-4">{section.title}</h3>
          <ul className="space-y-2">
            {section.claimDocuments.map((doc, j) => (
              <li key={j} className="flex items-start gap-2 text-sm text-stone-600">
                <FileText className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                {doc}
              </li>
            ))}
          </ul>
        </TabCard>
      ))}
    </div>
  )
}