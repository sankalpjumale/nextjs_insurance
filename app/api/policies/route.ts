import { dbConnect } from "@/lib/dbConnect";
import Policy from "@/model/Policy";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await auth.protect()
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
