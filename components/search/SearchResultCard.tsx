import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { CategoryBadge } from "@/components/category_badge"
import { HighlightText } from "@/components/"
import { PolicySummary } from "@/lib/search"

interface SearchResultCardProps {
  policy: PolicySummary
  query: string
}

export function SearchResultCard({ policy, query }: SearchResultCardProps) {
  return (
    <div className="group bg-white rounded-2xl border border-stone-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          <CategoryBadge category={policy.categorySlug} />
          <span className="inline-flex items-center text-xs font-semibold bg-stone-100 text-stone-500 px-2.5 py-1 rounded-full">
            {policy.coverageType}
          </span>
          {policy.isFeatured && (
            <span className="inline-flex items-center text-xs font-semibold bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full border border-indigo-100">
              ★ Featured
            </span>
          )}
        </div>
      </div>

      <div>
        <h3
          className="text-base font-bold text-stone-900 group-hover:text-indigo-700 transition-colors mb-0.5"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          <HighlightText text={policy.name} query={query} />
        </h3>
        <p className="text-xs font-semibold text-stone-400 uppercase tracking-wide">
          <HighlightText text={policy.insurerName} query={query} />
        </p>
      </div>

      {policy.tagline && (
        <p className="text-sm text-stone-500 leading-relaxed">
          <HighlightText text={policy.tagline} query={query} />
        </p>
      )}

      {policy.highlights?.length > 0 && (
        <ul className="space-y-1">
          {policy.highlights.slice(0, 2).map((h, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-stone-500">
              <span className="mt-1.5 w-1 h-1 rounded-full bg-indigo-300 shrink-0" />
              <HighlightText text={h} query={query} />
            </li>
          ))}
        </ul>
      )}

      <div className="flex items-center justify-between pt-3 border-t border-stone-100 mt-auto">
        <p className="text-xs text-stone-400">
          {policy.currency}{" "}
          {policy.minSumInsured.toLocaleString()} –{" "}
          {policy.maxSumInsured.toLocaleString()}
        </p>
        <Link
          href={`/policies/${policy.slug}`}
          className="flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:gap-2 transition-all"
        >
          View policy
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}