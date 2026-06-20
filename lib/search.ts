export type CoverageType = 
    | "Individual"
    | "Family FLoater"
    | "Group"
    | "Multi-Trip"
    | "Single-Trip"

export const COVERAGE_TYPE: CoverageType[] = [
    "Individual",
    "Family FLoater",
    "Group",
    "Multi-Trip",
    "Single-Trip"
]

export interface PolicySummary {
    _id: string
    name: string
    slug: string
    categorySlug: string
    insurerName: string
    tagline: string
    highlights: string[]
    coverageType: CoverageType
    minSumInsured: number
    maxSumInsured: number
    currency: string
    isFeatured: boolean
}

export interface SearchFilters {
  q: string
  category: string
  coverageType: string
}

export function buildSearchParams(filters: Partial<SearchFilters>): string {
  const params = new URLSearchParams()
  if (filters.q)            params.set("q", filters.q)
  if (filters.category)     params.set("category", filters.category)
  if (filters.coverageType) params.set("coverageType", filters.coverageType)
  return params.toString()
}