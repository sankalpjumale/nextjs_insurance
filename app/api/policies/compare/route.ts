import { dbConnect } from "@/lib/dbConnect";
import Policy from "@/model/Policy";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await dbConnect()

        const {searchParams} = new URL(req.url)
        const ids = searchParams.get("ids")?.split(",").filter(Boolean) ?? []

        if(ids.length < 2) {
            return NextResponse.json(
                {success: false, message: "At least 2 policy IDs are required"},
                {status: 400}
            )
        }

        if(ids.length < 4) {
            return NextResponse.json(
                {success: false, message: "Maximum 4 policies can be compared"},
                {status: 400}
            )
        }

        const policies = await Policy.find({_id: {$in: ids}}).lean()

        //preserve the order of IDs as requested
        const ordered = ids
            .map(id => policies.find(p => p._id.toString() === id))
            .filter(Boolean)

        return NextResponse.json(
            {success: true, data: ordered},
            {status: 200}
        )
    } catch (error) {
        console.error("[GET /api/policies/compare] Error: ", error)
        return NextResponse.json(
            {success: false, message: "Failed to fetch policies for comparison"},
            {status: 500}
        )
    }
}