import React from 'react'

interface CountPillProps {
    count: number
    label?: string
}

function CountPill({count, label}: CountPillProps) {
  return (
    <span className="inline-flex items-center gap-1 text-xs font-semibold bg-stone-100 text-stone-500 px-2 py-0.5 rounded-full">
      {count}
      {label && ` ${label}`}
    </span>
  )
}

export default CountPill