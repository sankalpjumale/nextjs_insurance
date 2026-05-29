import Link from "next/link";
import { Shield, ArrowRight, Star, TrendingUp } from "lucide-react";

interface Policy {
  _id: string
  name: string
  provider: string
  category?: string
  price?: number
  rating?: number
  features?: string[]
}

async function getPolicies() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/policies`, {
      cache: "no-store"
    })
    if(!response.ok) return []
    const data = await response.json()
    return data.data || []
  } catch {
    return []
  }
}

const categoryColors: Record<string, {bg: string; text: string; dot: string}> = {
  health: {bg: "bg-emerald-50", text: "text-emerald-700", dot: "dot-emerald-400"},
  life: {bg: "bg-violet-50", text: "text-violet-700", dot: "dot-violet-400"},
  auto: {bg: "bg-amber-50", text: "text-amber-700", dot: "dot-amber-400"},
  home: {bg: "bg-sky-50", text: "text-sky-700", dot: "dot-sky-400"},
  default: {bg: "bg-slate-50", text: "text-slate-700", dot: "dot-slate-400"}
}

export default async function HomePage() {
  const policies = await getPolicies()

  return (
    <main className="min-h-screen bg-[#f7f5f0]">

      {/* navbar */}
      <nav className="border-b border-stone-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-indigo-600" strokeWidth={2.5}/>
            <span className="font-bold text-xl tracking-tight text-stone-900" style={{fontFamily :"'Playfair Display', serif"}}>PolicyLens</span>
          </div>

          <Link 
            href={"/compare"} 
            className="flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            Compare policies
            <ArrowRight className="w-4 h-4" />
          </Link>

        </div>
      </nav>

      {/* hero */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-12">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 border border-indigo-100">
            <TrendingUp className="w-3.5 h-3.5"/>
            Smart Policy Comparison
          </div>
          <h1 className="text-5xl font-bold text-stone-900 leading-tight mb-4" style={{fontFamily: "'Playfair Display', serif"}}>
            Find the right policy,{" "}
            <span className="text-indigo-600 italic">effortlessly.</span>
          </h1>
          <p className="text-stone-500 text-lg leading-relaxed">Browse policies from top providers and compare them side-by-side to make confident, informed decisions.</p>
        </div>
      </section>

      {/* policy grid */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        {policies.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <Shield className="w-12 h-12 text-stone-300 mb-4"/>
            <p className="text-stone-400 text-lg font-medium">No policies found</p>
            <p className="text-stone-300 text-sm mt-1">Run the seed script to populate sample data.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {policies.map((policy: Policy) => {
              const category = policy.category?.toLowerCase() ?? "default"
              const cate = categoryColors[category] ?? categoryColors.default
              const features = policy.features ?? []
              return (
                <Link
                  key={policy._id}
                  href={`/policy/${policy._id}`}
                  className="group bg-white rounded-2xl border border-stone-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden flex-flex-col"
                >

                  {/* card top accent */}
                  <div className="h-1.5 w-full bg-gradient-t-r from-indigo-400 via-violet-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>

                  <div className="p-6 flex flex-col flex-1">
                    {/* category badge */}
                    <div className="flex items-center justify-between mb-4">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${cate.bg} ${cate.text}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${cate.dot}`}/>
                        {policy.category}
                      </span>
                      {policy.rating && (
                        <span className="flex items-center gap-1 text-xs text-amber-500 font-semibold">
                          <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400"/>
                          {policy.rating}
                        </span>
                      )}
                    </div>

                    {/* title and provider */}
                    <h2 className="text-lg font-bold text-stone-900 mb-1 group-hover:text-indigo-700 transition-colors" style={{fontFamily: "'Playfair Display', serif"}}>{policy.name}</h2>
                    <p className="text-sm text-stone-400 font-medium mb-4">{policy.provider}</p>

                    {/* feature */}
                    {features.length > 0 && (
                      <ul className="space-y-1.5 mb-6 flex-1">
                        {features.slice(0,3).map((f: string, i: number) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-stone-500">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-300 shrink-0"/>
                            {f}
                          </li>
                        ))}
                        {features.length > 3 && (
                          <li className="text-xs text-stone-400 pl-3.5">+{features.length - 3} more</li>
                        )}
                      </ul>
                    )}

                    {/* price + CTA */}
                    <div className="flex items-center justify-between pt-4 border-t border-stone-100 mt-auto">
                      <div>
                        <span className="text-2xl font-bold text-stone-900">₹{policy.price?.toLocaleString("en-IN")}</span>
                        <span className="text-xs text-stone-400 ml-1">/yr</span>
                      </div>

                        <span className="flex items-center gap-1 text-sm font-semibold text-indigo-600 group-hover:gap-2 transition-all">
                          View details
                          <ArrowRight className="w-4 h-4" />
                        </span>

                    </div>
                  </div>
                
                </Link>
              )
            })}
          </div>
        )}
      </section>

    </main>
  )
}
