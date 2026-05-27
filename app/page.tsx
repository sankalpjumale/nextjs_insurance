'use client'

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

type InsurenceType = {
  _id: string
  name: string
  description: string
}
export default function Home() {

  const router = useRouter()
  const [types, setTypes] = useState<InsurenceType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTypes() {
      try {
        const response = await fetch("/api/insurence")
        const data = await response.json()
        setTypes(data)
        // console.log("api response: ", data)
      } catch (error) {
        console.error("Failed to fetch insurence types", error)
      } finally {
        setLoading(false)
      }
    }
    fetchTypes()
  }, [])

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white px-6 py-4 text-xl font-bold">
        Insurence
      </header>

      <main className="max-w-2xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-1">Select an Insurence Type</h2>
        <p className="text-gray-500 mb-6">Click on a type to view available policies.</p>

        {loading && <p className="text-gray-400">Loading...</p>}
        {!loading && types.length === 0 && (
          <p className="text-gray-400">No insurance types found</p>
        )}

        <ul className="flex flex-col gap-3">
          {types.map((type) => (
            <li key={type._id}>
              <button onClick={() => router.push(`/insurence/${type._id}`)} className="w-full text-left bg-white border border-gray-200 rounded-lg px-5 py-4 hover: bg-blue-50 hover: border-blue-400 transition">
                <span className="font-semibold text-gray-800">{type.name} insurance</span>
                <span className="text-gray-500 text-sm block mt-1">{type.description}</span>
              </button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
