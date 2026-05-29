import { dbConnect } from "@/lib/dbConnect";
import Policy from "@/model/Policy";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await dbConnect()

        const policies = await Policy.find({}).sort({createdAt: -1}).lean()

        return NextResponse.json(
            {success: true, data: policies},
            {status: 200}
        )
    } catch (error) {
        console.error("[GET /api/policies] Error: ", error)
        return NextResponse.json(
            {success: false, message: "Failed to fetch policies"},
            {status: 500}
        )
    }
}
