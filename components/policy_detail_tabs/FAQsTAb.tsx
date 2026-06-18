'use client'

import { useState } from "react"
import { TabEmpty } from "@/components/policy_detail_tabs/TabEmpty"
import { IFAQ } from "@/model/Policy"

export function FAQsTab({ faqs }: { faqs: IFAQ[] }) {
  const [open, setOpen] = useState<number | null>(null)
  if (!faqs?.length) return <TabEmpty text="No FAQs available." />

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div key={i} className="bg-white rounded-2xl border border-stone-100 overflow-hidden">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between px-6 py-4 text-left text-sm font-semibold text-stone-800 hover:text-indigo-700 transition-colors"
          >
            {faq.question}
            <span
              className={`ml-4 shrink-0 text-indigo-400 transition-transform duration-200 ${
                open === i ? "rotate-180" : ""
              }`}
            >
              ▾
            </span>
          </button>
          {open === i && (
            <div className="px-6 pb-5 text-sm text-stone-600 leading-relaxed border-t border-stone-100 pt-4">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}