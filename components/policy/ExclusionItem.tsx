import { XCircle } from "lucide-react"
import HighlightText from "./HighlightText"

interface ExclusionItemProps {
  text: string
  query?: string
}

export function ExclusionItem({ text, query = "" }: ExclusionItemProps) {
  return (
    <li className="flex items-start gap-3 py-3 border-b border-stone-50 last:border-0">
      <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
      <p className="text-sm text-stone-700 leading-relaxed">
        <HighlightText text={text} query={query} />
      </p>
    </li>
  )
}