import { getCategoryBadge, getCategoryName } from "@/config/categories"

interface CategoryBadgeProps {
  category: string
  showName?: boolean
}

export default function CategoryBadge({ category, showName = true }: CategoryBadgeProps) {
  const badge = getCategoryBadge(category)

  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${badge.bg} ${badge.text}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
      {showName ? getCategoryName(category) : category}
    </span>
  )
}