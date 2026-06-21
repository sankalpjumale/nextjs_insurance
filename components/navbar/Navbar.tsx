'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Shield, Search } from "lucide-react"

const NAV_LINKS = [
  { href: "/categories", label: "Browse" },
  { href: "/search",     label: "Search" },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-50 bg-[#f7f5f0]/80 backdrop-blur border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-stone-900 font-bold text-lg"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          <Shield className="w-5 h-5 text-indigo-600" />
          PolicyLens
        </Link>

        <div className="flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                pathname.startsWith(link.href)
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-stone-500 hover:text-stone-900 hover:bg-stone-100"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/search"
            className="ml-2 p-2 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </nav>
  )
}