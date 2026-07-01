import { NextResponse } from "next/server";
import Policy from "@/model/Policy";
import { dbConnect } from "@/lib/dbConnect";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await dbConnect();

    const {slug} = await params
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");

    const policy = await Policy.findOne(
      { slug, isActive: true },
      { definitions: 1 }
    ).lean();

    if (!policy) {
      return NextResponse.json(
        { success: false, error: "Policy not found" },
        { status: 404 }
      );
    }

    let definitions = policy.definitions;

    // Optional client-side term search
    if (search) {
      const q = search.toLowerCase();
      definitions = definitions.filter(
        (d) =>
          d.term.toLowerCase().includes(q) ||
          d.meaning.toLowerCase().includes(q)
      );
    }

    return NextResponse.json(
      { success: true, data: definitions },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch definitions" },
      { status: 500 }
    );
  }
}