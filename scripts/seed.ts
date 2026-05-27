// import mongoose from "mongoose"

// const MONGODB_URI = process.env.MONGODB_URI!

// //defined here because seed.ts run as a standalone node script outside next.js
// const InsuranceTypeSchema = new mongoose.Schema({
//     name: String,
//     description: String
// })

// const DEFAULT_INSURANCE_TYPES = [
//     {
//         name: "Health",
//         description: "Covers medical expenses, hospitalization and treatment costs"
//     },
//     {
//         name: "Life",
//         description: "Provides financial security to your family in case of your demise."
//     },
//     {
//         name: "Vehicle",
//         description: "Protects your car or bike against accidents, theft and damage."
//     },
//     {
//         name: "Home",
//         description: "Covers your home against fire, natural disasters and theft."
//     },
//     {
//         name: "Travel",
//         description: "Covers trip cancellation, medical emergencies and lost baggage."
//     },
//     {
//         name: "Term",
//         description: "Pure life cover for a fixed period at low premium."
//     },
// ]

// //register model, reuse if already registered create if not
// const InsuranceType =
//     mongoose.models.InsuranceType ||
//     mongoose.model("InsuranceType", InsuranceTypeSchema)

// async function seed() {

//     console.log("Connecting to MongoDB...")
//     await mongoose.connect(MONGODB_URI)
//     console.log("Connected")

//     //wipe the collection first, prevents duplicate entries on re-run
//     console.log("Clearing existing insurance types...")
//     await InsuranceType.deleteMany({})

//     //insert all insurance types in a single bulk 
//     console.log("Seeding insurance types...")
//     const types = await InsuranceType.insertMany(DEFAULT_INSURANCE_TYPES)

//     console.log(`Seeded ${types.length} insurance types`)

//     await mongoose.disconnect()
//     console.log("Disconnected from MongoDB")
// }

// export async function autoSeed() {
//     const count = await InsuranceType.countDocuments()
//     if (count === 0) {
//         await InsuranceType.insertMany(DEFAULT_INSURANCE_TYPES)
//         console.log("🌱 Auto-seeded 6 insurance types")
//     }
// }

// seed().catch((err) => {
//     console.error("Seed failed: ", err)
//     process.exit(1)
// })


import mongoose from "mongoose";
import Policy from "@/model/Policy";
import dotenv from "dotenv"

dotenv.config({path: ".env"})

const policies = [
    //health
    {
        name: "HealthSchield Basic",
        provider: "StarHealth",
        category: "health",
        price: 4999,
        coverage: "₹3,00,000 hospitalization cover",
        features: [
            "Cashless hospitalization",
            "Pre & Post hospitalization",
            "Day care procedure",
            "No claim bonus 10%"
        ]
    },
    {
        name: "HealthSchield Premium",
        provider: "StarHealth",
        category: "health",
        price: 9999,
        coverage: "₹10,00,000 hospitalization cover",
        features: [
            "Cashless hospitalization",
            "Critical illness cover",
            "Maternity benefits",
            "International emergency cover",
            "No claim bonus 20%"
        ]
    },
    {
        name: "MediCare Plus",
        provider: "HDFC Ergo",
        category: "health",
        price: 7499,
        coverage: "₹5,00,000 hospitalization cover",
        features: [
            "Cashless at 10,000+ hospitals",
            "AYUSH treatment cover",
            "OPD cover",
            "Annual health checkup"
        ]
    },

    //life
    {
        name: "Lifesure Term Plan",
        provider: "LIC",
        category: "life",
        price: 12000,
        coverage: "₹1,00,00,000 death benefits",
        features: [
            "Pure term insurance",
            "Accidental death benefits rider",
            "Tax benefits under 80C",
            "30-year policy term"
        ]
    },
    {
        name: "SmartLife endowment",
        provider: "SBI Life",
        category: "life",
        price: 24000,
        coverage: "₹50,00,000 death benefits",
        features: [
            "Death + maturity benefits",
            "Bonus addtions",
            "Loan facility",
            "Tax benefits under 80C & 10(100)"
        ]
    },
    {
        name: "iProtect Smart",
        provider: "ICICI Prudential",
        category: "life",
        price: 9500,
        coverage: "₹1,00,00,000 death benefits",
        features: [
            "Terminal illness benefits",
            "Walver of premium rider",
            "Flexible payout options",
            "Online discount available"
        ]
    },

    //auto
    {
        name: "DriverShield Comprehensive",
        provider: "Bajaj Allianz",
        category: "auto",
        price: 8500,
        coverage: "Own damage + third party liability",
        features: [
            "Zero depreciation cover",
            "Roadside assistance 24/7",
            "Engine protection",
            "No claim bonus up to 50%"
        ]
    },
    {
        name: "AutoSafe Third Party",
        provider: "IFFCO Tokio",
        category: "auto",
        price: 2200,
        coverage: "Third party liability only",
        features: [
            "Mandatory third party cover",
            "Personal accident cover",
            "Legal liability cover"
        ]
    },
    {
        name: "Motor Elite",
        provider: "HDFC Ergo",
        category: "auto",
        price: 11000,
        coverage: "Own damage + third party + add-ons",
        features: [
            "Return to invoice cover",
            "Consumables cover",
            "Key replacement cover",
            "Tyre protection cover",
            "NCB protection"
        ]
    },

    //home
    {
        name: "HomeSafe Basic",
        provider: "New India Assurance",
        category: "home",
        price: 3500,
        coverage: "₹25,00,000",
        features: [
            "Fire and allied perils",
            "Nature disaster cover",
            "Burglary cover"
        ]
    },
    {
        name: "HomeShield Complete",
        provider: "Tata AIG",
        category: "home",
        price: 6800,
        coverage: "₹50,00,000 structure + contents cover",
        features: [
            "Structure + contents cover",
            "Earthquake cover",
            "Flood & storm cover",
            "Temporary accomodation cover",
            "Public liability cover"
        ]
    },
    {
        name: "GrihaRaksha Premium",
        provider: "Bajaj Allianz",
        category: "home",
        price: 5200,
        coverage: "₹40,00,000 structure + valuable cover",
        features: [
            "Structure cover",
            "Jewelry & valuables cover",
            "Electronic equipment cover",
            "Rent for alternate accomodation"
        ]
    }, 
]

async function seed() {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string)
        console.log("Connected to MongoDB")

        await Policy.deleteMany({})
        console.log("Cleared existing policies")

        await Policy.insertMany(policies)
        console.log(`Seeded ${policies.length} policies successfully`)
    } catch (error) {
        console.error("Seed failed: ", error)
    } finally {
        await mongoose.disconnect()
        console.log("Disconnected from MongoDB")
    }
}

seed()