import React from 'react'

interface HeaderProps {
  label?: React.ReactNode
  title: string
  titleHighlight?: string
  subtitle?: string
}

function Header({label, title, titleHighlight, subtitle}: HeaderProps) {
  return (
    <div className="max-w-2xl">
        {label && <div className="mb-6">{label}</div>}
        <h1
            className="text-5xl font-bold text-stone-900 leading-tight mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
        >
            {title}{" "}
            {titleHighlight && (
            <span className="text-indigo-600 italic">{titleHighlight}</span>
            )}
        </h1>
        {subtitle && (
            <p className="text-stone-500 text-lg leading-relaxed">{subtitle}</p>
        )}
    </div>
  )
}

export default Header