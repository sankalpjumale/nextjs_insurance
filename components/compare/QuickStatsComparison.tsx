import { IPolicy } from "@/model/Policy"
import { ComparisonRow } from "@/components/compare/ComparisonRow"

export function QuickStatsComparison({ policies }: { policies: IPolicy[] }) {
  return (
    <div className="bg-white rounded-2xl border border-stone-100 p-6 mb-6">
      <h2 className="text-sm font-bold text-stone-700 uppercase tracking-widest mb-4">
        Overview
      </h2>

      <ComparisonRow
        label="Coverage Type"
        values={policies.map((p) => (
          <span key={p.slug} className="font-semibold">{p.coverageType}</span>
        ))}
      />
      <ComparisonRow
        label="Sum Insured"
        values={policies.map((p) => (
          <span key={p.slug}>
            {p.currency} {p.minSumInsured.toLocaleString()} – {p.maxSumInsured.toLocaleString()}
          </span>
        ))}
      />
      <ComparisonRow
        label="Entry Age"
        values={policies.map((p) => (
          <span key={p.slug}>{p.minEntryAge} – {p.maxEntryAge} yrs</span>
        ))}
      />
      <ComparisonRow
        label="Policy Period"
        values={policies.map((p) => (
          <span key={p.slug}>
            {p.minPolicyPeriod && p.maxPolicyPeriod
              ? `${p.minPolicyPeriod} – ${p.maxPolicyPeriod}`
              : p.minPolicyPeriod || "—"}
          </span>
        ))}
      />
      <ComparisonRow
        label="Policy Type"
        values={policies.map((p) => <span key={p.slug}>{p.policyType || "—"}</span>)}
      />
    </div>
  )
}