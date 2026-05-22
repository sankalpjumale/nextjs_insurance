import { dbConnect } from "@/lib/dbConnect"
import { InsurenceType } from "@/model/Insurence"
import { NextResponse } from "next/server"


export async function GET() {
    try {
        await dbConnect()

        const type = await InsurenceType.find({}) //{} means no filter return everything and .lean() convert mongoose documents to plain JS object

        return NextResponse.json(type)
    } catch (error) {
        console.error("[GET /api/insurence]", error)

        return NextResponse.json(
            {error: "Failed to fetch insurence types", details: String(error)},
            {status: 500}
        )
    }
}