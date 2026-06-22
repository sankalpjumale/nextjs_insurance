import { AlertTriangle, CheckCircle2 } from "lucide-react"
import { IPolicy } from "@/model/Policy"
import { findCoverageGaps } from "@/lib/comparison"

export function CoverageGapPanel({ policies }: { policies: IPolicy[] }) {
  const gaps = findCoverageGaps(policies)

  if (gaps.length === 0) {
    return (
      <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 flex items-start gap-3">
        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-bold text-emerald-800">No coverage gaps detected</p>
          <p className="text-sm text-emerald-700 mt-1">
            All compared policies offer the same broad coverage sections.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="w-5 h-5 text-amber-500" />
        <h2 className="text-sm font-bold text-amber-800 uppercase tracking-widest">
          Coverage Gaps Found
        </h2>
      </div>
      <div className="space-y-3">
        {gaps.map((gap, i) => (
          <div key={i} className="bg-white rounded-xl border border-amber-100 p-4">
            <p className="text-sm font-semibold text-stone-800 mb-1.5">{gap.sectionTitle}</p>
            <p className="text-xs text-stone-500">
              <span className="font-semibold text-emerald-600">Covered by:</span>{" "}
              {gap.presentIn.join(", ")}
            </p>
            <p className="text-xs text-stone-500 mt-0.5">
              <span className="font-semibold text-rose-600">Missing from:</span>{" "}
              {gap.missingFrom.join(", ")}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}