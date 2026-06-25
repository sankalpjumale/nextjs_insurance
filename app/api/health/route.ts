//visit http://localhost:3000/api/health to verify DB + collections are reachable

import { NextResponse } from "next/server"
import Category from "@/model/Category"
import Policy from "@/model/Policy"
import { dbConnect } from "@/lib/dbConnect"

export async function GET() {
  try {
    await dbConnect()

    const [categoryCount, policyCount] = await Promise.all([
      Category.countDocuments(),
      Policy.countDocuments(),
    ])

    return NextResponse.json({
      success: true,
      db: "connected",
      collections: {
        categories: categoryCount,
        policies: policyCount,
      },
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        db: "failed",
        error: String(error),
      },
      { status: 500 }
    )
  }
}