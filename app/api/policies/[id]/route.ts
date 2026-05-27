import { dbConnect } from "@/lib/dbConnect";
import Policy from "@/model/Policy";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, {params}: {params: {id: string}}) {
    try {
        await dbConnect()

        const policy = await Policy.findById(params.id).lean()

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
        if((error as any).name === "CastError") {
            return NextResponse.json(
                {success: false, message: "Invalid policy Id format"},
                {status: 400}
            )
        }
        return NextResponse.json(
            {success: false, mesage: "Internal server error"},
            {status: 500}
        )
    }
}