import { Check, Minus } from "lucide-react"
import { IPolicy } from "@/model/Policy"
import { buildBenefitMatrix } from "@/lib/comparison"

interface BenefitMatrixSectionProps {
  policies: IPolicy[]
  sectionTitleKey: string
  sectionDisplayTitle: string
}

export function BenefitMatrixSection({
  policies,
  sectionTitleKey,
  sectionDisplayTitle,
}: BenefitMatrixSectionProps) {
  const rows = buildBenefitMatrix(policies, sectionTitleKey)

  if (rows.length === 0) return null

  return (
    <div className="bg-white rounded-2xl border border-stone-100 p-6 mb-5">
      <h3
        className="text-base font-bold text-stone-900 mb-4"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        {sectionDisplayTitle}
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-stone-100">
              <th className="text-left text-xs font-bold text-stone-400 uppercase tracking-widest py-2 pr-4">
                Benefit
              </th>
              {policies.map((p) => (
                <th
                  key={p.slug}
                  className="text-center text-xs font-bold text-stone-500 py-2 px-3 min-w-[120px]"
                >
                  {p.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b border-stone-50 last:border-0">
                <td className="py-3 pr-4 text-stone-700 font-medium">{row.itemTitle}</td>
                {policies.map((p) => {
                  const entry = row.perPolicy[p.slug]
                  return (
                    <td key={p.slug} className="py-3 px-3 text-center">
                      {entry?.covered ? (
                        <div className="flex flex-col items-center gap-0.5">
                          <Check className="w-4 h-4 text-emerald-500" />
                          {entry.limit && (
                            <span className="text-xs text-stone-400">{entry.limit}</span>
                          )}
                        </div>
                      ) : (
                        <Minus className="w-4 h-4 text-stone-300 mx-auto" />
                      )}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}