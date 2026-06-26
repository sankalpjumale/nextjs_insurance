import mongoose, { Schema, Document, Model } from "mongoose";
 
//single covered or not-covered item inside a section
const CoverageItemSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    limit: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { _id: false }
);
 

//logical group of coverage inside a policy 
const CoverageSectionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
 
    description: {
      type: String,
      trim: true,
      default: "",
    },
 
    sumInsured: {
      type: String,
      trim: true,
      default: "",
    },
 
    covered: [CoverageItemSchema],
 
    notCovered: [CoverageItemSchema],
 
    conditions: [
      {
        type: String,
        trim: true,
      },
    ],
 
    claimDocuments: [
      {
        type: String,
        trim: true,
      },
    ],
 
    displayOrder: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
);
 
//glossary term explained in simple language
const DefinitionSchema = new Schema(
  {
    term: {
      type: String,
      required: true,
      trim: true,
    },
    meaning: {
      type: String,
      required: true,
      trim: true,
    },
    example: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { _id: false }
);
 
//policy-specific question and answer
const FAQSchema = new Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },
    answer: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false }
);
 
export interface ICoverageItem {
  title: string;
  description?: string;
  limit?: string;
}
 
export interface ICoverageSection {
  title: string;
  description?: string;
  sumInsured?: string;
  covered: ICoverageItem[];
  notCovered: ICoverageItem[];
  conditions: string[];
  claimDocuments: string[];
  displayOrder: number;
}
 
export interface IDefinition {
  term: string;
  meaning: string;
  example?: string;
}
 
export interface IFAQ {
  question: string;
  answer: string;
}
 
export interface IPolicy extends Document {
  //identity
  name: string;
  slug: string;
  categorySlug: string;
 
  //insurer info
  insurerName: string;
  insurerLogo: string;
 
  //policy overview
  tagline: string;
  policyType: string;
  coverageType: "Individual" | "Family Floater" | "Group" | "Multi-Trip" | "Single-Trip";
 
  //financial details
  minSumInsured: number;
  maxSumInsured: number;
  currency: string;
 
  //policy period
  minPolicyPeriod: string;
  maxPolicyPeriod: string;
 
  //age eligibility
  minEntryAge: number;
  maxEntryAge: number;
 
  //key highlights shown on listing card
  highlights: string[];
 
  //global exclusions that apply to the entire policy
  globalExclusions: string[];
 
  //global conditions like waiting periods, co-payment
  globalConditions: string[];
 
  //coverage sections
  coverageSections: ICoverageSection[];
 
  //definitions / glossary
  definitions: IDefinition[];
 
  // FAQs
  faqs: IFAQ[];
 
  //visibility and ordering
  isActive: boolean;
  isFeatured: boolean;
  displayOrder: number;
 
  createdAt: Date;
  updatedAt: Date;
}
 
const PolicySchema = new Schema<IPolicy>(
  {
    name: {
      type: String,
      required: [true, "Policy name is required"],
      trim: true,
    },

    slug: {
      type: String,
      required: [true, "Slug is required"],
      trim: true,
      unique: true,
      lowercase: true,
    },

    categorySlug: {
      type: String,
      required: [true, "Category slug is required"],
      trim: true,
      lowercase: true,
    },
 
    insurerName: {
      type: String,
      required: [true, "Insurer name is required"],
      trim: true,
    },
 
    insurerLogo: {
      type: String,
      trim: true,
      default: "",
    },
 
    tagline: {
      type: String,
      trim: true,
      default: "",
    },
 
    policyType: {
      type: String,
      trim: true,
      default: "",
    },
 
    coverageType: {
      type: String,
      enum: ["Individual", "Family Floater", "Group", "Multi-Trip", "Single-Trip"],
      required: [true, "Coverage type is required"],
    },
 
    minSumInsured: {
      type: Number,
      default: 0,
    },
 
    maxSumInsured: {
      type: Number,
      default: 0,
    },
 
    currency: {
      type: String,
      default: "INR",
      trim: true,
    },
 
    minPolicyPeriod: {
      type: String,
      trim: true,
      default: "",
    },
 
    maxPolicyPeriod: {
      type: String,
      trim: true,
      default: "",
    },
 
    minEntryAge: {
      type: Number,
      default: 0,
    },
 
    maxEntryAge: {
      type: Number,
      default: 99,
    },
 
    highlights: [
      {
        type: String,
        trim: true,
      },
    ],

    globalExclusions: [
      {
        type: String,
        trim: true,
      },
    ],
 
    globalConditions: [
      {
        type: String,
        trim: true,
      },
    ],
 
    coverageSections: [CoverageSectionSchema],
 
    definitions: [DefinitionSchema],

    faqs: [FAQSchema],

    isActive: {
      type: Boolean,
      default: true,
    },
 
    isFeatured: {
      type: Boolean,
      default: false,
    },
 
    displayOrder: {
      type: Number,
      default: 0,
    },
  },
 
  {
    timestamps: true,
    collection: "policies",
  }
);
 
// PolicySchema.index({ slug: 1 });
PolicySchema.index({ categorySlug: 1, isActive: 1, displayOrder: 1 });
PolicySchema.index({ isFeatured: 1 });
PolicySchema.index({ insurerName: 1 });
 
const Policy: Model<IPolicy> =
  mongoose.models.Policy ||
  mongoose.model<IPolicy>("Policy", PolicySchema);
 
export default Policy;