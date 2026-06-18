import { dbConnect } from "@/lib/dbConnect";
import Category from "@/model/Category";
import { NextResponse } from "next/server";

export default async function GET(request: Request) {
    try {
        await dbConnect()

        const {searchParams} = new URL(request.url)
        const showAll = searchParams.get('all') === "true"

        const filter = showAll ? {} : {isActive: true}

        const categories = await Category.find(filter)
            .sort({displayOrder: 1})
            .lean()

        return NextResponse.json(
            {success: true, data: categories},
            {status: 200}
        )
    } catch (error) {
        return NextResponse.json(
            {success: false, error: "Failed to fetch categories"},
            {status: 500}
        )
    }
}