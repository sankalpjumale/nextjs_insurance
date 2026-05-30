import Link from "next/link"
import { Activity, ArrowLeft, ArrowRight, CheckCircle2, Shield, Plane } from "lucide-react"
import { getPoliciesByCategory } from "@/lib/actions/policy.actions"

interface Policy {
    _id: string
    name: string
    provider: string
    category: string
    price: number
    coverage: number
    features: string[]
    description?: string
}

export default async function LifePolicyPage() {
    const policies = await getPoliciesByCategory("life") as Policy[]

  return (
    <main className="min-h-screen bg-[#f7f5f0]">
        <nav className="border-b border-stone-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Shield className="w-6 h-6 text-indigo-600" strokeWidth={2.5} />
                        <span
                            className="font-bold text-xl tracking-tight text-stone-900"
                            style={{fontFamily: "'Playfair Display', serif"}}
                        >
                            PolicyLens
                        </span>
                    </div>
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to home
                    </Link>
                </div>
        </nav>

        <section className="max-w-7xl mx-auto px-6 pt-14 pb-10">
            <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-5 border border-emerald-100">
                    <Plane className="w-3.5 h-3.5" />
                    Plane Insurance
                </div>

                <h1
                        className="text-4xl sm:text-5xl font-bold text-stone-900 leading-tight mb-4"
                        style={{fontFamily: "'Playfair Display', serif"}}
                >
                    Plane Policies
                </h1>

                <p className="text-stone-500 text-base sm:text-lg leading-relaxed">
                        Review Travel insurance plans with premiums, coverage amounts, and the benefits included in each policy.
                </p>
            </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 pb-20">
                {policies.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-28 text-center border-2 border-dashed border-stone-200 rounded-2xl">
                        <Activity className="w-11 h-11 text-stone-300 mb-4" />
                        <p className="text-stone-500 text-lg font-semibold">No life policies found</p>
                        <p className="text-stone-400 text-sm mt-1">Run the seed script to add sample health policies.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {policies.map((policy) => (
                            <article
                                key={policy._id}
                                className="bg-white rounded-2xl border border-stone-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
                            >
                                <div className="h-1.5 w-full bg-gradient-to-r from-emerald-400 via-teal-400 to-indigo-400" />
                                <div className="p-6 flex flex-col flex-1">
                                    <div className="flex items-start justify-between gap-4 mb-5">
                                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                            {policy.provider}
                                        </span>
                                        <div className="text-right shrink-0">
                                            <p className="text-xl font-bold text-stone-900">
                                                Rs. {policy.price.toLocaleString("en-IN")}
                                            </p>
                                            <p className="text-xs text-stone-400">per year</p>
                                        </div>
                                    </div>

                                    <h2
                                        className="text-xl font-bold text-stone-900 mb-3"
                                        style={{fontFamily: "'Playfair Display', serif"}}
                                    >
                                        {policy.name}
                                    </h2>
                                    <p className="text-sm text-stone-500 mb-5">
                                        Coverage up to Rs. {policy.coverage.toLocaleString("en-IN")}
                                    </p>

                                    <ul className="space-y-3 mb-6 flex-1">
                                        {policy.features.slice(0, 4).map((feature) => (
                                            <li key={feature} className="flex items-start gap-2 text-sm text-stone-600">
                                                <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="flex items-center justify-between pt-4 border-t border-stone-100 mt-auto">
                                        <Link
                                            href={`/policy/${policy._id}`}
                                            className="flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:gap-2 hover:text-indigo-800 transition-all"
                                        >
                                            View details
                                            <ArrowRight className="w-4 h-4" />
                                        </Link>
                                        <Link
                                            href="/compare"
                                            className="text-sm font-semibold text-stone-500 hover:text-stone-900 transition-colors"
                                        >
                                            Compare
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </section>
    </main>
  )
}