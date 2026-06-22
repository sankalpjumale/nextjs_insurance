import { notFound } from "next/navigation"
import Link from "next/link"
import { Scale, ArrowLeft } from "lucide-react"
import SectionLabel from "@/components/section_label/SectionLabel"
import PageHeader from "@/components/header/Header"
import EmptyState from "@/components/empty_state/EmptyState"
import { ComparisonHeader } from "@/components/compare/ComparisonHeader"
import { QuickStatsComparison } from "@/components/compare/QuickStatsComparison"
import { CoverageGapPanel } from "@/components/compare/CoverageGapPanel"
import { BenefitMatrix } from "@/components/compare/BenefitMatrix"
import { MIN_COMPARE } from "@/lib/comparison"

async function getComparisonPolicies(slugsParam: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/compare?policies=${slugsParam}`,
      { cache: "no-store" }
    )
    if (!res.ok) return []
    const json = await res.json()
    return json.data ?? []
  } catch {
    return []
  }
}

export default async function ComparePage({
  searchParams,
}: {
  searchParams: Promise<{ policies?: string }>
}) {
  const { policies: slugsParam } = await searchParams

  if (!slugsParam) {
    return (
      <main className="min-h-screen">
        <section className="max-w-7xl mx-auto px-6 pt-16 pb-12">
          <PageHeader
            label={<SectionLabel text="Comparison Engine" icon={<Scale className="w-3.5 h-3.5" />} />}
            title="Compare policies"
            titleHighlight="side-by-side."
            subtitle="Select 2–3 policies from any category page to start a comparison."
          />
        </section>
        <section className="max-w-7xl mx-auto px-6 pb-24">
          <EmptyState
            title="No comparison selected"
            subtitle="Browse a category and tap 'Compare' on the policies you want to evaluate."
            icon={<Scale className="w-12 h-12" />}
          />
        </section>
      </main>
    )
  }

  const policies = await getComparisonPolicies(slugsParam)

  if (policies.length < MIN_COMPARE) notFound()

  return (
    <main className="min-h-screen pb-24">
      <section className="max-w-7xl mx-auto px-6 pt-14 pb-8">
        <Link
          href="/search"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-stone-400 hover:text-stone-700 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to search
        </Link>
        <PageHeader
          label={<SectionLabel text="Comparison Engine" icon={<Scale className="w-3.5 h-3.5" />} />}
          title="Comparing"
          titleHighlight={`${policies.length} policies.`}
          subtitle="A side-by-side breakdown of coverage, gaps, and benefits."
        />
      </section>

      <section className="max-w-7xl mx-auto px-6">
        <ComparisonHeader policies={policies} />
        <QuickStatsComparison policies={policies} />

        <div className="mb-8">
          <h2 className="text-sm font-bold text-stone-700 uppercase tracking-widest mb-4">
            Coverage Gap Analysis
          </h2>
          <CoverageGapPanel policies={policies} />
        </div>

        <BenefitMatrix policies={policies} />
      </section>
    </main>
  )
}