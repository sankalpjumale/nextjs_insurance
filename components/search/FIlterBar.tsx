'use client'

import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { FilterChip } from "@/components/search/FilterChip"
import { COVERAGE_TYPE } from "@/lib/search"

interface FilterBarProps {
  categories: Array<{ name: string; slug: string }>
}

export function FilterBar({ categories }: FilterBarProps) {
  const router       = useRouter()
  const pathname     = usePathname()
  const searchParams = useSearchParams()

  const activeCategory     = searchParams.get("category") ?? ""
  const activeCoverageType = searchParams.get("coverageType") ?? ""

  function update(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`${pathname}?${params.toString()}`)
  }

  function toggle(key: string, value: string, current: string) {
    update(key, current === value ? "" : value)
  }

  return (
    <div className="space-y-4">
      {/* Category filters */}
      <div>
        <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-2">
          Category
        </p>
        <div className="flex flex-wrap gap-2">
          <FilterChip
            label="All"
            active={!activeCategory}
            onClick={() => update("category", "")}
          />
          {categories.map((cat) => (
            <FilterChip
              key={cat.slug}
              label={cat.name}
              active={activeCategory === cat.slug}
              onClick={() => toggle("category", cat.slug, activeCategory)}
            />
          ))}
        </div>
      </div>

      {/* Coverage type filters */}
      <div>
        <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-2">
          Coverage Type
        </p>
        <div className="flex flex-wrap gap-2">
          <FilterChip
            label="All"
            active={!activeCoverageType}
            onClick={() => update("coverageType", "")}
          />
          {COVERAGE_TYPE.map((type) => (
            <FilterChip
              key={type}
              label={type}
              active={activeCoverageType === type}
              onClick={() => toggle("coverageType", type, activeCoverageType)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}