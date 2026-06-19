import { IDefinition } from "@/model/Policy"
import HighlightText from "./HighlightText"

interface DefinitionCardProps {
  definition: IDefinition
  query?: string
}

export function DefinitionCard({ definition, query = "" }: DefinitionCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-stone-100 p-5 flex flex-col gap-2">
      <p className="text-sm font-bold text-indigo-700">
        <HighlightText text={definition.term} query={query} />
      </p>
      <p className="text-sm text-stone-600 leading-relaxed">
        <HighlightText text={definition.meaning} query={query} />
      </p>
      {definition.example && (
        <p className="text-xs text-stone-400 italic mt-1">
          e.g. <HighlightText text={definition.example} query={query} />
        </p>
      )}
    </div>
  )
}