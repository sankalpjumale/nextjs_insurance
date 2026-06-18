import React from 'react'

interface SectionLabelProps {
    text: string
    icon?: React.ReactNode
}

function SectionLabel({text, icon}: SectionLabelProps) {
  return (
    <div className='inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 text-xs font-semibold px-3 py-1.5 roundd-full mb-6 border border-indigo-100'>
        {icon}
        {text}
    </div>
  )
}

export default SectionLabel