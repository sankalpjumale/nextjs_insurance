'use client'

import { useState, useEffect, useCallback } from "react"
import { addToComparison, removeFromComparison, MAX_COMPARE } from "@/lib/comparison"

interface ComparisonEntry {
  slug: string
  name: string
}

const STORAGE_KEY = "policylens_comparison"

//in-memory + sessionStorage-backed list of policies queued for comparison. Lives outside the URL until the user clicks Compare now, since building a comparison is a multi-page selection flow (browsing across categories).
export function useComparisonList() {
  const [entries, setEntries] = useState<ComparisonEntry[]>([])

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY)
      if (raw) setEntries(JSON.parse(raw))
    } catch {
      // ignore corrupt storage
    }
  }, [])

  const persist = useCallback((next: ComparisonEntry[]) => {
    setEntries(next)
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {
      // storage unavailable, keep in-memory only
    }
  }, [])

  const add = useCallback(
    (slug: string, name: string) => {
      if (entries.some((e) => e.slug === slug)) return
      if (entries.length >= MAX_COMPARE) return
      persist([...entries, { slug, name }])
    },
    [entries, persist]
  )

  const remove = useCallback(
    (slug: string) => {
      persist(entries.filter((e) => e.slug !== slug))
    },
    [entries, persist]
  )

  const clear = useCallback(() => persist([]), [persist])

  const isSelected = useCallback(
    (slug: string) => entries.some((e) => e.slug === slug),
    [entries]
  )

  return {
    slugs: entries.map((e) => e.slug),
    names: entries.map((e) => e.name),
    add,
    remove,
    clear,
    isSelected,
    isFull: entries.length >= MAX_COMPARE,
  }
}