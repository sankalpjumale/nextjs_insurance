import { Schema, model, models } from "mongoose"



export interface IInsurenceType {
    _id: string
    name: string
    description: string
}

const InsurenceSchema = new Schema<IInsurenceType>(
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

export const InsurenceType = models.InsurenceType || model<IInsurenceType>       ("InsurenceType", InsurenceSchema)