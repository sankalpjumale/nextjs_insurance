// import Policy from "@/model/Policy";
// import { dbConnect } from "../dbConnect";

// export async function getPoliciesByCategory(category: string) {
//     await dbConnect()
//     try {
//         const policies = await Policy.find({
//             category: category.toLowerCase(),
//             isActive: true,
//         })
//             .sort({price: 1})
//             .lean()

//         return JSON.parse(JSON.stringify(policies))
//     } catch {
//         return []
//     }
// }

// export async function getPolicyById(id: string) {
//     await dbConnect()
//     try {
//         const policy = await Policy.findById(id).lean()
//         if(!policy) return null
//         return JSON.parse(JSON.stringify(policy))
//     } catch{
//         return null
//     }
// }
