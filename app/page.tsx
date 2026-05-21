'use client'

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

type InsurenceType = {
  _id: string
  icon: string
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
        const response = await fetch("/api/insurence-types")
        const data = await response.json()
      } catch (error) {
        console.error("Failed to fetch insurence types", error)
      } finally {
        setLoading(false)
      }
    }
  }, [])

  return (
    <div>
      <header>
        Insurence
      </header>

      <main>
        <h2>Select an Insurence Type</h2>
        <p>Click on a type to view available policies.</p>

        {loading && <p>Loading...</p>}

        <ul>
          {types.map((type) => (
            <li key={type._id}>
              <button onClick={() => router.push(`/insurence/${type._id}`)}>{type.icon} {type.name} Insurence - {type.description}</button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
