
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react"
import { TabCard } from "@/components/policy_detail_tabs/TabCard"
import { TabEmpty } from "@/components/policy_detail_tabs/TabEmpty"
import { ICoverageSection, ICoverageItem } from "@/model/Policy"

export function CoverageTab({ sections }: { sections: ICoverageSection[] }) {
  if (!sections?.length) return <TabEmpty text="No coverage sections available." />

  const sorted = [...sections].sort((a, b) => a.displayOrder - b.displayOrder)

  return (
    <div className="space-y-6">
      {sorted.map((section, i) => (
        <TabCard key={i}>
          <div className="flex items-start justify-between gap-4 mb-4">
            <h3
              className="text-lg font-bold text-stone-900"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {section.title}
            </h3>
            {section.sumInsured && (
              <span className="shrink-0 text-xs font-semibold bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full border border-indigo-100">
                {section.sumInsured}
              </span>
            )}
          </div>

          {section.description && (
            <p className="text-sm text-stone-500 mb-5">{section.description}</p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {section.covered?.length > 0 && (
              <CoverageItemList
                label="Covered"
                labelColor="text-emerald-600"
                items={section.covered}
                icon={<CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />}
              />
            )}
            {section.notCovered?.length > 0 && (
              <CoverageItemList
                label="Not Covered"
                labelColor="text-rose-600"
                items={section.notCovered}
                icon={<XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />}
              />
            )}
          </div>

          {section.conditions?.length > 0 && (
            <div className="mt-5 pt-4 border-t border-stone-100">
              <p className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-2">
                Conditions
              </p>
              <ul className="space-y-1.5">
                {section.conditions.map((c, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-stone-600">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </TabCard>
      ))}
    </div>
  )
}

function CoverageItemList({
  label,
  labelColor,
  items,
  icon,
}: {
  label: string
  labelColor: string
  items: ICoverageItem[]
  icon: React.ReactNode
}) {
  return (
    <div>
      <p className={`text-xs font-bold uppercase tracking-widest mb-3 ${labelColor}`}>
        {label}
      </p>
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2">
            {icon}
            <div>
              <p className="text-sm font-semibold text-stone-800">{item.title}</p>
              {item.description && (
                <p className="text-xs text-stone-500 mt-0.5">{item.description}</p>
              )}
              {item.limit && (
                <p className="text-xs font-semibold text-indigo-500 mt-0.5">
                  Limit: {item.limit}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}