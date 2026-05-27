import mongoose, {Schema, Document, Model} from "mongoose";

export interface IPolicy extends Document {
    name: string
    provider: string
    category: "health" | "life" | "auto" | "home"
    price: number
    coverage: number
    features: string[]
    description: string
    isActive: boolean
    createdAt: Date
    updatedAt: Date
}

const PolicySchema: Schema<IPolicy> = new Schema(
    {
        name: {
            type: String,
            required: [true, "Policy name is required"],
            trim: true
        },
        provider: {
            type: String,
            required: [true, "Provider name is required"],
            trim: true
        },
        category: {
            type: String,
            enum:["health", "life", "auto", "home"],
            required: [true, "Category is required"]
        },
        price: {
            type: Number,
            required: [true, "price is required"],
            min: [0, "Price cannot be negative"]
        },
        coverage: {
            type: Number,
            required: [true, 'Coverage amount is required'],
            min: [0, "Coverage amount cannot be negative"]
        },
        features: {
            type: [String],
            default: []
        },
        description: {
            type: String,
            trim: true,
            default: ""
        },
        isActive: {
            type: Boolean,
            default: true
        }
    }, {timestamps: true}
)

//prevent model re-compilation in Next.js hot reload
const Policy: Model<IPolicy> = mongoose.models.Policy || mongoose.model<IPolicy>("Policy", PolicySchema)

export default Policy