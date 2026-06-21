'use client'

import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { X } from "lucide-react"

export function ActiveFilters() {
  const router       = useRouter()
  const pathname     = usePathname()
  const searchParams = useSearchParams()

  const q            = searchParams.get("q") ?? ""
  const category     = searchParams.get("category") ?? ""
  const coverageType = searchParams.get("coverageType") ?? ""

  const hasFilters = category || coverageType

  function remove(key: string) {
    const params = new URLSearchParams(searchParams.toString())
    params.delete(key)
    router.push(`${pathname}?${params.toString()}`)
  }

  function clearAll() {
    const params = new URLSearchParams()
    if (q) params.set("q", q)
    router.push(`${pathname}?${params.toString()}`)
  }

  if (!hasFilters) return null

  return (
    <div className="flex flex-wrap items-center gap-2 mb-5">
      <span className="text-xs text-stone-400 font-medium">Filtering by:</span>

      {category && (
        <span className="inline-flex items-center gap-1 text-xs font-semibold bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full border border-indigo-100">
          {category}
          <button onClick={() => remove("category")} className="ml-0.5 hover:text-indigo-900">
            <X className="w-3 h-3" />
          </button>
        </span>
      )}

      {coverageType && (
        <span className="inline-flex items-center gap-1 text-xs font-semibold bg-violet-50 text-violet-700 px-2.5 py-1 rounded-full border border-violet-100">
          {coverageType}
          <button onClick={() => remove("coverageType")} className="ml-0.5 hover:text-violet-900">
            <X className="w-3 h-3" />
          </button>
        </span>
      )}

      <button
        onClick={clearAll}
        className="text-xs text-stone-400 hover:text-stone-600 underline underline-offset-2 transition-colors"
      >
        Clear all
      </button>
    </div>
  )
}