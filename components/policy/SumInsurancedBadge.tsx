import React from 'react'

interface SumInsurancedBadgeProps {
    value: string
}

function SumInsurancedBadge({value}: SumInsurancedBadgeProps) {
  return (
    <span className='text-xs font-semibold bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full border border-indigo-100'>{value}</span>
  )
}

export default SumInsurancedBadge