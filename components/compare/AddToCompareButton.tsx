'use client'

import { Scale, Check } from "lucide-react"
import { useComparisonList } from "@/components/compare/useComparisonList"

interface AddToCompareButtonProps {
  slug: string
  name: string
}

export function AddToCompareButton({ slug, name }: AddToCompareButtonProps) {
  const { add, remove, isSelected, isFull } = useComparisonList()
  const selected = isSelected(slug)

  function handleClick(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    if (selected) {
      remove(slug)
    } else {
      add(slug, name)
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={!selected && isFull}
      className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${
        selected
          ? "bg-indigo-600 text-white border-indigo-600"
          : "bg-white text-stone-500 border-stone-200 hover:border-indigo-300 hover:text-indigo-600 disabled:opacity-40 disabled:cursor-not-allowed"
      }`}
    >
      {selected ? <Check className="w-3.5 h-3.5" /> : <Scale className="w-3.5 h-3.5" />}
      {selected ? "Added" : "Compare"}
    </button>
  )
}