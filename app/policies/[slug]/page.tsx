import { notFound } from "next/navigation"
import { Shield, CheckCircle } from "lucide-react"
import CategoryBadge from "@/components/category_badge/CategoryBadge"
import {PolicyDetailTabs} from "@/components/policy_detail_tabs/PolicyDetailTabs"
import { dbConnect } from "@/lib/dbConnect"
import Policy from "@/model/Policy"

async function getPolicy(slug: string) {
  try {
    // const res = await fetch(
    //   `${process.env.NEXT_PUBLIC_APP_URL}/api/policies/${slug}`,
    //   { next: { revalidate: 3600 } }
    // )
    // if (!res.ok) return null
    // const json = await res.json()
    // return json.data ?? null

    await dbConnect()
    const policy = await Policy.findOne({ slug, isActive: true }).lean()
    if(!policy) return null
    return JSON.parse(JSON.stringify(policy)) //strips all mongodb specific types
    //lean() still returns ObjectId and Date objects which Next.js blocks from being passed to client components. added JSON.parse/stringify to convert the policy document into a plain object after DB query.
  } catch {
    return null
  }
}

export default async function PolicyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const policy = await getPolicy(slug)

  if (!policy) notFound()

  return (
    <main className="min-h-screen">

      {/* Policy Header */}
      <section className="max-w-7xl mx-auto px-6 pt-14 pb-10">
        <div className="flex flex-wrap items-start gap-3 mb-6">
          <CategoryBadge category={policy.categorySlug} />
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-stone-100 text-stone-600">
            {policy.coverageType}
          </span>
          {policy.isFeatured && (
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
              ★ Featured
            </span>
          )}
        </div>

        <h1
          className="text-4xl sm:text-5xl font-bold text-stone-900 leading-tight mb-2"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {policy.name}
        </h1>
        <p className="text-sm font-semibold text-stone-400 uppercase tracking-wide mb-4">
          {policy.insurerName}
        </p>
        {policy.tagline && (
          <p className="text-stone-500 text-lg leading-relaxed max-w-2xl mb-8">{policy.tagline}</p>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Sum Insured", value: `${policy.currency} ${policy.minSumInsured.toLocaleString()} – ${policy.maxSumInsured.toLocaleString()}` },
            { label: "Entry Age", value: `${policy.minEntryAge} – ${policy.maxEntryAge} yrs` },
            { label: "Policy Period", value: policy.minPolicyPeriod && policy.maxPolicyPeriod ? `${policy.minPolicyPeriod} – ${policy.maxPolicyPeriod}` : policy.minPolicyPeriod || "—" },
            { label: "Policy Type", value: policy.policyType || "—" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl border border-stone-100 px-4 py-3">
              <p className="text-xs text-stone-400 font-medium mb-1">{stat.label}</p>
              <p className="text-sm font-bold text-stone-800">{stat.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Highlights */}
      {policy.highlights?.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 pb-8">
          <div className="bg-white rounded-2xl border border-stone-100 p-6">
            <h2 className="text-sm font-bold text-stone-700 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4 text-indigo-500" />
              Key Highlights
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {policy.highlights.map((h: string, i: number) => (
                <li key={i} className="flex items-start gap-2 text-sm text-stone-600">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Tabbed Detail Section */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <PolicyDetailTabs policy={policy} />
      </section>
    </main>
  )
}