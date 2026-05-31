'use client'

import Link from "next/link"
import {Shield, ArrowLeft, ArrowRight} from 'lucide-react'
import { usePathname } from "next/navigation"

export default function Navbar() {
    const pathname = usePathname()
    const isHomePage = pathname === "/"

    return (
        <nav className="border-b border-stone-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Shield className="w-6 h-6 text-indigo-600" strokeWidth={2.5} />
                    <span
                        className="font-bold text-xl tracking-tight text-stone-900"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        PolicyLens
                    </span>
                </div>

                {isHomePage ? (
                    <Link
                        href="/compare"
                        className="flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
                    >
                        Compare policies
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                ) : (
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to home
                    </Link>
                )}
            </div>
        </nav>
    )
}