// import { notFound } from "next/navigation"
// import SectionLabel from "@/components/section_label/SectionLabel"
// import Header from "@/components/header/Header"
// import EmptyState from "@/components/empty_state/EmptyState"
// import PolicyCard from "@/components/policy_card/PolicyCard"
// import { Shield } from "lucide-react"

// async function getCategory(slug: string) {
//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/categories`, {
//       next: { revalidate: 3600 },
//     })
//     if (!res.ok) return null
//     const json = await res.json()
//     return (json.data ?? []).find((c: any) => c.slug === slug) ?? null
//   } catch {
//     return null
//   }
// }

// async function getPolicies(categorySlug: string) {
//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_APP_URL}/api/policies?category=${categorySlug}`,
//       { next: { revalidate: 3600 } }
//     )
//     if (!res.ok) return []
//     const json = await res.json()
//     return json.data ?? []
//   } catch {
//     return []
//   }
// }

// export default async function CategoryPage({
//   params,
// }: {
//   params: Promise<{ slug: string }>
// }) {
//   const { slug } = await params
//   const [category, policies] = await Promise.all([
//     getCategory(slug),
//     getPolicies(slug),
//   ])

//   if (!category) notFound()

//   return (
//     <main className="min-h-screen">
//       <section className="max-w-7xl mx-auto px-6 pt-16 pb-12">
//         <Header
//           label={<SectionLabel text={category.name} />}
//           title={`${category.name} Insurance`}
//           titleHighlight="policies."
//           subtitle={category.description}
//         />
//       </section>

//       <section className="max-w-7xl mx-auto px-6 pb-20">
//         <div className="flex items-center justify-between mb-8">
//           <p className="text-sm text-stone-400 font-medium">
//             {policies.length} {policies.length === 1 ? "policy" : "policies"} found
//           </p>
//         </div>

//         {policies.length === 0 ? (
//           <EmptyState
//             title="No policies in this category yet"
//             subtitle="Add policies via the seed script to see them here."
//             icon={<Shield className="w-12 h-12" />}
//           />
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {policies.map((policy: any) => (
//               <PolicyCard key={policy._id} {...policy} />
//             ))}
//           </div>
//         )}
//       </section>
//     </main>
//   )
// }


import { notFound } from "next/navigation"
import { Shield } from "lucide-react"
import { CATEGORIES, getCategoryBySlug } from "@/config/categories"
import SectionLabel from "@/components/section_label/SectionLabel"
import Header from "@/components/header/Header"
import EmptyState from "@/components/empty_state/EmptyState"
import { PolicyCard } from "@/components/policy_card/PolicyCard"

// Tells Next.js which slugs are valid at build time
export function generateStaticParams() {
  return CATEGORIES.map((cat) => ({ slug: cat.slug }))
}

async function getPolicies(categorySlug: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/policies?category=${categorySlug}`,
      { next: { revalidate: 3600 } }
    )
    if (!res.ok) return []
    const json = await res.json()
    return json.data ?? []
  } catch {
    return []
  }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const category = getCategoryBySlug(slug)

  if (!category) notFound()

  const policies = await getPolicies(slug)

  return (
    <main className="min-h-screen">
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-12">
        <Header
          label={<SectionLabel text={category.name} />}
          title={`${category.name} Insurance`}
          titleHighlight="policies."
          subtitle={category.description}
        />
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="flex items-center justify-between mb-8">
          <p className="text-sm text-stone-400 font-medium">
            {policies.length} {policies.length === 1 ? "policy" : "policies"} found
          </p>
        </div>

        {policies.length === 0 ? (
          <EmptyState
            title="No policies in this category yet"
            subtitle="Insert a policy via the extract script to see it here."
            icon={<Shield className="w-12 h-12" />}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {policies.map((policy: any) => (
              <PolicyCard key={policy._id} {...policy} />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}