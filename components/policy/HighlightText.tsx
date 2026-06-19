import React from 'react'

interface HighlightTextProps {
    text: string
    query: string
}

function HighlightText({text, query}: HighlightTextProps) {

    if (!query.trim()) return <>{text}</>

    const parts = text.split(new RegExp(`(${query})`, "gi"))

  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} className="bg-indigo-100 text-indigo-800 rounded px-0.5">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  )
}

export default HighlightText