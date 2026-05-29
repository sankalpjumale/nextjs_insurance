import { dbConnect } from "@/lib/dbConnect";
import Policy from "@/model/Policy";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_req: NextRequest, {params}: {params: Promise<{id: string}>}) {
    try {
        await dbConnect()
        const {id} = await params

        const policy = await Policy.findById(id).lean()

        if(!policy) {
            return NextResponse.json(
                {success: false, message: "Policy not found"},
                {status: 404}
            )
        }

        return NextResponse.json(
            {success: true, data: policy},
            {status: 200}
        )
    } catch (error) {
        if(error instanceof Error && error.name === "CastError") {
            return NextResponse.json(
                {success: false, message: "Invalid policy Id format"},
                {status: 400}
            )
        }
        return NextResponse.json(
            {success: false, message: "Internal server error"},
            {status: 500}
        )
    }
}
