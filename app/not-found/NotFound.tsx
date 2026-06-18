import Link from "next/link"
import { Shield } from "lucide-react"

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <Shield className="w-12 h-12 text-stone-300 mb-4" />
      <h1 className="text-3xl font-bold text-stone-900 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
        Page not found
      </h1>
      <p className="text-stone-500 mb-8">The policy or category you're looking for doesn't exist.</p>
      <Link href="/" className="px-5 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors">
        Back to home
      </Link>
    </main>
  )
}