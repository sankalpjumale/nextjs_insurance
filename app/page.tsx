import Link from "next/link";
import { Shield, ArrowRight, TrendingUp } from "lucide-react";
import { dbConnect } from "@/lib/dbConnect";
import { InsuranceType } from "@/model/Insurance";

interface InsuranceTypeCard {
  _id: string
  name: string
  description: string
}

async function getInsuranceTypes(): Promise<InsuranceTypeCard[]> {
  try {
    await dbConnect()
    const insuranceTypes = await InsuranceType.find({}).sort({name: 1}).lean()
    return JSON.parse(JSON.stringify(insuranceTypes))
  } catch {
    return []
  }
}

const categoryColors: Record<string, {bg: string; text: string; dot: string}> = {
  health: {bg: "bg-emerald-50", text: "text-emerald-700", dot: "dot-emerald-400"},
  life: {bg: "bg-violet-50", text: "text-violet-700", dot: "dot-violet-400"},
  vehicle: {bg: "bg-amber-50", text: "text-amber-700", dot: "dot-amber-400"},
  home: {bg: "bg-sky-50", text: "text-sky-700", dot: "dot-sky-400"},
  travel: {bg: "bg-rose-50", text: "text-rose-700", dot: "dot-rose-400"},
  term: {bg: "bg-indigo-50", text: "text-indigo-700", dot: "dot-indigo-400"},
  default: {bg: "bg-slate-50", text: "text-slate-700", dot: "dot-slate-400"}
}

export default async function HomePage() {
  const insuranceTypes = await getInsuranceTypes()

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
            Explore insurance types,{" "}
            <span className="text-indigo-600 italic">effortlessly.</span>
          </h1>
          <p className="text-stone-500 text-lg leading-relaxed">Browse insurance categories before comparing plans from top providers side-by-side.</p>
        </div>
      </section>

      {/* insurance type grid */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        {insuranceTypes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <Shield className="w-12 h-12 text-stone-300 mb-4"/>
            <p className="text-stone-400 text-lg font-medium">No insurance types found</p>
            <p className="text-stone-300 text-sm mt-1">Run the seed script to populate sample data.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {insuranceTypes.map((type: InsuranceTypeCard) => {
              const category = type.name.toLowerCase()
              const cate = categoryColors[category] ?? categoryColors.default
              return (
                <div
                  key={type._id}
                  className="group bg-white rounded-2xl border border-stone-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
                >
                  <div className="h-1.5 w-full bg-gradient-to-r from-indigo-400 via-violet-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>

                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-5">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${cate.bg} ${cate.text}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${cate.dot}`}/>
                        Insurance type
                      </span>
                    </div>

                    <h2 className="text-xl font-bold text-stone-900 mb-3 group-hover:text-indigo-700 transition-colors" style={{fontFamily: "'Playfair Display', serif"}}>{type.name}</h2>
                    <p className="text-sm text-stone-500 leading-relaxed mb-6 flex-1">{type.description}</p>

                    <div className="flex items-center justify-between pt-4 border-t border-stone-100 mt-auto">
                      <Link
                        href="/compare"
                        className="flex items-center gap-1 text-sm font-semibold text-indigo-600 group-hover:gap-2 transition-all"
                      >
                        Compare policies
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                
                </div>
              )
            })}
          </div>
        )}
      </section>

    </main>
  )
}
