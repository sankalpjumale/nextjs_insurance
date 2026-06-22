import { IPolicy } from "@/model/Policy"
import CategoryBadge from "@/components/category_badge/CategoryBadge"

interface ComparisonHeaderProps {
  policies: IPolicy[]
}

export function ComparisonHeader({ policies }: ComparisonHeaderProps) {
  return (
    <div
      className="grid gap-4 mb-8"
      style={{ gridTemplateColumns: `200px repeat(${policies.length}, 1fr)` }}
    >
      <div /> {/* spacer for row label column */}
      {policies.map((policy) => (
        <div key={policy.slug} className="bg-white rounded-2xl border border-stone-100 p-5">
          <CategoryBadge category={policy.categorySlug} />
          <h3
            className="text-lg font-bold text-stone-900 mt-3 mb-0.5"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {policy.name}
          </h3>
          <p className="text-xs font-semibold text-stone-400 uppercase tracking-wide">
            {policy.insurerName}
          </p>
        </div>
      ))}
    </div>
  )
}