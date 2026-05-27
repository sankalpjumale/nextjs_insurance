import Policy from "@/model/Policy";
import { dbConnect } from "../dbConnect";

export async function getPolicyById(id: string) {
    await dbConnect()
    try {
        const policy = await Policy.findById(id).lean()
        if(!policy) return null
        return JSON.parse(JSON.stringify(policy))
    } catch{
        return null
    }
}