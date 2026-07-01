import Link from "next/link"
import { ArrowRight } from "lucide-react"
import CategoryBadge from "@/components/category_badge/CategoryBadge"
import { AddToCompareButton } from "@/components/compare/AddToCompareButton"

interface PolicyCardProps {
  name: string
  slug: string
  categorySlug: string
  insurerName: string
  tagline: string
  highlights: string[]
  coverageType: string
  minSumInsured: number
  maxSumInsured: number
  currency: string
}

export function PolicyCard({
  name,
  slug,
  categorySlug,
  insurerName,
  tagline,
  highlights,
  coverageType,
  minSumInsured,
  maxSumInsured,
  currency,
}: PolicyCardProps) {
  return (
    <div className="group bg-white rounded-2xl border border-stone-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col">
      <div className="h-1.5 w-full bg-gradient-to-r from-indigo-400 via-violet-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-4">
          <CategoryBadge category={categorySlug} />
          <span className="text-xs text-stone-400 font-medium">{coverageType}</span>
        </div>

        <Link href={`/policies/${slug}`}>
          <h2
            className="text-xl font-bold text-stone-900 mb-1 group-hover:text-indigo-700 transition-colors"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {name}
          </h2>
        </Link>
        <p className="text-xs font-semibold text-stone-400 uppercase tracking-wide mb-3">{insurerName}</p>

        {tagline && (
          <p className="text-sm text-stone-500 leading-relaxed mb-4">{tagline}</p>
        )}

        {highlights.length > 0 && (
          <ul className="space-y-1.5 mb-5 flex-1">
            {highlights.slice(0, 3).map((h, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-stone-600">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-300 shrink-0" />
                {h}
              </li>
            ))}
          </ul>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-stone-100 mt-auto gap-3">
          <div className="min-w-0">
            <p className="text-xs text-stone-400">Sum Insured</p>
            <p className="text-sm font-semibold text-stone-700 truncate">
              {currency} {minSumInsured.toLocaleString()} – {maxSumInsured.toLocaleString()}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <AddToCompareButton slug={slug} name={name} />
            <Link
              href={`/policies/${slug}`}
              className="flex items-center gap-1 text-sm font-semibold text-indigo-600 group-hover:gap-2 transition-all"
            >
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}