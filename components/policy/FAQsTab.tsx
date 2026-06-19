
'use client'

import { useState, useMemo } from "react"
import { IFAQ } from "@/model/Policy"
import { TabEmpty } from "@/components/policy_detail_tabs/TabEmpty"
import SearchInput from "./SearchInput"
import { FAQItem } from "./FAQItem"
import CountPill from "./CountPill"

export function FAQsTab({ faqs }: { faqs: IFAQ[] }) {
  const [query, setQuery] = useState("")
  const [open, setOpen] = useState<number | null>(null)

  if (!faqs?.length) return <TabEmpty text="No FAQs available." />

  const filtered = useMemo(() => {
    if (!query.trim()) return faqs
    const q = query.toLowerCase()
    return faqs.filter(
      (f) =>
        f.question.toLowerCase().includes(q) ||
        f.answer.toLowerCase().includes(q)
    )
  }, [faqs, query])

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1">
          <SearchInput
            value={query}
            onChange={(val) => { setQuery(val); setOpen(null) }}
            placeholder="Search FAQs..."
          />
        </div>
        <CountPill count={filtered.length} label="results" />
      </div>

      {filtered.length === 0 ? (
        <TabEmpty text={`No FAQs match "${query}"`} />
      ) : (
        <div className="space-y-3">
          {filtered.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              index={i}
              isOpen={open === i}
              onToggle={() => setOpen(open === i ? null : i)}
              query={query}
            />
          ))}
        </div>
      )}
    </div>
  )
}