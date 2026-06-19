import { FileText } from "lucide-react"
import HighlightText from "./HighlightText"

interface ClaimDocumentItemProps {
  text: string
  index: number
  query?: string
}

export function ClaimDocumentItem({ text, index, query = "" }: ClaimDocumentItemProps) {
  return (
    <li className="flex items-start gap-3 py-3 border-b border-stone-50 last:border-0">
      <div className="shrink-0 w-6 h-6 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold flex items-center justify-center mt-0.5">
        {index + 1}
      </div>
      <div className="flex items-start gap-2 flex-1">
        <FileText className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
        <p className="text-sm text-stone-700 leading-relaxed">
          <HighlightText text={text} query={query} />
        </p>
      </div>
    </li>
  )
}