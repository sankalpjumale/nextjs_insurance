import mongoose from "mongoose";
import Policy from "../model/Policy";
import { InsuranceType } from "../model/Insurance";
import dotenv from "dotenv"

dotenv.config({path: ".env"})

const insuranceTypes = [
    {
        name: "Health",
        description: "Covers medical expenses, hospitalization, treatment costs, and preventive care."
    },
    {
        name: "Life",
        description: "Provides financial protection for your family in case of death or critical events."
    },
    {
        name: "Vehicle",
        description: "Protects cars and bikes against accidents, theft, damage, and third-party liability."
    },
    {
        name: "Home",
        description: "Covers your house and belongings against fire, theft, natural disasters, and damage."
    },
    {
        name: "Travel",
        description: "Covers trip cancellations, emergency medical care, lost baggage, and travel delays."
    },
    {
        name: "Term",
        description: "Offers pure life coverage for a fixed period with a lower annual premium."
    },
]

const policies = [
    //health
    {
        name: "HealthSchield Basic",
        provider: "StarHealth",
        category: "health",
        price: 4999,
        coverage: 300000,
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
        coverage: 1000000,
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
        coverage: 500000,
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
        coverage: 10000000,
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
        coverage: 5000000,
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
        coverage: 10000000,
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
        coverage: 500000,
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
        coverage: 100000,
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
        coverage: 700000,
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
        coverage: 2500000,
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
        coverage: 5000000,
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
        coverage: 4000000,
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

        await InsuranceType.deleteMany({})
        console.log("Cleared existing insurance types")

        await InsuranceType.insertMany(insuranceTypes)
        console.log(`Seeded ${insuranceTypes.length} insurance types successfully`)

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
