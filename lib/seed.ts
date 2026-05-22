import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI!

//defined here because seed.ts run as a standalone node script outside next.js
const InsuranceTypeSchema = new mongoose.Schema({
    name: String,
    description: String
})

const DEFAULT_INSURANCE_TYPES = [
    {
        name: "Health",
        description: "Covers medical expenses, hospitalization and treatment costs"
    },
    {
        name: "Life",
        description: "Provides financial security to your family in case of your demise."
    },
    {
        name: "Vehicle",
        description: "Protects your car or bike against accidents, theft and damage."
    },
    {
        name: "Home",
        description: "Covers your home against fire, natural disasters and theft."
    },
    {
        name: "Travel",
        description: "Covers trip cancellation, medical emergencies and lost baggage."
    },
    {
        name: "Term",
        description: "Pure life cover for a fixed period at low premium."
    },
]

//register model, reuse if already registered create if not
const InsuranceType =
    mongoose.models.InsuranceType ||
    mongoose.model("InsuranceType", InsuranceTypeSchema)

async function seed() {

    console.log("Connecting to MongoDB...")
    await mongoose.connect(MONGODB_URI)
    console.log("Connected")

    //wipe the collection first, prevents duplicate entries on re-run
    console.log("Clearing existing insurance types...")
    await InsuranceType.deleteMany({})

    //insert all insurance types in a single bulk 
    console.log("Seeding insurance types...")
    const types = await InsuranceType.insertMany(DEFAULT_INSURANCE_TYPES)

    console.log(`Seeded ${types.length} insurance types`)

    await mongoose.disconnect()
    console.log("Disconnected from MongoDB")
}

export async function autoSeed() {
    const count = await InsuranceType.countDocuments()
    if (count === 0) {
        await InsuranceType.insertMany(DEFAULT_INSURANCE_TYPES)
        console.log("🌱 Auto-seeded 6 insurance types")
    }
}

seed().catch((err) => {
    console.error("Seed failed: ", err)
    process.exit(1)
})