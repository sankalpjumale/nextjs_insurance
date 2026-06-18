import mongoose from "mongoose";
import Category from "@/model/Category";

const categories = [
    {
        name: "Travel Insurance",
        slug: "travel",
        description: "Covers medical emergencies, trip cancellations, baggage loss, and travel delays while travelling domestically or internationally.",
        icon: "plane",
        isActive: true,
        displayOrder: 1
    },
    {
    name: "Health Insurance",
    slug: "health",
    description:
      "Covers hospitalization expenses, pre and post hospitalization, daycare procedures, and critical illness treatments.",
    icon: "heart-pulse",
    isActive: true,
    displayOrder: 2,
  },
  {
    name: "Car Insurance",
    slug: "car",
    description:
      "Covers damages to your car due to accidents, theft, natural calamities, and third-party liabilities.",
    icon: "car",
    isActive: true,
    displayOrder: 3,
  },
  {
    name: "Bike Insurance",
    slug: "bike",
    description:
      "Covers damages to your two-wheeler due to accidents, theft, fire, and third-party liabilities.",
    icon: "bike",
    isActive: true,
    displayOrder: 4,
  },
  {
    name: "Home Insurance",
    slug: "home",
    description:
      "Covers damages to your home structure and contents due to fire, theft, natural disasters, and other perils.",
    icon: "home",
    isActive: true,
    displayOrder: 5,
  },
  {
    name: "Term Life Insurance",
    slug: "term-life",
    description:
      "Provides a death benefit to your family in case of your unfortunate demise during the policy period.",
    icon: "shield-check",
    isActive: true,
    displayOrder: 6,
  },
  {
    name: "Personal Accident Insurance",
    slug: "personal-accident",
    description:
      "Covers accidental death, permanent disability, temporary disability, and medical expenses due to accidents.",
    icon: "user-round-x",
    isActive: true,
    displayOrder: 7,
  }
]

async function seedCategories() {
    try {
        
        //connect to mongodb
        await mongoose.connect(process.env.MONGODB_URI as string)
        console.log("Connected as MongoDB")

        //clear existingcategories
        await Category.deleteMany({})
        console.log("Cleared existing categories")

        //insert all categories
        const inserted = await Category.insertMany(categories)
        console.log(`Inserted ${inserted.length} categories successfully`)

        //log inserted categories
        inserted.forEach((cat) => {
            console.log(` -> [${cat.displayOrder}] ${cat.name} (slug: ${cat.slug})`)
        })
    } catch (error) {
        console.error("Seeding failed: ", error)
    } finally {
        console.log("Disconnected from MongoDB")
    }
}

seedCategories()