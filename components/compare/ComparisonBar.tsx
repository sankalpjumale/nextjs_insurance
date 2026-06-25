// 'use client'

// import { useRouter } from "next/navigation"
// import { Scale, X, ArrowRight } from "lucide-react"
// import { useComparisonList } from "@/components/compare/useComparisonList"
// import { buildComparisonUrl, MIN_COMPARE } from "@/lib/comparison"

// export function ComparisonBar() {
//   const router = useRouter()
//   const { slugs, names, remove, clear } = useComparisonList()

//   if (slugs.length === 0) return null

//   return (
//     <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-stone-200 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
//       <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4 flex-wrap">
//         <div className="flex items-center gap-3 flex-wrap">
//           <div className="flex items-center gap-1.5 text-sm font-semibold text-stone-700">
//             <Scale className="w-4 h-4 text-indigo-500" />
//             Comparing {slugs.length}
//           </div>
//           <div className="flex flex-wrap gap-2">
//             {names.map((name, i) => (
//               <span
//                 key={slugs[i]}
//                 className="inline-flex items-center gap-1.5 text-xs font-semibold bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full border border-indigo-100"
//               >
//                 {name}
//                 <button onClick={() => remove(slugs[i])} className="hover:text-indigo-900">
//                   <X className="w-3 h-3" />
//                 </button>
//               </span>
//             ))}
//           </div>
//         </div>

//         <div className="flex items-center gap-3">
//           <button
//             onClick={clear}
//             className="text-xs text-stone-400 hover:text-stone-600 underline underline-offset-2 transition-colors"
//           >
//             Clear
//           </button>
//           <button
//             disabled={slugs.length < MIN_COMPARE}
//             onClick={() => router.push(buildComparisonUrl(slugs))}
//             className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 disabled:bg-stone-200 disabled:text-stone-400 disabled:cursor-not-allowed transition-colors"
//           >
//             Compare now
//             <ArrowRight className="w-4 h-4" />
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }


'use client'

import { useRouter } from "next/navigation"
import { Scale, X, ArrowRight } from "lucide-react"
import { useComparisonList } from "@/components/compare/useComparisonList"
import { buildComparisonUrl, MIN_COMPARE } from "@/lib/comparison"

export function ComparisonBar() {
  const router = useRouter()
  const { slugs, names, remove, clear, mounted } = useComparisonList()

  // Prevent hydration mismatch — render nothing until client has read sessionStorage
  if (!mounted || slugs.length === 0) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-stone-200 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-1.5 text-sm font-semibold text-stone-700">
            <Scale className="w-4 h-4 text-indigo-500" />
            Comparing {slugs.length}
          </div>
          <div className="flex flex-wrap gap-2">
            {names.map((name, i) => (
              <span
                key={slugs[i]}
                className="inline-flex items-center gap-1.5 text-xs font-semibold bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full border border-indigo-100"
              >
                {name}
                <button
                  onClick={() => remove(slugs[i])}
                  className="hover:text-indigo-900 transition-colors"
                  aria-label={`Remove ${name}`}
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={clear}
            className="text-xs text-stone-400 hover:text-stone-600 underline underline-offset-2 transition-colors"
          >
            Clear
          </button>
          <button
            disabled={slugs.length < MIN_COMPARE}
            onClick={() => router.push(buildComparisonUrl(slugs))}
            className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 disabled:bg-stone-200 disabled:text-stone-400 disabled:cursor-not-allowed transition-colors"
          >
            Compare now
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}


// The key change is that mounted is returned from the hook and checked in ComparisonBar before rendering anything. This means on the server and during the first client render the bar is invisible, and only after useEffect fires — when sessionStorage has been read and mounted flips to true — does it appear. That eliminates the hydration mismatch entirely.