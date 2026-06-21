import Link from "next/link"
import { BookOpen } from "lucide-react"
import { HighlightText } from "@/components/policy/shared/HighlightText"

interface DefinitionHit {
  policyName: string
  policySlug: string
  term: string
  meaning: string
  example?: string
}

interface DefinitionHitCardProps {
  hit: DefinitionHit
  query: string
}

export function DefinitionHitCard({ hit, query }: DefinitionHitCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-stone-100 p-5">
      <div className="flex items-start gap-3">
        <BookOpen className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-indigo-700 mb-1">
            <HighlightText text={hit.term} query={query} />
          </p>
          <p className="text-sm text-stone-600 leading-relaxed">
            <HighlightText text={hit.meaning} query={query} />
          </p>
          {hit.example && (
            <p className="text-xs text-stone-400 italic mt-1">
              e.g. <HighlightText text={hit.example} query={query} />
            </p>
          )}
          <Link
            href={`/policies/${hit.policySlug}?tab=definitions`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-500 hover:text-indigo-700 mt-2 transition-colors"
          >
            From: {hit.policyName}
          </Link>
        </div>
      </div>
    </div>
  )
}