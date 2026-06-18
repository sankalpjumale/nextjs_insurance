import { dbConnect } from "@/lib/dbConnect";
import Policy from "@/model/Policy";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        // await auth.protect()
        await dbConnect()

        const {searchParams} = new URL(request.url)
        const category = searchParams.get("category")
        const featured = searchParams.get("featured")

         const filter: Record<string, unknown> = { isActive: true };
        if (category) filter.categorySlug = category.toLowerCase();
        if (featured === "true") filter.isFeatured = true;

        //return summary fields only — exclude heavy embedded arrays
        const policies = await Policy.find(filter)
            .select(
                "name slug categorySlug insurerName insurerLogo tagline policyType coverageType minSumInsured maxSumInsured currency minEntryAge maxEntryAge highlights isFeatured displayOrder"
            )
            .sort({ displayOrder: 1 })
            .lean();

        return NextResponse.json(
            { success: true, data: policies }, 
            { status: 200 }
        );
  
    } catch (error) {
        console.error("[GET /api/policies] Error: ", error)
        return NextResponse.json(
            {success: false, message: "Failed to fetch policies"},
            {status: 500}
        )
    }
}
