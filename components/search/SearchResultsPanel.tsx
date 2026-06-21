import { PolicySummary } from "@/lib/search"
import { SearchResultCard } from "@/components/search/SearchResultCard"
import { DefinitionHitCard } from "@/components/search/DefinitionHitCard"
import { CountPill } from "@/components/"
import { EmptyState } from "@/components/ui/EmptyState"
import { Search } from "lucide-react"

interface DefinitionHit {
  policyName: string
  policySlug: string
  term: string
  meaning: string
  example?: string
}

interface SearchResultsPanelProps {
  policies: PolicySummary[]
  definitions: DefinitionHit[]
  query: string
  isFiltering: boolean
}

export function SearchResultsPanel({
  policies,
  definitions,
  query,
  isFiltering,
}: SearchResultsPanelProps) {
  const hasResults = policies.length > 0 || definitions.length > 0
  const hasQuery   = query.length >= 2

  if (!hasQuery && !isFiltering) {
    return (
      <EmptyState
        title="Search for a policy"
        subtitle="Type a policy name, insurer, coverage type, or a term from the glossary."
        icon={<Search className="w-12 h-12" />}
      />
    )
  }

  if (!hasResults) {
    return (
      <EmptyState
        title="No results found"
        subtitle={
          hasQuery
            ? `Nothing matched "${query}". Try a different keyword or remove a filter.`
            : "No policies match the selected filters."
        }
        icon={<Search className="w-12 h-12" />}
      />
    )
  }

  return (
    <div className="space-y-10">

      {/* Policy results */}
      {policies.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-5">
            <h2 className="text-sm font-bold text-stone-700 uppercase tracking-widest">
              Policies
            </h2>
            <CountPill count={policies.length} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {policies.map((policy) => (
              <SearchResultCard key={policy.slug} policy={policy} query={query} />
            ))}
          </div>
        </div>
      )}

      {/* Definition hits */}
      {definitions.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-5">
            <h2 className="text-sm font-bold text-stone-700 uppercase tracking-widest">
              Glossary Matches
            </h2>
            <CountPill count={definitions.length} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {definitions.map((hit, i) => (
              <DefinitionHitCard key={i} hit={hit} query={query} />
            ))}
          </div>
        </div>
      )}

    </div>
  )
}