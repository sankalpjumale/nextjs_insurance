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
      { faqs: 1 }
    ).lean();

    if (!policy) {
      return NextResponse.json(
        { success: false, error: "Policy not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: policy.faqs },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch FAQs" },
      { status: 500 }
    );
  }
}