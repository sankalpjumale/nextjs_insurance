import { ICoverageItem } from '@/model/Policy'
import React from 'react'
import HighlightText from './HighlightText'

interface CoverageItemRowProps {
    item: ICoverageItem 
    icon: React.ReactNode
    query?: string
}

function CoverageItemRow({item, icon, query=""}: CoverageItemRowProps) {
  return (
    <li className="flex items-start gap-3 py-3 border-b border-stone-50 last:border-0">
        <div className="mt-0.5 shrink-0">{icon}</div>
        <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-stone-800">
            <HighlightText text={item.title} query={query} />
            </p>
            {item.description && (
            <p className="text-xs text-stone-500 mt-0.5 leading-relaxed">
                <HighlightText text={item.description} query={query} />
            </p>
            )}
            {item.limit && (
            <span className="inline-block mt-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                Limit: {item.limit}
            </span>
            )}
        </div>
    </li>
  )
}

export default CoverageItemRow