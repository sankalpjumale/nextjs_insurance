import { NextResponse } from "next/server";
import Policy from "@/model/Policy";
import { dbConnect } from "@/lib/dbConnect";

export async function GET(request: Request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q")?.trim();

    if (!q || q.length < 2) {
      return NextResponse.json(
        { success: false, error: "Query must be at least 2 characters" },
        { status: 400 }
      );
    }

    const regex = new RegExp(q, "i");

    const policies = await Policy.find(
      {
        isActive: true,
        $or: [
          { name: regex },
          { tagline: regex },
          { insurerName: regex },
          { highlights: regex },
          { "definitions.term": regex },
          { "definitions.meaning": regex },
        ],
      },
      "name slug categorySlug insurerName tagline highlights"
    )
      .limit(20)
      .lean();

    return NextResponse.json(
      { success: true, data: policies, count: policies.length },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Search failed" },
      { status: 500 }
    );
  }
}