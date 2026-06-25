
'use client'

import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { useState, useEffect, useMemo } from "react"
import { SearchBar } from "@/components/search/SearchBar"
import { FilterBar } from "@/components/search/FIlterBar"
import { ActiveFilters } from "@/components/search/ActiveFilters"
import { SearchResultsPanel } from "@/components/search/SearchResultsPanel"

interface SearchPageClientProps {
  categories: Array<{ name: string; slug: string }>
}

export function SearchPageClient({ categories }: SearchPageClientProps) {
  const searchParams = useSearchParams()
  const q            = searchParams.get("q") ?? ""
  const category     = searchParams.get("category") ?? ""
  const coverageType = searchParams.get("coverageType") ?? ""

  const [results, setResults]   = useState<{ policies: any[]; definitions: any[] }>({ policies: [], definitions: [] })
  const [loading, setLoading]   = useState(false)

  const isFiltering = Boolean(category || coverageType)
  const hasQuery    = q.length >= 2

  useEffect(() => {
    if (!hasQuery && !isFiltering) {
      setResults({ policies: [], definitions: [] })
      return
    }

    const params = new URLSearchParams()
    if (q)            params.set("q", q)
    if (category)     params.set("category", category)
    if (coverageType) params.set("coverageType", coverageType)

    setLoading(true)
    fetch(`/api/search?${params.toString()}`)
      .then((r) => r.json())
      .then((json) => setResults(json.data ?? { policies: [], definitions: [] }))
      .catch(() => setResults({ policies: [], definitions: [] }))
      .finally(() => setLoading(false))
  }, [q, category, coverageType])

  return (
    <>
      <section className="max-w-7xl mx-auto px-6 pb-6">
        <SearchBar />
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-6">
        <div className="bg-white rounded-2xl border border-stone-100 p-5">
          {/* <FilterBar categories={categories} /> */}
          <FilterBar />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-24">
        <ActiveFilters />
        {loading ? (
          <div className="flex items-center justify-center py-24 text-sm text-stone-400">
            Searching...
          </div>
        ) : (
          <SearchResultsPanel
            policies={results.policies}
            definitions={results.definitions}
            query={q}
            isFiltering={isFiltering}
          />
        )}
      </section>
    </>
  )
}