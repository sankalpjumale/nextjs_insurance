import { TabEmpty } from "@/components/policy_detail_tabs/TabEmpty"
import { IDefinition } from "@/model/Policy"

export function DefinitionsTab({ definitions }: { definitions: IDefinition[] }) {
  if (!definitions?.length) return <TabEmpty text="No definitions available." />

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {definitions.map((def, i) => (
        <div key={i} className="bg-white rounded-2xl border border-stone-100 p-5">
          <p className="text-sm font-bold text-indigo-700 mb-1">{def.term}</p>
          <p className="text-sm text-stone-600 leading-relaxed">{def.meaning}</p>
          {def.example && (
            <p className="text-xs text-stone-400 mt-2 italic">e.g. {def.example}</p>
          )}
        </div>
      ))}
    </div>
  )
}