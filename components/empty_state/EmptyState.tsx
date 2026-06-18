import { Shield } from 'lucide-react'
import React from 'react'

interface EmptyStateProps {
    title: string
    subtitle?: string
    icon?: React.ReactNode
}

function EmptyState({title, subtitle, icon}: EmptyStateProps) {
  return (
    <div className='flex flex-col items-center justify-center py-32 text-center'>
        <div className='mb-4 text-stone-300'>
            {icon ?? <Shield className='w-12 h-12' />}
        </div>
        <p className='text-stone-400 text-lg font-medium'>{title}</p>
        {subtitle && <p className='text-stone-300 text-sm mt-1'>{subtitle}</p>}
    </div>
  )
}

export default EmptyState