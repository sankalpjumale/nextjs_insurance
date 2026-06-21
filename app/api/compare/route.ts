import { NextResponse } from "next/server"
import Policy from "@/model/Policy"
import { MAX_COMPARE } from "@/lib/comparison"
import { dbConnect } from "@/lib/dbConnect"

export async function GET(request: Request) {
  try {
    await dbConnect()

    const { searchParams } = new URL(request.url)
    const slugsParam = searchParams.get("policies")

    if (!slugsParam) {
      return NextResponse.json(
        { success: false, error: "No policies specified for comparison" },
        { status: 400 }
      )
    }

    const slugs = slugsParam
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .slice(0, MAX_COMPARE)

    if (slugs.length < 2) {
      return NextResponse.json(
        { success: false, error: "At least 2 policies are required to compare" },
        { status: 400 }
      )
    }

    const policies = await Policy.find({
      slug: { $in: slugs },
      isActive: true,
    }).lean()

    if (policies.length < 2) {
      return NextResponse.json(
        { success: false, error: "Could not find enough valid policies to compare" },
        { status: 404 }
      )
    }

    // Preserve the order the user selected, not the DB return order
    const ordered = slugs
      .map((slug) => policies.find((p) => p.slug === slug))
      .filter(Boolean)

    return NextResponse.json(
      { success: true, data: ordered },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch comparison data" },
      { status: 500 }
    )
  }
}