// // import mongoose from "mongoose";
// // import Category from "@/model/Category";

// // const categories = [
// //     {
// //         name: "Travel Insurance",
// //         slug: "travel",
// //         description: "Covers medical emergencies, trip cancellations, baggage loss, and travel delays while travelling domestically or internationally.",
// //         icon: "plane",
// //         isActive: true,
// //         displayOrder: 1
// //     },
// //     {
// //     name: "Health Insurance",
// //     slug: "health",
// //     description:
// //       "Covers hospitalization expenses, pre and post hospitalization, daycare procedures, and critical illness treatments.",
// //     icon: "heart-pulse",
// //     isActive: true,
// //     displayOrder: 2,
// //   },
// //   {
// //     name: "Car Insurance",
// //     slug: "car",
// //     description:
// //       "Covers damages to your car due to accidents, theft, natural calamities, and third-party liabilities.",
// //     icon: "car",
// //     isActive: true,
// //     displayOrder: 3,
// //   },
// //   {
// //     name: "Bike Insurance",
// //     slug: "bike",
// //     description:
// //       "Covers damages to your two-wheeler due to accidents, theft, fire, and third-party liabilities.",
// //     icon: "bike",
// //     isActive: true,
// //     displayOrder: 4,
// //   },
// //   {
// //     name: "Home Insurance",
// //     slug: "home",
// //     description:
// //       "Covers damages to your home structure and contents due to fire, theft, natural disasters, and other perils.",
// //     icon: "home",
// //     isActive: true,
// //     displayOrder: 5,
// //   },
// //   {
// //     name: "Term Life Insurance",
// //     slug: "term-life",
// //     description:
// //       "Provides a death benefit to your family in case of your unfortunate demise during the policy period.",
// //     icon: "shield-check",
// //     isActive: true,
// //     displayOrder: 6,
// //   },
// //   {
// //     name: "Personal Accident Insurance",
// //     slug: "personal-accident",
// //     description:
// //       "Covers accidental death, permanent disability, temporary disability, and medical expenses due to accidents.",
// //     icon: "user-round-x",
// //     isActive: true,
// //     displayOrder: 7,
// //   }
// // ]

// // async function seedCategories() {
// //     try {
        
// //         //connect to mongodb
// //         await mongoose.connect(process.env.MONGODB_URI as string)
// //         console.log("Connected as MongoDB")

// //         //clear existingcategories
// //         await Category.deleteMany({})
// //         console.log("Cleared existing categories")

// //         //insert all categories
// //         const inserted = await Category.insertMany(categories)
// //         console.log(`Inserted ${inserted.length} categories successfully`)

// //         //log inserted categories
// //         inserted.forEach((cat) => {
// //             console.log(` -> [${cat.displayOrder}] ${cat.name} (slug: ${cat.slug})`)
// //         })
// //     } catch (error) {
// //         console.error("Seeding failed: ", error)
// //     } finally {
// //         console.log("Disconnected from MongoDB")
// //     }
// // }

// // seedCategories()

// import mongoose from "mongoose";
// import dotenv from "dotenv";
// dotenv.config();

// const MONGODB_URI = process.env.MONGODB_URI!;

// const CategorySchema = new mongoose.Schema(
//   {
//     name:         { type: String, required: true, unique: true, trim: true },
//     slug:         { type: String, required: true, unique: true, lowercase: true, trim: true },
//     description:  { type: String, required: true, trim: true },
//     icon:         { type: String, required: true, trim: true },
//     isActive:     { type: Boolean, default: true },
//     displayOrder: { type: Number, default: 0 },
//   },
//   { timestamps: true, collection: "categories" }
// );

// const Category =
//   mongoose.models.Category ||
//   mongoose.model("Category", CategorySchema);

// const CATEGORIES = [
//   {
//     name: "Health",
//     slug: "health",
//     description:
//       "Covers medical expenses, hospitalization, surgery, treatment costs, and preventive care for individuals and families.",
//     icon: "heart-pulse",
//     isActive: true,
//     displayOrder: 1,
//   },
//   {
//     name: "Travel",
//     slug: "travel",
//     description:
//       "Covers trip cancellations, emergency medical care abroad, lost baggage, flight delays, and passport loss.",
//     icon: "plane",
//     isActive: true,
//     displayOrder: 2,
//   },
//   {
//     name: "Car",
//     slug: "car",
//     description:
//       "Protects your car against accidents, theft, fire, natural disasters, and third-party liability.",
//     icon: "car",
//     isActive: true,
//     displayOrder: 3,
//   },
//   {
//     name: "Bike",
//     slug: "bike",
//     description:
//       "Covers two-wheelers against accidental damage, theft, and third-party bodily injury or property damage.",
//     icon: "bike",
//     isActive: true,
//     displayOrder: 4,
//   },
//   {
//     name: "Home",
//     slug: "home",
//     description:
//       "Covers your house structure and contents against fire, flood, earthquake, theft, and accidental damage.",
//     icon: "home",
//     isActive: true,
//     displayOrder: 5,
//   },
//   {
//     name: "Term Life",
//     slug: "term",
//     description:
//       "Provides a death benefit to your family if you pass away during the policy term. Pure protection at low premiums.",
//     icon: "shield",
//     isActive: true,
//     displayOrder: 6,
//   },
//   {
//     name: "Personal Accident",
//     slug: "accident",
//     description:
//       "Pays a lump sum or compensation on accidental death, permanent disability, or temporary disability due to an accident.",
//     icon: "alert-triangle",
//     isActive: true,
//     displayOrder: 7,
//   },
// ]

// async function main() {
//   await mongoose.connect(MONGODB_URI);
//   console.log("Connected to MongoDB");

//   let inserted = 0;
//   let skipped  = 0;

//   for (const cat of CATEGORIES) {
//     const existing = await Category.findOne({ slug: cat.slug });
//     if (existing) {
//       console.log(`  SKIP  ${cat.slug} (already exists)`);
//       skipped++;
//       continue;
//     }
//     await Category.create(cat);
//     console.log(`  OK    ${cat.slug}`);
//     inserted++;
//   }

//   console.log(`\nDone. ${inserted} inserted, ${skipped} skipped.`);
//   await mongoose.disconnect();
// }

// main().catch((err) => {
//   console.error(err);
//   process.exit(1);
// });