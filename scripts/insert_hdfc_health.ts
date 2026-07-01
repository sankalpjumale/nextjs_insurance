import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
 
const MONGODB_URI = process.env.MONGODB_URI!;
 
const CoverageItemSchema = new mongoose.Schema(
  { title: String, description: String, limit: String },
  { _id: false }
);
const CoverageSectionSchema = new mongoose.Schema(
  {
    title: String, description: String, sumInsured: String,
    covered: [CoverageItemSchema], notCovered: [CoverageItemSchema],
    conditions: [String], claimDocuments: [String], displayOrder: Number,
  },
  { _id: false }
);
const DefinitionSchema = new mongoose.Schema(
  { term: String, meaning: String, example: String },
  { _id: false }
);
const FAQSchema = new mongoose.Schema(
  { question: String, answer: String },
  { _id: false }
);
const PolicySchema = new mongoose.Schema(
  {
    name: String, slug: String, categorySlug: String,
    insurerName: String, insurerLogo: String, tagline: String,
    policyType: String, coverageType: String,
    minSumInsured: Number, maxSumInsured: Number, currency: String,
    minPolicyPeriod: String, maxPolicyPeriod: String,
    minEntryAge: Number, maxEntryAge: Number,
    highlights: [String], globalExclusions: [String], globalConditions: [String],
    coverageSections: [CoverageSectionSchema],
    definitions: [DefinitionSchema],
    faqs: [FAQSchema],
    isActive: Boolean, isFeatured: Boolean, displayOrder: Number,
  },
  { timestamps: true, collection: "policies" }
);
 
const Policy =
  mongoose.models.Policy || mongoose.model("Policy", PolicySchema);
 
async function main() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");
 
  await Policy.deleteOne({ slug: "hdfc-ergo-equicover-health" });
 
  const policy = new Policy({
    name: "HDFC ERGO EquiCover Health",
    slug: "hdfc-ergo-equicover-health",
    categorySlug: "health",
    insurerName: "HDFC ERGO General Insurance Company Limited",
    insurerLogo: "",
    tagline:
      "A health insurance policy specially designed for persons with disabilities under The Rights of Persons with Disabilities Act, 2016 and The Mental Healthcare Act, 2017, and/or individuals with HIV/AIDS",
    policyType: "Individual Health Indemnity Policy for Persons with Disability and/or HIV/AIDS",
    coverageType: "Individual",
    minSumInsured: 400000,
    maxSumInsured: 500000,
    currency: "INR",
    minPolicyPeriod: "1 Year",
    maxPolicyPeriod: "1 Year",
    minEntryAge: 0,
    maxEntryAge: 65,
    highlights: [
      "Specially designed for persons with disability as per The Rights of Persons with Disabilities Act, 2016 and The Mental Healthcare Act, 2017, and/or individuals with HIV/AIDS",
      "Covers 21 specified disabilities including Blindness, Muscular Dystrophy, Low Vision, Chronic Neurological Conditions, Hearing Impairment, Multiple Sclerosis, Locomotor Disability, Intellectual Disability, Mental Illness, Autism Spectrum Disorder, Cerebral Palsy, Parkinson's disease, and more",
      "Sum insured options of Rs. 4 lacs and Rs. 5 lacs on an individual basis",
      "Inpatient hospitalization cover including Room Rent, ICU/ICCU, Surgeon and Medical Practitioner fees, Anaesthesia, blood, oxygen, OT charges, medicines and diagnostics",
      "AYUSH treatment covered up to 100% of Sum Insured",
      "Pre-hospitalization cover for 30 days and Post-hospitalization cover for 60 days",
      "Cataract treatment covered up to Rs. 40,000 per eye per policy year",
      "Modern Treatments covered up to 50% of Sum Insured, including Robotic surgeries, Stereotactic radio surgeries, Oral chemotherapy, Immunotherapy, Stem cell therapy and more",
      "Emergency Ground Ambulance cover up to Rs. 2,000 per hospitalization",
      "HIV/AIDS cover for Inpatient Hospitalization (excluding Anti-Retroviral Treatment cost)",
      "Age eligibility: Adults 18 to 65 years; Children Newborn to 17 years",
      "20% Co-payment applicable on all claims, which can be waived by paying additional premium",
    ],
    globalExclusions: [
      "Investigation & Evaluation (Excl04): Expenses related to any admission primarily for diagnostics and evaluation, or diagnostic expenses not related/incidental to current diagnosis and treatment.",
      "Rest Cure, rehabilitation and respite care (Excl05): Admission primarily for enforced bed rest and not for receiving treatment, including custodial care and services for the terminally ill.",
      "Obesity/Weight control (Excl06): Surgical treatment of obesity unless it meets specified BMI and clinical criteria.",
      "Change-of-Gender treatments (Excl07): Expenses for treatment to change characteristics of the body to the opposite sex.",
      "Cosmetic or plastic Surgery (Excl08): Unless for reconstruction following an Accident, Burn(s), Cancer, or medically necessary treatment certified by the attending Medical Practitioner.",
      "Hazardous or Adventure Sports (Excl09): Treatment necessitated due to participation as a professional in hazardous/adventure sports.",
      "Breach of Law (Excl10): Expenses for treatment arising from an Insured Person committing or attempting a breach of law with criminal intent.",
      "Excluded Providers (Excl11): Treatment at hospitals/practitioners specifically excluded by the Insurer, except stabilization expenses in life-threatening situations or after an Accident.",
      "Treatment for Alcoholism, drug or substance abuse or any addictive condition and consequences thereof (Excl12).",
      "Treatments received in health hydros, nature cure clinics, spas or similar establishments, or where admission is arranged wholly/partly for domestic reasons (Excl13).",
      "Dietary supplements and substances purchasable without prescription, unless prescribed as part of Hospitalization or Day Care procedure (Excl14).",
      "Refractive Error (Excl15): Treatment for correction of eyesight due to refractive error less than 7.5 dioptres.",
      "Unproven Treatments (Excl16): Treatments, services and supplies lacking significant medical documentation to support effectiveness.",
      "Sterility and Infertility (Excl17): Including contraception, sterilization, assisted reproduction (IVF, ZIFT, GIFT, ICSI), gestational surrogacy, and reversal of sterilization.",
      "Maternity (Excl18): Expenses traceable to childbirth including caesarean sections, except ectopic pregnancy; miscarriage (unless due to accident) and lawful termination of pregnancy.",
      "Any medical treatment taken outside India.",
      "Hospitalization for donation of any body organs by an Insured, including complications arising from the donation.",
      "Nuclear damage caused by, contributed to by, or arising from ionising radiation or contamination by radioactivity from nuclear fuel, waste, combustion, weapons material or equipment.",
      "War, invasion, acts of foreign enemies, hostilities (whether declared or not), civil war, commotion, unrest, rebellion, revolution, insurrection, military or usurped power, or confiscation/nationalisation/requisition by any government or public authority.",
      "Injury or Disease caused by or contributed to by nuclear weapons/materials.",
      "Circumcision unless necessary for treatment of a disease/illness/injury not excluded, or necessitated by an accident.",
      "Treatment with alternative medicines or experimental treatment such as acupuncture, acupressure, magnetic, osteopath, naturopathy, chiropractic, reflexology and aromatherapy.",
      "Suicide, intentional self-injury (including misuse of intoxicating drugs or alcohol) and any violation of law or participation in an unlawful activity with criminal intent.",
      "Vaccination or inoculation, except as post-bite treatment for animal bite.",
      "Convalescence, general debility, 'Run-down' condition, rest cure, Congenital external illness/disease/defect.",
      "Outpatient diagnostic, medical and surgical procedures/treatments, non-prescribed drugs and medical supplies, hormone replacement therapy, and expenses related to Domiciliary hospitalization.",
      "Dental treatment or Surgery of any kind unless requiring Hospitalisation as a result of accidental Bodily Injury.",
      "Venereal/Sexually Transmitted disease.",
      "Stem cell storage.",
      "Any kind of service charge, surcharge levied by the hospital.",
      "Personal comfort and convenience items or services such as television, telephone, barber or guest services.",
      "Non-Payable items as listed under List-I of Annexure-II of the Policy.",
      "Any medical procedure or treatment which is not medically necessary or not performed by a Medical Practitioner.",
      "Cost of Anti-Retroviral Treatment (ART) is excluded under the HIV/AIDS specific cover.",
      "Any reconstructive/Cosmetic/prosthesis/external or internal device implanted or used at home for treatment of existing disability or for activities of daily living is excluded.",
    ],
    globalConditions: [
      "Condition Precedent - Disclosure of Information: The policy shall be void and premium forfeited in the event of misrepresentation, mis-description or non-disclosure of any material fact by the Policyholder.",
      "Condition Precedent to Admission of Liability: Policy terms and conditions must be fulfilled by the insured person for the Company to make any claim payment.",
      "Claim Settlement: The Company shall settle or reject a claim within 15 days from receipt of intimation; delay attracts penal interest at 2% above bank rate.",
      "Multiple Policies: Insured Person with multiple policies may choose which insurer to claim from, and may claim disallowed amounts under this Policy even if Sum Insured is not exhausted elsewhere.",
      "Fraud: Any fraudulent claim, false statement or concealment of fact forfeits all benefits and premium paid; fraudulently paid amounts are recoverable from the claimant(s).",
      "Cancellation: Policyholder may cancel with 7 days' written notice for pro-rata refund; Company may cancel on grounds of established fraud/non-disclosure/misrepresentation with 15 days' notice and no refund.",
      "Migration: Insured Person can migrate the policy to other health insurance products offered by the Company as per IRDAI Guidelines, with credit for waiting periods already served.",
      "Portability: Insured Person can port the policy to a similar product with another insurer as per IRDAI Portability Guidelines, with credit for waiting periods already served.",
      "Renewal: The policy is renewable for life except on grounds of established fraud or non-disclosure/misrepresentation, subject to the Moratorium clause; no loading based on individual claims experience.",
      "Premium Payment in Instalments: Grace period of 15 days for instalment premiums; coverage continues during grace period; policy cancelled if instalment not received within grace period.",
      "Moratorium Period: After 60 continuous months of coverage, no policy or claim can be contested on grounds of non-disclosure/misrepresentation, except established fraud.",
      "Free Look Period: 30 days from receipt of policy document (applicable to new individual policies only) to review and return the policy if not acceptable.",
      "Withdrawal of Policy: Company will intimate the Insured Person 90 days prior to expiry if the product is withdrawn, with migration option available.",
      "Condition Precedent - Eligibility Criteria: All Persons with Disability must have at least one specified disability under The Rights of Persons with Disabilities Act, 2016 with a valid disability certificate to enroll.",
      "Disability certificate issued by the Medical Board appointed by the government is a mandatory Condition Precedent for availing the disability cover.",
      "Disability, for policy purposes, means not less than forty percent of a specified disability as certified by the Medical Board.",
      "Pre-existing disability cover has a waiting period of 24 months from the first policy inception date.",
      "HIV/AIDS cover has an initial waiting period of 30 days on an indemnity basis; cost of Anti-Retroviral Treatment is excluded.",
      "Arbitration: Disputes as to quantum payable (where liability is admitted) are referred to arbitration under the Arbitration and Conciliation Act, 1996 (as amended in 2015).",
      "Territorial Jurisdiction: All disputes shall be determined by Indian courts according to Indian law.",
      "Co-payment of 20% applies to all admissible claims, which can be waived by paying an additional optional premium.",
    ],
    coverageSections: [
      {
        title: "Inpatient Care",
        description:
          "The Company shall indemnify medical expenses incurred for Hospitalization of the Insured Person during the Policy Year, up to the Sum Insured specified in the Policy Schedule (other than sub-limits/co-pay).",
        sumInsured: "Up to Sum Insured",
        covered: [
          { title: "Room Rent, Boarding, Nursing Expenses", description: "As provided by the Hospital/Nursing Home", limit: "Up to 1% of Sum Insured per day" },
          { title: "ICU/ICCU Expenses", description: "Intensive Care Unit / Intensive Cardiac Care Unit expenses", limit: "Up to 2% of Sum Insured per day" },
          { title: "Surgeon, Anesthetist, Medical Practitioner, Consultants, Specialist Fees", description: "Whether paid directly to the treating Medical Practitioner/surgeon or to the hospital", limit: "As per Sum Insured" },
          { title: "Anaesthesia, blood, oxygen, OT charges, surgical appliances, medicines and drugs", description: "Costs towards diagnostics, diagnostic imaging modalities and similar expenses", limit: "As per Sum Insured" },
          { title: "Cataract treatment", description: "Expenses incurred on treatment of cataract, subject to sub-limits", limit: "Rs. 40,000 per eye per policy year" },
          { title: "Dental treatment necessitated due to disease or injury", description: "For inpatient care only", limit: "As per Sum Insured" },
          { title: "Plastic surgery necessitated due to disease or injury", description: "Reconstructive plastic surgery", limit: "As per Sum Insured" },
          { title: "All day care treatments", description: "Treatments/surgeries requiring less than 24 hours hospitalization due to technological advancement", limit: "As per Sum Insured" },
        ],
        notCovered: [],
        conditions: [
          "Expenses of Hospitalization for a minimum period of 24 consecutive hours only shall be admissible; time limit does not apply to Day Care Treatment.",
          "Medical Expenses are payable only after the first commencement of the Policy with the Company.",
        ],
        claimDocuments: [],
        displayOrder: 1,
      },
      {
        title: "AYUSH Treatment",
        description:
          "Expenses incurred for inpatient care treatment under Ayurveda, Yoga and Naturopathy, Unani, Siddha and Homeopathy systems of medicines.",
        sumInsured: "Up to 100% of Sum Insured per policy year",
        covered: [
          { title: "AYUSH inpatient treatment", description: "Treatment given under Ayurveda, Yoga and Naturopathy, Unani, Siddha and Homeopathy systems at an AYUSH Hospital or AYUSH Day Care Centre", limit: "Up to 100% of Sum Insured" },
        ],
        notCovered: [],
        conditions: [],
        claimDocuments: [],
        displayOrder: 2,
      },
      {
        title: "Pre-Hospitalization Medical Expenses",
        description:
          "Medical Expenses incurred related to an admissible Hospitalization requiring Inpatient care, for a fixed period prior to admission.",
        sumInsured: "As per Sum Insured",
        covered: [
          { title: "Pre-hospitalization expenses", description: "Expenses incurred for the same condition for which admissible Hospitalization was required", limit: "30 days prior to admission" },
        ],
        notCovered: [],
        conditions: [
          "Claim must be accepted under Inpatient Care, AYUSH Treatment, or Modern Treatment sections.",
          "Can be claimed on a Reimbursement basis only.",
        ],
        claimDocuments: [],
        displayOrder: 3,
      },
      {
        title: "Post-Hospitalization Medical Expenses",
        description:
          "Medical Expenses incurred related to an admissible Hospitalization requiring Inpatient Care, for a fixed period after discharge.",
        sumInsured: "As per Sum Insured",
        covered: [
          { title: "Post-hospitalization expenses", description: "Expenses for the same condition for which hospitalization was required", limit: "60 days from date of discharge" },
        ],
        notCovered: [],
        conditions: [
          "Claim must be accepted under Inpatient Care, AYUSH Treatment, or Modern Treatment sections.",
          "Can be claimed on a Reimbursement basis only.",
        ],
        claimDocuments: [],
        displayOrder: 4,
      },
      {
        title: "Emergency Ground Ambulance",
        description:
          "Reasonable and Customary Charges for expenses incurred towards ambulance transportation of an Insured Person.",
        sumInsured: "Up to Rs. 2,000 per hospitalization",
        covered: [
          { title: "Road ambulance charges", description: "Transportation from place of injury/illness to hospital, or between hospitals as advised by the treating Medical Practitioner", limit: "Rs. 2,000 per hospitalisation" },
        ],
        notCovered: [
          { title: "Transfer for evaluation purposes only", description: "Payment excluded if the Insured Person is transferred to any hospital or diagnostic center purely for evaluation", limit: "Not covered" },
        ],
        conditions: [
          "Ambulance service must be offered by a healthcare or Registered Ambulance Service Provider.",
          "Original ambulance bills and payment receipt must be submitted.",
          "A claim must be accepted under Inpatient Care, AYUSH Treatment, or Modern Treatment sections for the same Hospitalization.",
        ],
        claimDocuments: [],
        displayOrder: 5,
      },
      {
        title: "Cataract Treatment",
        description: "Medical expenses incurred for treatment of Cataract.",
        sumInsured: "Rs. 40,000 per eye per policy year",
        covered: [
          { title: "Cataract surgery", description: "Treatment of cataract, per eye", limit: "Rs. 40,000 per eye in one policy year" },
        ],
        notCovered: [],
        conditions: [],
        claimDocuments: [],
        displayOrder: 6,
      },
      {
        title: "Modern Treatment",
        description:
          "Listed modern treatment procedures covered (wherever medically indicated) either as Inpatient or Day Care Treatment in a Hospital.",
        sumInsured: "Up to 50% of Sum Insured",
        covered: [
          { title: "Uterine Artery Embolization and HIFU", description: "High Intensity Focused Ultrasound", limit: "Up to 50% of Sum Insured" },
          { title: "Balloon Sinuplasty", description: "", limit: "Up to 50% of Sum Insured" },
          { title: "Deep Brain Stimulation", description: "", limit: "Up to 50% of Sum Insured" },
          { title: "Oral Chemotherapy", description: "", limit: "Up to 50% of Sum Insured" },
          { title: "Immunotherapy", description: "Monoclonal Antibody to be given as injection", limit: "Up to 50% of Sum Insured" },
          { title: "Intra Vitreal Injections", description: "", limit: "Up to 50% of Sum Insured" },
          { title: "Robotic Surgeries", description: "", limit: "Up to 50% of Sum Insured" },
          { title: "Stereotactic Radio Surgeries", description: "", limit: "Up to 50% of Sum Insured" },
          { title: "Bronchial Thermoplasty", description: "", limit: "Up to 50% of Sum Insured" },
          { title: "Vaporisation of the Prostate", description: "Green laser treatment or holmium laser treatment", limit: "Up to 50% of Sum Insured" },
          { title: "IONM (Intra Operative Neuro Monitoring)", description: "", limit: "Up to 50% of Sum Insured" },
          { title: "Stem Cell Therapy", description: "Hematopoietic stem cells for bone marrow transplant for haematological conditions", limit: "Up to 50% of Sum Insured" },
        ],
        notCovered: [],
        conditions: ["Covered wherever medically indicated, either as Inpatient or as part of Day Care Treatment in a Hospital."],
        claimDocuments: [],
        displayOrder: 7,
      },
      {
        title: "Specific Cover for Persons with Disability",
        description:
          "Reasonable and customary charges for medical expenses incurred towards Inpatient Hospitalisation arising due to the pre-existing disability covered under The Rights of Persons With Disabilities Act, 2016.",
        sumInsured: "As per Sum Insured opted",
        covered: [
          { title: "Inpatient Hospitalisation for pre-existing disability", description: "Covers conditions listed under The Rights of Persons with Disabilities Act, 2016", limit: "As per Sum Insured, after 24-month waiting period" },
        ],
        notCovered: [
          { title: "Reconstructive/Cosmetic/prosthesis/devices", description: "Any reconstructive, cosmetic, prosthesis, or external/internal device implanted or used at home for treatment of existing disability or activities of daily living", limit: "Excluded" },
        ],
        conditions: ["Waiting period of 24 months from first policy inception date applies to treatment for the pre-existing disability covered."],
        claimDocuments: [],
        displayOrder: 8,
      },
      {
        title: "Specific Cover for Persons with HIV-AIDS",
        description:
          "Reasonable and Customary Charges for any Medical Condition requiring Inpatient Hospitalization of the Insured Person.",
        sumInsured: "Up to Sum Insured opted",
        covered: [
          { title: "Inpatient Hospitalization for HIV/AIDS related medical conditions", description: "Covers medical conditions requiring inpatient hospitalization", limit: "Up to Sum Insured opted" },
        ],
        notCovered: [
          { title: "Anti-Retroviral Treatment (ART)", description: "Cost of Anti-Retroviral Treatment is excluded from this cover", limit: "Excluded" },
        ],
        conditions: ["Initial waiting period of 30 days applicable on an indemnity basis."],
        claimDocuments: [],
        displayOrder: 9,
      },
    ],
    definitions: [
      { term: "Accident", meaning: "Sudden, unforeseen, and involuntary event caused by external, visible, and violent means.", example: "" },
      { term: "Any One Illness", meaning: "Continuous period of illness including relapse within 45 days from the date of last consultation with the Hospital/Nursing Home where treatment was taken.", example: "" },
      { term: "AYUSH Treatment", meaning: "Medical and/or hospitalisation treatments given under Ayurveda, Yoga and Naturopathy, Unani, Siddha and Homeopathy systems.", example: "" },
      { term: "AYUSH Hospital", meaning: "A healthcare facility where medical/surgical/para-surgical treatment procedures are carried out by AYUSH Medical Practitioners, meeting specified infrastructure criteria.", example: "" },
      { term: "AYUSH Day Care Centre", meaning: "A CHC, PHC, Dispensary, Clinic, Polyclinic or similar centre registered with local authorities providing AYUSH treatment on a day care basis without in-patient services.", example: "" },
      { term: "Break in Policy", meaning: "The gap that occurs when premium due for renewal/instalment is not paid on or before the renewal date or grace period.", example: "" },
      { term: "Cashless Facility", meaning: "A facility where treatment costs are paid directly to the Network Provider by the insurer to the extent pre-authorization is approved.", example: "" },
      { term: "Condition Precedent", meaning: "A policy term or condition upon which the Insurer's liability under the policy is conditional.", example: "" },
      { term: "Congenital Anomaly", meaning: "A condition present since birth that is abnormal with reference to form, structure, or position; classified as Internal or External.", example: "" },
      { term: "Co-payment", meaning: "A cost sharing requirement where the policyholder/insured bears a specified percentage of the admissible claim amount; does not reduce the Sum Insured.", example: "" },
      { term: "Day Care Centre", meaning: "An institution for day care treatment of illness/injuries meeting minimum staffing, equipment and record-keeping criteria.", example: "" },
      { term: "Day Care Treatment", meaning: "Medical treatment/surgical procedure requiring less than 24 hours hospitalization due to technological advancement, which would otherwise require more than 24 hours; excludes outpatient treatment.", example: "" },
      { term: "Dental Treatment", meaning: "Treatment related to teeth or supporting structures, including examinations, fillings, crowns, extractions and surgery.", example: "" },
      { term: "Disclosure of Information Norm", meaning: "The policy shall be void and premium forfeited in the event of misrepresentation, mis-description or non-disclosure of material fact.", example: "" },
      { term: "Emergency Care", meaning: "Management for an illness or injury with sudden and unexpected symptoms requiring immediate care to prevent death or serious long-term impairment.", example: "" },
      { term: "Grace Period", meaning: "The period following the premium due date during which payment can be made without loss of continuity benefits; 15 days for monthly mode, 30 days otherwise.", example: "" },
      { term: "Hospital", meaning: "An institution for inpatient and day care treatment registered under the Clinical Establishments Act 2010 or meeting minimum bed, staffing and infrastructure criteria.", example: "" },
      { term: "Hospitalization", meaning: "Admission in a Hospital for a minimum of 24 consecutive in-patient care hours, except for specified procedures/treatments.", example: "" },
      { term: "Illness", meaning: "A sickness, disease or pathological condition leading to impairment of normal physiological function requiring medical treatment; may be Acute or Chronic.", example: "" },
      { term: "Injury", meaning: "Accidental physical bodily harm excluding illness or disease, solely and directly caused by external, violent, visible and evident means, verified by a Medical Practitioner.", example: "" },
      { term: "Inpatient Care", meaning: "Treatment for which the insured person has to stay in a hospital for more than 24 hours for a covered event.", example: "" },
      { term: "Insured Person", meaning: "Person(s) named in the Policy Schedule.", example: "" },
      { term: "Intensive Care Unit", meaning: "A section/ward of a hospital under constant supervision of dedicated medical practitioners, equipped for continuous monitoring and treatment of critical patients.", example: "" },
      { term: "ICU Charges", meaning: "Amount charged by a Hospital towards ICU expenses including bed, monitoring devices, critical care nursing and intensivist charges.", example: "" },
      { term: "Medical Advice", meaning: "Any consultation or advice from a Medical Practitioner, including issuance of a prescription or follow-up prescription.", example: "" },
      { term: "Medical Expenses", meaning: "Expenses necessarily and actually incurred for medical treatment on account of Illness or Accident, not exceeding what would be charged if the Insured Person were uninsured.", example: "" },
      { term: "Medical Practitioner", meaning: "A person holding valid registration to practice medicine within their jurisdiction; excludes family members sharing the same residence as the Insured Person.", example: "" },
      { term: "Medically Necessary Treatment", meaning: "Treatment required for medical management of the illness/injury, not exceeding necessary scope/duration/intensity, prescribed by a medical practitioner and conforming to accepted professional standards.", example: "" },
      { term: "Migration", meaning: "A facility to transfer credits gained for pre-existing diseases and specific waiting periods from one health insurance policy to another with the same insurer.", example: "" },
      { term: "Network Provider", meaning: "Hospitals or healthcare providers enlisted by an insurer/TPA to provide medical services to an insured by cashless facility.", example: "" },
      { term: "New Born Baby", meaning: "Baby born during the Policy Period, aged up to 90 days.", example: "" },
      { term: "Non-Network Provider", meaning: "Any hospital, day care centre or provider not part of the network.", example: "" },
      { term: "Notification of Claim", meaning: "The process of intimating a claim to the insurer or TPA through any recognized mode of communication.", example: "" },
      { term: "OPD Treatment", meaning: "Treatment where the insured visits a clinic/hospital for diagnosis and treatment without being admitted as a day care patient or inpatient.", example: "" },
      { term: "Portability", meaning: "A facility to transfer credits for pre-existing diseases and specific waiting periods from one insurer to another.", example: "" },
      { term: "Pre-Existing Disease", meaning: "Any condition, ailment, injury or disease diagnosed or for which medical advice/treatment was received not more than 36 months prior to policy commencement.", example: "" },
      { term: "Pre-Hospitalization Medical Expenses", meaning: "Medical Expenses incurred during a pre-defined number of days preceding hospitalization for the same condition, where the inpatient claim is admissible.", example: "" },
      { term: "Post-Hospitalization Medical Expenses", meaning: "Medical Expenses incurred during a pre-defined number of days immediately after discharge for the same condition, where the inpatient claim is admissible.", example: "" },
      { term: "Qualified Nurse", meaning: "A person holding valid registration from the Nursing Council of India or any state Nursing Council.", example: "" },
      { term: "Reasonable and Customary Charges", meaning: "Charges for services/supplies that are standard for a specific provider and consistent with prevailing charges in the geographical area for identical/similar services.", example: "" },
      { term: "Renewal", meaning: "Terms on which the insurance contract can be renewed with mutual consent, with a grace period provision for continuity of pre-existing disease credit and waiting periods.", example: "" },
      { term: "Room Rent", meaning: "The amount charged by a Hospital towards Room and Boarding expenses, including associated medical expenses.", example: "" },
      { term: "Surgery or Surgical Procedure", meaning: "Manual and/or operative procedure(s) for treatment of illness or injury, correction of deformities, diagnosis and cure of diseases, performed in a hospital or day care centre by a medical practitioner.", example: "" },
      { term: "Unproven/Experimental Treatment", meaning: "Treatment, including drug experimental therapy, that is not based on established medical practice in India.", example: "" },
      { term: "Adventurous/Hazardous Sports", meaning: "Any sport or activity involving physical exertion and skill in which an Insured Person participates or competes for entertainment or as part of profession.", example: "" },
      { term: "Age", meaning: "Completed years on last birthday as on Commencement Date.", example: "" },
      { term: "Ambulance", meaning: "A motor vehicle operated by a licensed/authorized service provider equipped for transport and paramedical treatment.", example: "" },
      { term: "Antiretroviral Therapy (ART)", meaning: "Treatment of people infected with HIV using anti-HIV drugs.", example: "" },
      { term: "Associated Medical Expenses", meaning: "Expenses necessarily and actually incurred for medical treatment on advice of a Medical Practitioner; excludes pharmacy/consumables, implants/medical devices, and diagnostics when copayment on higher room rent applies.", example: "" },
      { term: "Alternative/AYUSH Treatment", meaning: "Hospitalization treatments given under Ayurveda, Yoga and Naturopathy, Unani, Siddha and Homeopathy systems.", example: "" },
      { term: "Biological Attack or Weapons", meaning: "Emission, discharge, dispersal, release or escape of pathogenic micro-organisms or biologically produced toxins capable of causing illness, disablement or death.", example: "" },
      { term: "Chemical Attack or Weapons", meaning: "Emission, discharge, dispersal, release or escape of a chemical compound capable of causing illness, disablement or death when suitably distributed.", example: "" },
      { term: "Claims", meaning: "A demand made by the Policyholder/Insured Person for payment of Medical Expenses under any Benefit covered under the Policy.", example: "" },
      { term: "Commencement Date", meaning: "The date of inception of the first policy with the Company as specified in the Policy Schedule.", example: "" },
      { term: "Company", meaning: "HDFC ERGO General Insurance Company Limited.", example: "" },
      { term: "CD4", meaning: "A type of white blood cell (CD4 T lymphocytes/'helper T cells') that serves as the primary receptor for HIV.", example: "" },
      { term: "Diagnostic Centre", meaning: "A place where diagnostic tests and exploratory/therapeutic procedures for detection, identification and treatment of a medical condition are done.", example: "" },
      { term: "Person with Disability/Disability/Disabled", meaning: "A person with long-term physical, mental, intellectual or sensory impairment which, in interaction with barriers, hinders full and effective participation in society equally with others.", example: "" },
      { term: "HIV", meaning: "Human Immunodeficiency Virus.", example: "" },
      { term: "Insured Person/You/Your", meaning: "The person named in the Policy Schedule who is insured under the Policy and is a citizen of India, for whom applicable premium has been received.", example: "" },
      { term: "Life-Threatening Emergency", meaning: "A serious medical condition/symptom arising suddenly and unexpectedly, requiring immediate care generally within 24 hours to avoid jeopardy to life or serious long-term impairment.", example: "" },
      { term: "Material Facts", meaning: "All relevant information sought by the Company in the Proposal Form and connected documents to enable informed underwriting decisions.", example: "" },
      { term: "Non-instalment Premium Payment", meaning: "Payment of premium for the entire policy period made in advance as a single premium.", example: "" },
      { term: "Mental Illness", meaning: "A substantial disorder of thinking, mood, perception, orientation or memory that grossly impairs judgment, behaviour, or ability to meet ordinary demands of life; excludes mental retardation.", example: "" },
      { term: "Medical Practitioner for Treatment of Mental Illnesses", meaning: "A medical practitioner with a post-graduate degree/diploma in psychiatry recognized by UGC/National Board of Examinations/Medical Council of India.", example: "" },
      { term: "Mental Health Establishment", meaning: "Any health establishment, including AYUSH establishments, meant for care of persons with mental illness; excludes a family residential place.", example: "" },
      { term: "Policy", meaning: "These Policy wordings, the Policy Schedule and any applicable endorsements or extensions, read together.", example: "" },
      { term: "Policy Period", meaning: "The Commencement Date and either the Expiry Date specified in the Policy Schedule or the date of cancellation, whichever is earlier.", example: "" },
      { term: "Policyholder", meaning: "The entity or person named as such in the Schedule.", example: "" },
      { term: "Policy Schedule", meaning: "The Schedule attached to and forming part of the Policy specifying Insured Persons, Sum Insured, Policy Period, Sub-limits and endorsements.", example: "" },
      { term: "Policy Year", meaning: "A period of twelve months beginning from the Commencement Date and ending on the last day of such period, and each subsequent twelve-month period.", example: "" },
      { term: "Proposal Form", meaning: "A form filled by the Prospect furnishing all material information required by the insurer for underwriting the risk.", example: "" },
      { term: "Sub-limit", meaning: "A cost sharing requirement under a health insurance policy defining a limit beyond which the insurer is not liable, as applicable under the Schedule.", example: "" },
      { term: "Sum Insured", meaning: "The pre-defined limit specified in the Policy Schedule representing the maximum, total and cumulative liability for all claims under the Policy per insured person.", example: "" },
      { term: "Waiting Period", meaning: "A period from inception of the Policy during which specified diseases/treatments are not covered; covered on completion, provided continuous renewal without break.", example: "" },
      { term: "We/Our/Us/Company", meaning: "HDFC ERGO General Insurance Company.", example: "" },
    ],
    faqs: [],
    isActive: true,
    isFeatured: false,
    displayOrder: 1,
  });
 
  await policy.save();
  console.log("Inserted:", policy.name);
  await mongoose.disconnect();
}
 
main().catch((err) => {
  console.error(err);
  process.exit(1);
});