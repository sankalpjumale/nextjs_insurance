// import React from 'react'

// interface CategoryBadgeProps {
//     category: string
// }

// const categoryColors: Record<string, {bg: string, text: string, dot: string}> = {
//     health:   { bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-400" },
//     life:     { bg: "bg-violet-50",  text: "text-violet-700",  dot: "bg-violet-400"  },
//     vehicle:  { bg: "bg-amber-50",   text: "text-amber-700",   dot: "bg-amber-400"   },
//     car:      { bg: "bg-amber-50",   text: "text-amber-700",   dot: "bg-amber-400"   },
//     bike:     { bg: "bg-orange-50",  text: "text-orange-700",  dot: "bg-orange-400"  },
//     home:     { bg: "bg-sky-50",     text: "text-sky-700",     dot: "bg-sky-400"     },
//     travel:   { bg: "bg-rose-50",    text: "text-rose-700",    dot: "bg-rose-400"    },
//     term:     { bg: "bg-indigo-50",  text: "text-indigo-700",  dot: "bg-indigo-400"  },
//     accident: { bg: "bg-red-50",     text: "text-red-700",     dot: "bg-red-400"     },
//     default:  { bg: "bg-slate-50",   text: "text-slate-700",   dot: "bg-slate-400"   }
// }

// function CategoryBadge({category}: CategoryBadgeProps) {

//     const key = category.toLowerCase()
//     const c = categoryColors[key]  ?? categoryColors.default

//   return (
//     <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${c.bg} ${c.text}`}>
//         <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`}/>
//         {category}
//     </span>
//   )
// }

// export default CategoryBadge





import { getCategoryBadge, getCategoryName } from "@/config/categories"

interface CategoryBadgeProps {
  category: string
  showName?: boolean
}

export function CategoryBadge({ category, showName = true }: CategoryBadgeProps) {
  const badge = getCategoryBadge(category)

  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${badge.bg} ${badge.text}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
      {showName ? getCategoryName(category) : category}
    </span>
  )
}