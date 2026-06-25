// 'use client'
// import Link from "next/link";
// import { Shield, ArrowRight, TrendingUp } from "lucide-react";
// import { useAuth } from "@clerk/nextjs";

// interface InsuranceTypeCard {
//   _id: string
//   name: string
//   description: string
// }

// const insuranceTypes: InsuranceTypeCard[] = [
//   {
//     _id: "health",
//     name: "Health",
//     description: "Covers medical expenses, hospitalization, treatment costs, and preventive care."
//   },
//   {
//     _id: "home",
//     name: "Home",
//     description: "Covers your house and belongings against fire, theft, natural disasters, and damage."
//   },
//   {
//     _id: "life",
//     name: "Life",
//     description: "Provides financial protection for your family in case of death or critical events."
//   },
//   {
//     _id: "term",
//     name: "Term",
//     description: "Offers pure life coverage for a fixed period with a lower annual premium."
//   },
//   {
//     _id: "travel",
//     name: "Travel",
//     description: "Covers trip cancellations, emergency medical care, lost baggage, and travel delays."
//   },
//   {
//     _id: "vehicle",
//     name: "Vehicle",
//     description: "Protects cars and bikes against accidents, theft, damage, and third-party liability."
//   }
// ]

// const categoryColors: Record<string, {bg: string; text: string; dot: string}> = {
//   health: {bg: "bg-emerald-50", text: "text-emerald-700", dot: "dot-emerald-400"},
//   life: {bg: "bg-violet-50", text: "text-violet-700", dot: "dot-violet-400"},
//   vehicle: {bg: "bg-amber-50", text: "text-amber-700", dot: "dot-amber-400"},
//   home: {bg: "bg-sky-50", text: "text-sky-700", dot: "dot-sky-400"},
//   travel: {bg: "bg-rose-50", text: "text-rose-700", dot: "dot-rose-400"},
//   term: {bg: "bg-indigo-50", text: "text-indigo-700", dot: "dot-indigo-400"},
//   default: {bg: "bg-slate-50", text: "text-slate-700", dot: "dot-slate-400"}
// }

// const insuranceRoutes: Record<string, {href: string; text: string}> = {
//    health: {
//     href: "/health",
//     text: "View health policies"
//   },
//   home: {
//     href: "/home-insurance",
//     text: "View home policies"
//   },
//   life: {
//     href: "/life",
//     text: "View life policies"
//   },
//   term: {
//     href: "/term",
//     text: "View term policies"
//   },
//   travel: {
//     href: "/travel",
//     text: "View travel policies"
//   },
//   vehicle: {
//     href: "/vehicle",
//     text: "View vehicle policies"
//   }
// }

// export default function HomePage() {
//   // const {isSignedIn} = useAuth()

//   return (
//     <main className="min-h-screen bg-[#f7f5f0]">

//       {/* hero */}
//       <section className="max-w-7xl mx-auto px-6 pt-16 pb-12">
//         <div className="max-w-2xl">
//           <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 border border-indigo-100">
//             <TrendingUp className="w-3.5 h-3.5"/>
//             Smart Policy Comparison
//           </div>
//           <h1 className="text-5xl font-bold text-stone-900 leading-tight mb-4" style={{fontFamily: "'Playfair Display', serif"}}>
//             Explore insurance types,{" "}
//             <span className="text-indigo-600 italic">effortlessly.</span>
//           </h1>
//           <p className="text-stone-500 text-lg leading-relaxed">Browse insurance categories before comparing plans from top providers side-by-side.</p>
//         </div>
//       </section>

//       {/* insurance type grid */}
//       <section className="max-w-7xl mx-auto px-6 pb-20">
//         {insuranceTypes.length === 0 ? (
//           <div className="flex flex-col items-center justify-center py-32 text-center">
//             <Shield className="w-12 h-12 text-stone-300 mb-4"/>
//             <p className="text-stone-400 text-lg font-medium">No insurance types found</p>
//             <p className="text-stone-300 text-sm mt-1">Run the seed script to populate sample data.</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {insuranceTypes.map((type: InsuranceTypeCard) => {
//               const category = type.name.toLowerCase()
//               const cate = categoryColors[category] ?? categoryColors.default

//               const route = insuranceRoutes[category] ?? {
//                 href: "/compare",
//                 text: 'Compare policies'
//               }
//               return (
//                 <div
//                   key={type._id}
//                   className="group bg-white rounded-2xl border border-stone-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
//                 >
//                   <div className="h-1.5 w-full bg-gradient-to-r from-indigo-400 via-violet-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>

//                   <div className="p-6 flex flex-col flex-1">
//                     <div className="flex items-center justify-between mb-5">
//                       <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${cate.bg} ${cate.text}`}>
//                         <span className={`w-1.5 h-1.5 rounded-full ${cate.dot}`}/>
//                         Insurance type
//                       </span>
//                     </div>

//                     <h2 className="text-xl font-bold text-stone-900 mb-3 group-hover:text-indigo-700 transition-colors" style={{fontFamily: "'Playfair Display', serif"}}>{type.name}</h2>
//                     <p className="text-sm text-stone-500 leading-relaxed mb-6 flex-1">{type.description}</p>

//                     <div className="flex items-center justify-between pt-4 border-t border-stone-100 mt-auto">
//                       <Link 
//                         href={route.href}
//                         className="flex items-center gap-1 text-sm font-semibold text-indigo-600 group-hover:gap-2 transition-all"
//                       >
//                         {route.text}
//                         <ArrowRight className="w-4 h-4" />
//                       </Link>
//                     </div>
//                   </div>
                
//                 </div>
//               )
//             })}
//           </div>
//         )}
//       </section>
//     </main>
//   )
// }


// import Link from "next/link"
// import { TrendingUp, Shield, ArrowRight } from "lucide-react"
// import SectionLabel from "@/components/section_label/SectionLabel"
// import Header from "@/components/header/Header"
// import EmptyState from "@/components/empty_state/EmptyState"
// import {CategoryBadge} from "@/components/category_badge/CategoryBadge"

// async function getCategories() {
//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/categories`, {
//       next: { revalidate: 3600 },
//     })
//     if (!res.ok) return []
//     const json = await res.json()
//     return json.data ?? []
//   } catch {
//     return []
//   }
// }

// export default async function HomePage() {
//   const categories = await getCategories()

//   return (
//     <main className="min-h-screen">

//       {/* Hero */}
//       <section className="max-w-7xl mx-auto px-6 pt-16 pb-12">
//         <Header
//           label={
//             <SectionLabel
//               text="Smart Policy Comparison"
//               icon={<TrendingUp className="w-3.5 h-3.5" />}
//             />
//           }
//           title="Explore insurance types,"
//           titleHighlight="effortlessly."
//           subtitle="Browse insurance categories and compare plans from top providers — without reading a single PDF."
//         />
//       </section>

//       {/* Category Grid */}
//       <section className="max-w-7xl mx-auto px-6 pb-20">
//         {categories.length === 0 ? (
//           <EmptyState
//             title="No categories found"
//             subtitle="Run the seed script to populate sample data."
//           />
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {categories.map((cat: any) => (
//               <Link
//                 key={cat._id}
//                 href={`/categories/${cat.slug}`}
//                 className="group bg-white rounded-2xl border border-stone-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
//               >
//                 <div className="h-1.5 w-full bg-gradient-to-r from-indigo-400 via-violet-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                 <div className="p-6 flex flex-col flex-1">
//                   <div className="flex items-center justify-between mb-5">
//                     <CategoryBadge category={cat.slug} />
//                     <span className="text-xs text-stone-300 font-medium">#{cat.displayOrder}</span>
//                   </div>
//                   <h2
//                     className="text-xl font-bold text-stone-900 mb-3 group-hover:text-indigo-700 transition-colors"
//                     style={{ fontFamily: "'Playfair Display', serif" }}
//                   >
//                     {cat.name}
//                   </h2>
//                   <p className="text-sm text-stone-500 leading-relaxed flex-1">{cat.description}</p>
//                   <div className="flex items-center justify-between pt-4 border-t border-stone-100 mt-6">
//                     <span className="flex items-center gap-1 text-sm font-semibold text-indigo-600 group-hover:gap-2 transition-all">
//                       View policies
//                       <ArrowRight className="w-4 h-4" />
//                     </span>
//                   </div>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         )}
//       </section>
//     </main>
//   )
// }


import Link from "next/link"
import { ArrowRight, TrendingUp } from "lucide-react"
import { CATEGORIES } from "@/config/categories"
import SectionLabel from "@/components/section_label/SectionLabel"
import Header from "@/components/header/Header"
import { CategoryBadge } from "@/components/category_badge/CategoryBadge"

export default function HomePage() {
  return (
    <main className="min-h-screen">

      <section className="max-w-7xl mx-auto px-6 pt-16 pb-12">
        <Header
          label={
            <SectionLabel
              text="Smart Policy Comparison"
              icon={<TrendingUp className="w-3.5 h-3.5" />}
            />
          }
          title="Explore insurance types,"
          titleHighlight="effortlessly."
          subtitle="Browse insurance categories and compare plans from top providers — without reading a single PDF."
        />
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="group bg-white rounded-2xl border border-stone-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
            >
              <div className="h-1.5 w-full bg-gradient-to-r from-indigo-400 via-violet-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-5">
                  <CategoryBadge category={cat.slug} />
                </div>
                <h2
                  className="text-xl font-bold text-stone-900 mb-3 group-hover:text-indigo-700 transition-colors"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {cat.name}
                </h2>
                <p className="text-sm text-stone-500 leading-relaxed flex-1">
                  {cat.description}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-stone-100 mt-6">
                  <span className="flex items-center gap-1 text-sm font-semibold text-indigo-600 group-hover:gap-2 transition-all">
                    View policies
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </main>
  )
}