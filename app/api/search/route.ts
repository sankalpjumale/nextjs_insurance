import { NextResponse } from "next/server"
import Policy from "@/model/Policy"
import { dbConnect } from "@/lib/dbConnect"

export async function GET(request: Request) {
  try {
    await dbConnect()

    const { searchParams } = new URL(request.url)
    const q            = searchParams.get("q")?.trim() ?? ""
    const category     = searchParams.get("category")?.toLowerCase() ?? ""
    const coverageType = searchParams.get("coverageType") ?? ""

    const filter: Record<string, unknown> = { isActive: true }

    if (category)     filter.categorySlug = category
    if (coverageType) filter.coverageType = coverageType

    if (q.length >= 2) {
      const regex = new RegExp(q, "i")
      filter.$or = [
        { name: regex },
        { tagline: regex },
        { insurerName: regex },
        { highlights: regex },
        { "definitions.term": regex },
        { "definitions.meaning": regex },
        { "coverageSections.title": regex },
        { "coverageSections.covered.title": regex },
        { "coverageSections.notCovered.title": regex },
      ]
    }

    const policies = await Policy.find(
      filter,
      "name slug categorySlug insurerName tagline highlights coverageType minSumInsured maxSumInsured currency isFeatured definitions"
    )
      .sort({ isFeatured: -1, displayOrder: 1 })
      .limit(30)
      .lean()

    // Pull matching definitions out per policy for the definitions panel
    const definitionHits: Array<{
      policyName: string
      policySlug: string
      term: string
      meaning: string
      example?: string
    }> = []

    if (q.length >= 2) {
      const regex = new RegExp(q, "i")
      for (const policy of policies) {
        for (const def of policy.definitions ?? []) {
          if (regex.test(def.term) || regex.test(def.meaning)) {
            definitionHits.push({
              policyName: policy.name,
              policySlug: policy.slug,
              term: def.term,
              meaning: def.meaning,
              example: def.example,
            })
          }
        }
      }
    }

    // Strip definitions from policy results before returning
    const policySummaries = policies.map(({ definitions: _d, ...rest }) => rest)

    return NextResponse.json(
      {
        success: true,
        data: {
          policies: policySummaries,
          definitions: definitionHits,
          total: policySummaries.length,
        },
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Search failed" },
      { status: 500 }
    )
  }
}