import { Schema, model, models } from "mongoose"



export interface IInsuranceType {
    _id: string
    name: string
    description: string
}

const InsuranceSchema = new Schema<IInsuranceType>(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    }, {timestamps: true, collection: "insurancetypes"}
)

export const InsuranceType = models.InsuranceType || model<IInsuranceType>("InsuranceType", InsuranceSchema)
