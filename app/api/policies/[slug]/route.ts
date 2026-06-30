import { dbConnect } from "@/lib/dbConnect";
import Policy from "@/model/Policy";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await dbConnect();

    const { slug } = await params;

    const policy = await Policy.findOne({
      slug,
      isActive: true,
    }).lean();

    if (!policy) {
      return NextResponse.json(
        { success: false, error: "Policy not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: policy }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch policy" },
      { status: 500 }
    );
  }
}