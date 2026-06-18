import mongoose, {Schema, Document, Model} from "mongoose";

export interface ICategory extends Document {
    name: string
    slug: string
    description: string
    icon: string
    isActive: boolean
    displayOrder: number
    createdAt: Date
    updatedAt: Date
}


const CategorySchema = new Schema<ICategory>(
    {
        name: {
            type: String,
            required: [true, "Category name is required"],
            trim: true,
            unique: true
        },
        slug: {
            type: String,
            required: [true, "Slug is required"],
            trim: true,
            unique: true,
            lowercase: true
        },
        description: {
            type: String,
            required: [true, "Description is required"],
            trim: true
        },
        icon: {
            type: String,
            required: [true, "Icon is required"],
            trim: true
        },
        isActive: {
            type: Boolean,
            default: true
        },
        displayOrder: {
            type: Number,
            default: 0
        }
    },
    {timestamps: true, collection: "categories"}
)

CategorySchema.index({slug: 1})
CategorySchema.index({isActive: 1, displayOrder: 1})

const Category: Model<ICategory> = 
    mongoose.models.Category ||
    mongoose.model<ICategory>("Category", CategorySchema)

export default Category