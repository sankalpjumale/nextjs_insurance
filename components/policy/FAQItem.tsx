import HighlightText from "./HighlightText"
import { IFAQ } from "@/model/Policy"

interface FAQItemProps {
  faq: IFAQ
  index: number
  isOpen: boolean
  onToggle: () => void
  query?: string
}

export function FAQItem({ faq, isOpen, onToggle, query = "" }: FAQItemProps) {
  return (
    <div className="bg-white rounded-2xl border border-stone-100 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-4 text-left text-sm font-semibold text-stone-800 hover:text-indigo-700 transition-colors"
      >
        <span className="pr-4">
          <HighlightText text={faq.question} query={query} />
        </span>
        <span
          className={`shrink-0 text-indigo-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          ▾
        </span>
      </button>
      {isOpen && (
        <div className="px-6 pb-5 pt-4 text-sm text-stone-600 leading-relaxed border-t border-stone-100">
          <HighlightText text={faq.answer} query={query} />
        </div>
      )}
    </div>
  )
}