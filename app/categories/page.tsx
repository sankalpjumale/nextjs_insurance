// import Link from "next/link"
// import { ArrowRight, LayoutGrid } from "lucide-react"
// import SectionLabel from "@/components/section_label/SectionLabel"
// import Header from "@/components/header/Header"
// import CategoryBadge from "@/components/category_badge/CategoryBadge"
// import EmptyState from "@/components/empty_state/EmptyState"

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

// export default async function CategoriesPage() {
//   const categories = await getCategories()

//   return (
//     <main className="min-h-screen">
//       <section className="max-w-7xl mx-auto px-6 pt-14 pb-10">
//         <Header
//           label={<SectionLabel text="All Categories" icon={<LayoutGrid className="w-3.5 h-3.5" />} />}
//           title="Browse by insurance"
//           titleHighlight="category."
//           subtitle="Choose a category to explore and compare policies from top insurers."
//         />
//       </section>

//       <section className="max-w-7xl mx-auto px-6 pb-24">
//         {categories.length === 0 ? (
//           <EmptyState
//             title="No categories found"
//             subtitle="Run the seed script to populate categories."
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
//                   </div>
//                   <h2
//                     className="text-xl font-bold text-stone-900 mb-2 group-hover:text-indigo-700 transition-colors"
//                     style={{ fontFamily: "'Playfair Display', serif" }}
//                   >
//                     {cat.name}
//                   </h2>
//                   <p className="text-sm text-stone-500 leading-relaxed flex-1">
//                     {cat.description}
//                   </p>
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
import { ArrowRight, LayoutGrid } from "lucide-react"
import { CATEGORIES } from "@/config/categories"
import SectionLabel from "@/components/section_label/SectionLabel"
import Header from "@/components/header/Header"
import { CategoryBadge } from "@/components/category_badge/CategoryBadge"

export default function CategoriesPage() {
  return (
    <main className="min-h-screen">
      <section className="max-w-7xl mx-auto px-6 pt-14 pb-10">
        <Header
          label={
            <SectionLabel
              text="All Categories"
              icon={<LayoutGrid className="w-3.5 h-3.5" />}
            />
          }
          title="Browse by insurance"
          titleHighlight="category."
          subtitle="Choose a category to explore and compare policies from top insurers."
        />
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-24">
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
                  className="text-xl font-bold text-stone-900 mb-2 group-hover:text-indigo-700 transition-colors"
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