import { dbConnect } from "@/lib/dbConnect"
import { InsuranceType } from "@/model/Insurance"
import { NextResponse } from "next/server"


export async function GET() {
    try {
        await dbConnect()

        const type = await InsuranceType.find({}) //{} means no filter return everything and .lean() convert mongoose documents to plain JS object

        return NextResponse.json(type)
    } catch (error) {
        console.error("[GET /api/insurance]", error)

        return NextResponse.json(
            {error: "Failed to fetch insurance types", details: String(error)},
            {status: 500}
        )
    }
}
