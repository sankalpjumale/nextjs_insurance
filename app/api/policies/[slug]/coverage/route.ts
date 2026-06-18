import { NextResponse } from "next/server";
import Policy from "@/model/Policy";
import { dbConnect } from "@/lib/dbConnect";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    await dbConnect();

    const policy = await Policy.findOne(
      { slug: params.slug, isActive: true },
      { coverageSections: 1 }
    ).lean();

    if (!policy) {
      return NextResponse.json(
        { success: false, error: "Policy not found" },
        { status: 404 }
      );
    }

    const sorted = [...policy.coverageSections].sort(
      (a, b) => a.displayOrder - b.displayOrder
    );

    return NextResponse.json({ success: true, data: sorted }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch coverage sections" },
      { status: 500 }
    );
  }
}