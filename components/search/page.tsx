
import { Suspense } from "react"
import { TrendingUp } from "lucide-react"
import { SectionLabel } from "@/components/policy/"
import Header from "@/components/header/Header"
import { SearchBar } from "@/components/search/SearchBar"
import { FilterBar } from "@/components/search/FIlterBar"
import { ActiveFilters } from "@/components/search/ActiveFilters"
import { SearchResultsPanel } from "@/components/search/SearchResultsPanel"

async function getCategories() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/categories`, {
      next: { revalidate: 3600 },
    })
    if (!res.ok) return []
    const json = await res.json()
    return json.data ?? []
  } catch {
    return []
  }
}

async function getSearchResults(q: string, category: string, coverageType: string) {
  try {
    const params = new URLSearchParams()
    if (q)            params.set("q", q)
    if (category)     params.set("category", category)
    if (coverageType) params.set("coverageType", coverageType)

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/search?${params.toString()}`,
      { cache: "no-store" }
    )
    if (!res.ok) return { policies: [], definitions: [] }
    const json = await res.json()
    return json.data ?? { policies: [], definitions: [] }
  } catch {
    return { policies: [], definitions: [] }
  }
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; coverageType?: string }>
}) {
  const { q = "", category = "", coverageType = "" } = await searchParams

  const [categories, results] = await Promise.all([
    getCategories(),
    getSearchResults(q, category, coverageType),
  ])

  const isFiltering = Boolean(category || coverageType)

  return (
    <main className="min-h-screen">
      <section className="max-w-7xl mx-auto px-6 pt-14 pb-8">
        <PageHeader
          label={<SectionLabel text="Search & Discover" icon={<TrendingUp className="w-3.5 h-3.5" />} />}
          title="Find the right"
          titleHighlight="coverage."
          subtitle="Search across all policies, insurers, and glossary terms."
        />
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-6">
        <Suspense>
          <SearchBar />
        </Suspense>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-6">
        <div className="bg-white rounded-2xl border border-stone-100 p-5">
          <Suspense>
            <FilterBar categories={categories} />
          </Suspense>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-24">
        <Suspense>
          <ActiveFilters />
        </Suspense>
        <SearchResultsPanel
          policies={results.policies}
          definitions={results.definitions}
          query={q}
          isFiltering={isFiltering}
        />
      </section>
    </main>
  )
}