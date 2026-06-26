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
 
  await Policy.deleteOne({ slug: "hdfc-ergo-bharat-griha-raksha-plus-lt" });
 
  const policy = new Policy({
    name: "Bharat Griha Raksha Plus – Long Term",
    slug: "hdfc-ergo-bharat-griha-raksha-plus-lt",
    categorySlug: "home",
    insurerName: "HDFC ERGO General Insurance Company Limited",
    insurerLogo: "",
    tagline: "Comprehensive long-term protection for your home building and contents against a wide range of insured perils.",
    policyType: "Home Insurance",
    coverageType: "Individual",
    minSumInsured: 0,
    maxSumInsured: 0,
    currency: "INR",
    minPolicyPeriod: "1 Year",
    maxPolicyPeriod: "Long Term (multi-year)",
    minEntryAge: 0,
    maxEntryAge: 0,
    highlights: [
      "Covers Home Building on Reinstatement Value or Saleable Value basis",
      "Built-in Home Contents cover equal to 20% of Home Building Sum Insured (up to ₹10 Lakh)",
      "Automatic 10% per annum increase in Sum Insured on each policy anniversary (no extra premium, up to 100% of original SI)",
      "Waiver of underinsurance — shortfall in Sum Insured does not reduce claim payout",
      "Covers 17 insured perils including Fire, Earthquake, Flood, Tsunami, Cyclone, Riot, Theft (post-event), and more",
      "Architect / Surveyor fees covered up to 10% of claim amount (over and above Sum Insured)",
      "Debris removal costs covered up to 5% of claim amount (over and above Sum Insured)",
      "Restoration of Sum Insured after every claim",
      "Policy continues for legal heirs in the event of insured's death",
      "Optional covers: Valuable Contents, Loss of Rent, Terrorism, Personal Accident, Accidental Damage, Dynamo Clause, Snowfall Damage, and more",
    ],
    globalExclusions: [
      "Deliberate, wilful or intentional act or omission by the insured or anyone acting on their behalf",
      "War, invasion, act of foreign enemy, civil war, mutiny, military rising, rebellion, revolution, insurrection or military or usurped power",
      "Loss, damage or expense directly or indirectly caused by any act of terrorism (unless optional terrorism cover is purchased)",
      "Ionising radiation or contamination by radioactivity from nuclear fuel, nuclear waste, or any nuclear assembly or component",
      "Pollution or contamination, unless caused by or resulting from an Insured Event",
      "Loss or damage to electrical/electronic machines, apparatus, fixtures or fittings due to over-running, excessive pressure, short circuit, arcing, self-heating or leakage of electricity (applies only to the particular machine affected; can be covered under optional Dynamo Clause)",
      "Loss or damage to bullion, unset precious stones, manuscripts, plans, drawings, securities, obligations, documents of any kind, coins or paper money, cheques, vehicles, and explosive substances (unless expressly stated)",
      "Loss of Insured Property that is missing, mislaid, or whose disappearance cannot be linked to a single identifiable event",
      "Loss or damage to Insured Property removed from the Home to any other place",
      "Loss of earnings, loss by delay, loss of market, or any other consequential or indirect loss",
      "Any reduction in market value of Insured Property after repair or reinstatement",
      "Any addition, extension, or alteration increasing Carpet Area by more than 10% of Carpet Area at Commencement Date (unless endorsed and additional premium paid)",
      "Costs, fees or expenses for preparing any claim",
      "Insured property declared illegal by any law or Public Authority",
    ],
    globalConditions: [
      "The insured must make true and full disclosure in the proposal and all related documents",
      "The insured must keep the Home Building and Home Contents in good condition and well maintained",
      "The insured must take care to prevent theft, loss or damage to the property",
      "Unauthorised persons must not be allowed to occupy the Home Building",
      "The insured must inform HDFC ERGO immediately of: change of address, any structural additions or alterations, letting out the property, or change of use",
      "The insured must allow inspection, investigation, scientific testing and photography of the insured property and its contents by the insurer or its representatives",
      "The insured must give notice of loss immediately, file a claim within 30 days of first noticing the loss, and report to appropriate authorities (police, fire brigade, district administration, etc.)",
      "The insured must not sell, dispose of, wash, or repair damaged items before the insurer's inspection and consent (except for urgent necessity)",
      "Claims must be made subject of a court suit within 12 months of the insurer's disclaimer, else they shall not be recoverable",
      "If a fraudulent claim is made, the insurer may refuse to pay, cancel the policy, and initiate legal proceedings",
      "The insurer has the right of subrogation — to recover amounts from third parties responsible for the loss",
      "If multiple policies cover the same risk, the insured has the right to choose under which policy to claim; the insurer will seek contribution from other insurers after paying the claim",
      "Multiple policies involving a bank or lending entity — contribution clause shall not apply",
      "Renewal is not automatic; insurer can reject renewal only on grounds of misrepresentation, non-disclosure, fraud, or non-cooperation",
      "The insured may cancel the policy at any time; proportionate premium for the unexpired period will be refunded (subject to no claims)",
      "The insurer can cancel only on grounds of established fraud, with minimum 7 days' notice; proportionate refund of premium for unexpired period (subject to no claims)",
      "Policy is subject to laws of India and jurisdiction of Indian courts",
      "Nomination allowed — insured may nominate a person to receive claim in event of death",
    ],
    coverageSections: [
      {
        title: "Home Building Cover",
        description: "Covers physical loss, damage, or destruction of the Home Building due to any Insured Event. Includes permanently attached fixtures/fittings, additional structures on the same site (garage, compound walls, gates, retaining walls, internal roads, verandah/porch, septic tanks, bio-gas plants, fixed water storage, solar panels, wind turbines, AC systems), and any structure shown in the Policy Schedule.",
        sumInsured: "Option 1: Reinstatement Value (Cost of Construction at Commencement Date). Option 2: Saleable Value — applicable for Flat/Apartment only (present saleable value on date of insurance). Automatically increases by 10% p.a. on each anniversary (no extra premium) up to 100% of original SI.",
        covered: [
          { title: "Fire", description: "Physical loss or damage caused by actual ignition or burning under accidental or fortuitous circumstances.", limit: "" },
          { title: "Explosion or Implosion", description: "Sudden violent burst (explosion) or bursting inward due to external pressure (implosion). Excludes damage to industrial boilers, economizers, or apparatus subject to centrifugal force by its own explosion/implosion.", limit: "" },
          { title: "Lightning", description: "Damage caused by lightning whether or not fire results.", limit: "" },
          { title: "Earthquake, Volcanic Eruption, or Other Convulsions of Nature", description: "Seismic activity or violent abrupt shaking of the ground caused by tectonic plate movement.", limit: "" },
          { title: "Storm, Cyclone, Typhoon, Tempest, Hurricane, Tornado", description: "Extreme atmospheric conditions including large-scale rotating air mass systems.", limit: "" },
          { title: "Tsunami, Flood and Inundation", description: "Tsunami (ocean waves from seismic events — covered only if Earthquake peril is covered). Flood and Inundation (temporary accumulation of water in a normally dry area due to heavy rainfall, overflow, flash flood, storm, cyclone, hurricane or typhoon).", limit: "" },
          { title: "Subsidence, Landslide, Rockslide, Avalanche", description: "Subsidence of land on which the Home Building stands, and landslide/rockslide/avalanche.", limit: "" },
          { title: "Bush Fire, Forest Fire, Jungle Fire", description: "Accidental burning of vegetation, grass including wildfire of forestry or plantations.", limit: "" },
          { title: "Impact Damage", description: "Damage caused by impact of or collision with any external physical object (vehicle, falling trees, aircraft, wall, etc.).", limit: "" },
          { title: "Missile Testing Operations", description: "Conducted by the Government of India.", limit: "" },
          { title: "Riot, Strike, Malicious Damage", description: "Direct visible physical loss or destruction caused by external violent means (Riot & Strike) or intentional acts of others (Malicious Damage).", limit: "" },
          { title: "Bursting or Overflowing of Water Tanks, Apparatus and Pipes", description: "Physical loss or damage caused by bursting or overflowing of water tanks, apparatus and pipes.", limit: "" },
          { title: "Leakage from Automatic Sprinkler Installations", description: "Accidental leakage from automatic sprinkler installations when there is no fire.", limit: "" },
          { title: "Theft (post-event)", description: "Theft within 7 days from the occurrence of and proximately caused by any of the above Insured Events.", limit: "" },
          { title: "Loan Value Cover for Flats & Apartments", description: "In the event of Total Loss of insured property under course of construction (possession not taken by insured): if insured opts to abandon the property, insurer reimburses actual payments made to the builder/developer till date of total loss. Policy ceases after payment under this cover.", limit: "" },
          { title: "Costs Compelled by Municipal Regulations", description: "Additional cost of reconstruction/reinstatement incurred solely because of compliance with municipal/local authority regulations or State/Central Act rules, over and above the cost to repair/reconstruct to equivalent-when-new condition.", limit: "" },
          { title: "Smoke Damage", description: "Repainting of the insured building directly caused by smoke which is sudden and accidental in nature, whether from within or outside the insured premises (excluding smoke from fireplaces).", limit: "Up to 1% of Sum Insured. Reinstatement premium must be paid on pro-rata basis after any loss to reinstate cover." },
          { title: "Architect, Surveyor & Consulting Engineer Fees", description: "Reasonable professional fees incurred in connection with a claim.", limit: "Up to 10% of claim amount — paid over and above the Sum Insured." },
          { title: "Debris Removal Costs", description: "Reasonable costs of removing debris from the site following a covered loss.", limit: "Up to 5% of claim amount — paid over and above the Sum Insured." },
        ],
        notCovered: [
          { title: "Fire — Own Fermentation / Natural Heating / Spontaneous Combustion", description: "Loss caused by the property's own fermentation, natural heating or spontaneous combustion.", limit: "" },
          { title: "Fire — Heating/Drying Process", description: "Loss caused by the insured property undergoing any heating or drying process.", limit: "" },
          { title: "Fire — Burnt by Public Authority Order", description: "Loss caused by burning of the insured property by order of any Public Authority.", limit: "" },
          { title: "Explosion — Industrial Boilers and Centrifugal Equipment", description: "Destruction or damage caused to industrial boilers (other than domestic), economizers, or other vessels in which steam is generated, machinery or apparatus subject to centrifugal force by its own explosion/implosion.", limit: "" },
          { title: "Subsidence — Normal Cracking or Settlement of New Structures", description: "Subsidence caused by normal cracking, settlement or bedding down of new structures.", limit: "" },
          { title: "Subsidence — Made-up Ground / Coastal / River Erosion", description: "Subsidence caused by the settlement or movement of made-up ground, coastal or river erosion.", limit: "" },
          { title: "Subsidence — Defective Design or Materials", description: "Subsidence caused by defective design, workmanship or use of defective materials.", limit: "" },
          { title: "Subsidence — Demolition or Construction Works", description: "Subsidence caused by demolition, construction, structural alterations, repair, groundworks or excavations.", limit: "" },
          { title: "Impact Damage — Sonic/Supersonic Pressure Waves", description: "Damage caused by pressure waves from aircraft or other aerial/space devices travelling at sonic or supersonic speeds.", limit: "" },
          { title: "Riot, Strike — Government/Authority Dispossession or Confiscation", description: "Temporary or permanent dispossession, confiscation, commandeering, requisition or destruction by order of the government or any lawful authority.", limit: "" },
          { title: "Riot, Strike — Unlawful Occupation", description: "Temporary or permanent dispossession of the Home by unlawful occupation by any person or prevention of access.", limit: "" },
          { title: "Riot, Strike — Work Cessation", description: "Total or partial cessation of work, retardation, interruption or cessation of any process or operations or omissions of any kind.", limit: "" },
          { title: "Leakage from Sprinklers — Repairs/Alterations/Defects", description: "Leakage caused by repairs or alterations to the home or building, repairs/removal/extension of any sprinkler installation, or defects in the construction known to the insured.", limit: "" },
          { title: "Theft — Outside the Home or Unsecured External Items", description: "Theft of any article outside the Home, or of any article attached from the outside of the outer walls or roof unless securely mounted.", limit: "" },
          { title: "Municipal Regulations Costs — Pre-commencement or Uninsured Damage", description: "Costs for destruction/damage occurring before Commencement Date, or for destruction/damage not insured under this policy, or under regulations of which the insured received notice before the damage occurred.", limit: "" },
          { title: "Municipal Regulations Costs — Capital Appreciation Charges", description: "Amount of any rate, tax, duty, development or other charge or assessment arising out of capital appreciation payable in respect of the insured property due to compliance with regulations.", limit: "" },
          { title: "Holiday Home / Lodging & Boarding Use", description: "No payment if the Home Building is used as a holiday home or for lodging and boarding.", limit: "" },
          { title: "Non-Residential Use", description: "No payment if the Home Building or any part is used for purposes other than residential (exceptions: self-employed use for livelihood, or temporary office due to lockdown/closure ordered by public authority).", limit: "" },
        ],
        conditions: [
          "For Reinstatement Value claims: insured must spend on repairs first and then claim the amount from the insurer.",
          "Claim amount calculated on actual Carpet Area, not exceeding Carpet Area declared in Proposal Form.",
          "For Total Loss under Reinstatement Value: insurer pays the Sum Insured.",
          "For Total Loss under Saleable Value — Retain but not reinstate: settlement on Cost of Reconstruction less depreciation by age.",
          "For Total Loss under Saleable Value — Abandon to insurer: amount payable is Sum Insured in Policy Schedule.",
          "Restoration of Sum Insured after each claim — proportionate premium for unexpired period must be paid (may be deducted from net claim).",
          "Sum Insured automatically increases by 10% per annum on each policy anniversary at no extra premium, up to 100% of original SI.",
          "Repairs/reconstruction under Municipal Regulations must commence within a reasonable time and be completed within 12 months from the date of damage (or within such extended period as the insurer allows in writing).",
          "If insurer's liability is reduced under any term or condition of the policy, liability under Municipal Regulations extension is also proportionately reduced.",
          "Policy terminates 7 days after the Home Building collapses or is destroyed by a non-insured event; insured may apply within 7 days for continuation of cover.",
          "Policy terminates on change of use from personal residence to any other purpose.",
          "Policy terminates on sale, surrender or release of interest in the Home Building.",
          "On death of the insured, Home Building Cover continues for legal representatives during the Policy Period.",
        ],
        claimDocuments: [
          "Duly filled and signed claim form",
          "Copy of Policy Schedule and Policy Document",
          "Photographs of loss/physical damage",
          "Report to police (for fire/explosion/riot/impact/theft events) or District Administration (for subsidence/landslide/rockslide)",
          "Plans, specification books, vouchers, invoices pertaining to reconstruction/replacement/repair costs",
          "Certificate from architect or local authority (for Loss of Rent / uninhabitability claims)",
          "Authority letter to obtain relevant records from police or other authority",
        ],
        displayOrder: 1,
      },
      {
        title: "Home Contents Cover",
        description: "Covers physical loss, damage, or destruction of the General Contents of the Home caused by any Insured Event. General Contents includes all household-use contents not permanently attached or fixed to the structure — furniture, electronic goods, antennae, solar panels, water storage equipment, kitchen equipment, electrical equipment (including wall-fitted), clothing and apparel, and similar items. Valuable Contents (jewellery, silverware, paintings, works of art, antique items, curios) are NOT covered unless the optional Valuable Contents cover is purchased.",
        sumInsured: "Built-in cover: 20% of Home Building Sum Insured, subject to a maximum of ₹10 Lakh (provided both Home Building and Home Contents covers are opted for). Higher Sum Insured can be opted by declaring in Proposal Form and paying additional premium. If only Home Contents Cover is purchased, Sum Insured must be declared in Proposal Form. Sum Insured should be sufficient to cover replacement cost of all General Contents (not applicable if Sum Insured is on First Loss basis).",
        covered: [
          { title: "Fire", description: "Physical loss or damage to General Contents caused by fire (actual ignition or burning under accidental or fortuitous circumstances).", limit: "" },
          { title: "Explosion or Implosion", description: "Physical loss or damage to General Contents caused by explosion or implosion.", limit: "" },
          { title: "Lightning", description: "Damage caused by lightning whether or not fire results.", limit: "" },
          { title: "Earthquake, Volcanic Eruption, or Other Convulsions of Nature", description: "Loss or damage caused by seismic activity.", limit: "" },
          { title: "Storm, Cyclone, Typhoon, Tempest, Hurricane, Tornado", description: "Loss or damage from extreme weather/atmospheric events.", limit: "" },
          { title: "Tsunami, Flood and Inundation", description: "Loss from tsunami or flood/inundation events.", limit: "" },
          { title: "Subsidence, Landslide, Rockslide, Avalanche", description: "Loss from ground movement events.", limit: "" },
          { title: "Bush Fire, Forest Fire, Jungle Fire", description: "Loss caused by accidental burning of vegetation/wildfire.", limit: "" },
          { title: "Impact Damage", description: "Loss caused by impact of external physical objects.", limit: "" },
          { title: "Missile Testing Operations", description: "Loss from missile testing conducted by Government of India.", limit: "" },
          { title: "Riot, Strike, Malicious Damage", description: "Loss caused by riot, strike or malicious damage.", limit: "" },
          { title: "Bursting or Overflowing of Water Tanks, Apparatus and Pipes", description: "Loss from bursting/overflowing water tanks or pipes.", limit: "" },
          { title: "Leakage from Automatic Sprinkler Installations", description: "Loss from accidental leakage from sprinkler installations.", limit: "" },
          { title: "Theft (post-event)", description: "Theft within 7 days from the occurrence of and proximately caused by any of the above Insured Events.", limit: "" },
        ],
        notCovered: [
          { title: "Valuable Contents", description: "Jewellery, silverware, paintings, works of art, antique items, curios and items of similar nature are NOT covered unless the optional Valuable Contents cover is purchased.", limit: "" },
          { title: "Items Removed from the Home", description: "Loss or damage to any Insured Property removed from the Home to any other place.", limit: "" },
          { title: "Missing or Mislaid Items", description: "Loss of property that is missing, mislaid, or whose disappearance cannot be linked to a single identifiable event.", limit: "" },
          { title: "Same exclusions as Home Building Cover (perils and general exclusions)", description: "All the per-peril exclusions and general exclusions listed under Clause F apply equally to Home Contents.", limit: "" },
        ],
        conditions: [
          "On a valid claim, the insurer will at its option: (i) reimburse cost of repair to substantially same condition, OR (ii) pay cost of replacing that item with a same or similar item, OR (iii) repair the damaged item.",
          "Maximum payable is the Sum Insured in the Policy Schedule for Home Contents Cover. Per-item/category limits in the Schedule cap payment for that item.",
          "Restoration of Sum Insured after each claim — proportionate premium for unexpired period must be paid (may be deducted from net claim).",
          "Sum Insured must be sufficient to cover replacement cost of all General Contents (not applicable on First Loss basis).",
          "On death of the insured, Home Contents Cover continues for legal representatives during the Policy Period.",
        ],
        claimDocuments: [
          "Duly filled and signed claim form",
          "Copy of Policy Schedule and Policy Document",
          "Photographs of damage/loss",
          "Vouchers, invoices pertaining to replacement/repair costs",
          "Police report (for theft, riot, malicious damage, etc.)",
          "Authority letter to obtain relevant records from police or other authority",
        ],
        displayOrder: 2,
      },
      {
        title: "Optional Cover: Valuable Contents (Agreed Value Basis)",
        description: "Covers physical loss or damage to Valuable Contents of the Home (jewellery, silverware, paintings, works of art, antique items, curios and similar items) on an Agreed Value Basis. A value agreed upon between the insured and insurer based on a valuation certificate submitted by the insured and accepted by the insurer. Valuation certificate may be waived if Sum Insured is up to ₹5 Lakh and individual item value does not exceed ₹1 Lakh.",
        sumInsured: "Agreed Value as declared in Proposal Form and shown in Policy Schedule.",
        covered: [
          { title: "Physical Damage to Valuable Contents", description: "If Valuable Contents are physically damaged by any Insured Event, insurer pays the cost of repairing the items.", limit: "" },
          { title: "Total Loss of Valuable Contents", description: "If Valuable Contents are a Total Loss, insurer pays the Sum Insured shown in the Policy Schedule for the relevant item/s.", limit: "Loss to only one item of a pair or set does not constitute loss/damage to the entire pair or set." },
        ],
        notCovered: [
          { title: "Uninsured Valuable Items", description: "Any valuable item not declared and covered under this optional cover.", limit: "" },
        ],
        conditions: [
          "Valuation certificate required for Sum Insured above ₹5 Lakh or individual item value above ₹1 Lakh.",
          "Per-item/category limits in the Policy Schedule cap payment.",
          "All standard policy exclusions and conditions apply.",
        ],
        claimDocuments: [
          "Duly filled claim form",
          "Valuation certificate (where applicable)",
          "Photographs of damage",
          "Purchase receipts/invoices for the valuable items",
          "Police report (if applicable)",
        ],
        displayOrder: 3,
      },
      {
        title: "Optional Cover: Loss of Rent / Rent for Alternative Accommodation",
        description: "Pays for loss of rental income or additional rent for alternative accommodation while the Home Building is not fit for living following physical loss arising out of an Insured Event. Cover is available for the reasonable time required to repair the Home Building, for a maximum period of 3 years from the date the Home Building becomes unfit for living.",
        sumInsured: "As declared in Proposal Form and specified in Policy Schedule.",
        covered: [
          { title: "Loss of Rent (if insured is owner)", description: "Amount of rent the insured loses while the Home Building is not fit for living due to a covered loss.", limit: "Calculated as: (Sum Insured for Loss of Rent × Period Necessary for Repairs) ÷ Loss of Rent Period opted for. Maximum 3 years." },
          { title: "Rent for Alternative Accommodation (if insured is tenant)", description: "Difference between the rent for alternative accommodation and the rent of the Home Building.", limit: "Alternative accommodation must not be superior to the Home Building and must be in the same city. Maximum 3 years." },
        ],
        notCovered: [
          { title: "Accommodation Superior to Insured Home", description: "Cover not available for alternative accommodation superior to the Home Building in any way.", limit: "" },
          { title: "Claim without Underlying Home Building Claim", description: "Loss of rent claim is accepted only if a claim for physical damage under the Home Building Cover has been accepted.", limit: "" },
        ],
        conditions: [
          "The insured must submit a certificate from an architect or local authority confirming the Home Building is not fit for living.",
          "A claim under this cover is admissible only if the Home Building Cover claim has been accepted.",
        ],
        claimDocuments: [
          "Duly filled claim form",
          "Certificate from architect or local authority confirming uninhabitability",
          "Rent receipts / lease agreement (for alternative accommodation)",
          "Original rent agreement for the insured Home (for tenants)",
          "Home Building Cover claim acceptance letter",
        ],
        displayOrder: 4,
      },
      {
        title: "Optional Cover: Acts of Terrorism",
        description: "Extends the policy to cover loss, damage, cost or expense directly or indirectly caused by any act of terrorism. Coverage, exclusions, and excess as per the Terrorism Clause attached to the policy.",
        sumInsured: "As specified in the Policy Schedule.",
        covered: [
          { title: "Physical Loss or Damage due to Terrorism", description: "Loss or damage caused by an act or series of acts of terrorism (use of force, violence or threat thereof by any person/group for political, religious, ideological or similar purposes).", limit: "" },
        ],
        notCovered: [
          { title: "Exclusions as per Terrorism Clause", description: "Specific exclusions and excess as detailed in the attached Terrorism Clause.", limit: "" },
        ],
        conditions: [
          "Coverage, exclusions, and excess are governed entirely by the Terrorism Clause attached to the policy.",
        ],
        claimDocuments: [
          "Duly filled claim form",
          "Police/FIR report",
          "Photographs of damage",
          "Relevant authority reports confirming the terrorist act",
        ],
        displayOrder: 5,
      },
      {
        title: "Optional Cover: Personal Accident",
        description: "In the event an insured peril that caused damage to the Home Building and/or Home Contents also results in the unfortunate death of the insured or their spouse, the insurer pays the compensation amount specified in the Policy Schedule. On the death of the insured, the Personal Accident cover continues for the spouse until expiry of the policy.",
        sumInsured: "As specified in Policy Schedule.",
        covered: [
          { title: "Death of Insured", description: "Compensation paid if the insured dies as a result of the same insured peril that caused damage to the Home Building/Contents.", limit: "As specified in Policy Schedule." },
          { title: "Death of Spouse", description: "Compensation paid if the insured's spouse dies as a result of the same insured peril that caused damage to the Home Building/Contents.", limit: "As specified in Policy Schedule." },
        ],
        notCovered: [
          { title: "Death Unrelated to an Insured Peril", description: "Death not caused by an insured peril that also damaged the Home Building or Home Contents.", limit: "" },
        ],
        conditions: [
          "On the insured's death, Personal Accident cover continues for the spouse until the policy expiry.",
        ],
        claimDocuments: [
          "Duly filled claim form",
          "Death Certificate",
          "Post Mortem report (where necessary)",
          "Home Building / Home Contents claim acceptance evidence",
          "FIR or police report (if applicable)",
        ],
        displayOrder: 6,
      },
      {
        title: "Optional Cover: Loss Minimization",
        description: "Pays reasonable expenses incurred to safeguard the insured property including moving/shifting of property to prevent aggravation of loss or damage following the operation of insured perils.",
        sumInsured: "As specified in Policy Schedule.",
        covered: [
          { title: "Expenses for Safeguarding / Moving Property", description: "Reasonable actual expenses incurred to safeguard the property or move/shift the property to prevent aggravation of loss or damage caused by insured perils.", limit: "Up to 10% of Sum Insured for the respective item." },
        ],
        notCovered: [],
        conditions: [
          "Additional premium applicable.",
          "Maximum payment: 10% of Sum Insured for the respective item.",
          "Loss must arise from operation of insured perils as specified in the Policy Schedule.",
        ],
        claimDocuments: [
          "Duly filled claim form",
          "Receipts/invoices for shifting/moving expenses",
          "Evidence of underlying insured peril event",
        ],
        displayOrder: 7,
      },
      {
        title: "Optional Cover: Hardship Allowance",
        description: "Indemnifies the insured against expenses incurred towards emergency purchases of Food, Medicines, Clothes and Infant essential items following an admissible material damage claim.",
        sumInsured: "As opted by insured and specified in Policy Schedule.",
        covered: [
          { title: "Emergency Purchases of Food, Medicines, Clothes and Infant Essentials", description: "Expenses for emergency purchase of food, medicines, clothing and infant essential items necessitated by the insured peril event.", limit: "Up to the percentage of admissible material damage claim amount as opted by the insured and specified in the Policy Schedule." },
        ],
        notCovered: [],
        conditions: [
          "Additional premium applicable.",
          "An admissible claim under the policy for loss or damage to insured property must exist.",
          "Amount is paid along with the material damage claim amount.",
        ],
        claimDocuments: [
          "Duly filled claim form",
          "Receipts/bills for emergency purchases",
          "Underlying material damage claim documents",
        ],
        displayOrder: 8,
      },
      {
        title: "Optional Cover: Accidental Hospitalization of Domestic Staff",
        description: "Pays a specified amount for accidental hospitalization of domestic staff employed by the insured whilst on duty at the insured premises, provided such hospitalization is caused by the operation of an insured peril. Domestic staff means any person employed full-time or part-time solely for domestic duties; excludes those employed for any business, trade or profession.",
        sumInsured: "As specified in Policy Schedule.",
        covered: [
          { title: "Hospitalization of Domestic Staff due to Insured Peril", description: "Accidental hospitalization (minimum 24 consecutive hours in a qualifying hospital) of domestic staff on duty at insured premises, caused by an insured peril.", limit: "Amount specified in Policy Schedule." },
        ],
        notCovered: [
          { title: "Hospitalization Not Caused by Insured Peril", description: "Hospitalization not resulting from the operation of an insured peril.", limit: "" },
          { title: "Business/Trade/Profession Employees", description: "Any person employed in any capacity in connection with any business, trade or profession.", limit: "" },
        ],
        conditions: [
          "Additional premium applicable.",
          "Hospital must meet minimum criteria: qualified nursing staff round the clock, at least 10 in-patient beds (towns <10 lakh population) or at least 15 in-patient beds (all other places), qualified medical practitioners round the clock, fully equipped operation theatre, daily patient records accessible to the insurer.",
          "Hospitalization means admission in a hospital for a minimum period of 24 consecutive hours.",
        ],
        claimDocuments: [
          "Duly filled claim form",
          "Hospital admission and discharge records",
          "Bills and receipts from hospital",
          "Evidence that staff was on duty at insured premises",
          "Evidence that hospitalization was caused by an insured peril",
        ],
        displayOrder: 9,
      },
      {
        title: "Optional Cover: Tenant's Liability",
        description: "Extends the indemnity to include all sums for which the insured (having insurable interest as tenant under the terms of the lease agreement) shall become legally liable to pay following damage to the Home Building from insured perils, including damage to surrounding third-party property consequent upon the insured's occupation as a tenant.",
        sumInsured: "As specified in Policy Schedule/Certificate of Insurance.",
        covered: [
          { title: "Legal Liability to Landlord or Third Parties", description: "All sums for which the insured (as tenant) is legally liable arising from damage to the Home Building or surrounding third-party property caused by insured perils during the tenancy.", limit: "Sum Insured as mentioned in Policy Schedule/Certificate of Insurance." },
        ],
        notCovered: [
          { title: "Sub-let Premises", description: "No liability for any Home Building or portion of premises sub-let by the insured.", limit: "" },
          { title: "Breach of Contractual Obligations", description: "Liability arising from breach of any contractual agreement or obligation between any landlord or tenant.", limit: "" },
        ],
        conditions: [
          "If the landlord has effected insurance on behalf of the insured as tenant, or the insured is entitled to indemnity from any other source, such 'initial indemnity' is deducted from this policy's indemnity.",
          "If the 'initial indemnity' from other sources exceeds this policy's limit, the company shall not be liable.",
          "Claim shall not exceed the Sum Insured mentioned in the Policy Schedule.",
        ],
        claimDocuments: [
          "Duly filled claim form",
          "Copy of lease/tenancy agreement",
          "Legal notice or claim from landlord",
          "Photographs of damage",
          "Evidence of insured peril event",
        ],
        displayOrder: 10,
      },
      {
        title: "Optional Cover: Accidental Damage",
        description: "Extends the policy to cover direct physical loss or damage to the insured property whilst situated at the insured premises due to accident from any fortuitous cause, including accidental discharge, leakage or overflow of water/steam from plumbing, septic tanks, cylinders, stand pipes, industrial/domestic appliances, refrigerating system, air-conditioning system, rain or snow admitted through defective roof/headers/spouting or open/defective windows, doors, transoms, ventilators or skylights.",
        sumInsured: "As stated in Policy Schedule for the period of insurance.",
        covered: [
          { title: "Accidental Physical Loss or Damage from Any Fortuitous Cause", description: "Direct physical loss or damage to insured property at insured premises due to accident from any fortuitous cause including accidental water/steam leakage from plumbing, appliances, AC systems, rain/snow ingress through defective openings.", limit: "As stated in Policy Schedule." },
        ],
        notCovered: [
          { title: "Bullion, Unset Precious Stones, Curios, Works of Art, Manuscripts, Securities, Documents, Stamps, Coins, Paper Money, Cheques, Business Books, Computer Records, Explosives", description: "Unless otherwise expressly stated in Policy Schedule.", limit: "" },
          { title: "Damage Due to Change of Temperature", description: "Loss, destruction or damage caused by change of temperature.", limit: "" },
          { title: "Spoilage from Process Interruption", description: "Loss or damage by spoilage resulting from retardation, interruption or cessation of any process or operation.", limit: "" },
          { title: "Belts, Ropes, Chains, Rubber Tyres, Dies, Moulds, Glass, Porcelain, Ceramics, Operating Media, Packing Material, Non-metallic Parts", description: "Damage to these items unless caused by fire, lightning, riot, strike, malicious damage, storm, tempest, flood or inundation.", limit: "" },
          { title: "Breakdown — Electrical, Electronic or Mechanical Derangement", description: "Loss or damage due to breakdown, electrical, electronic and/or mechanical derangement.", limit: "" },
          { title: "Termites, Moths, Insects, Vermin, Inherent Vice, Fumes, Latent Defect, Atmospheric/Climatic Fluctuations, Action of Light", description: "Loss or damage due to any of these causes.", limit: "" },
          { title: "Collapse, Settlement, Bedding Down, Ground Heave or Cracking", description: "Loss or damage due to collapse, settlement or bedding down, ground heave or cracking of structures or removal/weakening of support to insured property.", limit: "" },
          { title: "Self-Intentional Destruction or Insured's Provocation", description: "Any loss or damage due to self-intentional destruction or arising out of provocation by the insured or its authorized representative.", limit: "" },
        ],
        conditions: [
          "Additional premium applicable.",
          "Limit of Indemnity shall not exceed the amount stated in the Policy Schedule for the period of insurance.",
          "Standard policy exclusions apply in addition to the Accidental Damage-specific exclusions listed above.",
        ],
        claimDocuments: [
          "Duly filled claim form",
          "Photographs of damage",
          "Explanation of the accidental event",
          "Repair estimates/invoices",
          "Plumber/technician reports (where applicable)",
        ],
        displayOrder: 11,
      },
      {
        title: "Optional Cover: Dynamo Clause (Electrical Appliance Damage)",
        description: "Extends the policy to cover loss or damage to electrical appliances, apparatus, fixtures or fittings insured under this policy arising from or occasioned by overrunning, excessive pressure, short circuit, arcing, self-heating or leakage of electricity from whatever cause (lightning included).",
        sumInsured: "As specified in Policy Schedule.",
        covered: [
          { title: "Electrical Damage to Appliances/Fixtures/Fittings", description: "Loss or damage due to overrunning, excessive pressure, short circuit, arcing, self-heating or leakage of electricity (including lightning).", limit: "" },
        ],
        notCovered: [
          { title: "Breakdown", description: "Loss or damage to electrical appliances, apparatus, fixtures or fittings due to breakdown by whatsoever reason.", limit: "" },
        ],
        conditions: [
          "Additional premium applicable.",
        ],
        claimDocuments: [
          "Duly filled claim form",
          "Photographs of damaged appliance/fixture",
          "Electrician/technical report",
          "Purchase invoice of the appliance",
        ],
        displayOrder: 12,
      },
      {
        title: "Optional Cover: Landscaping",
        description: "Covers additional cost of reclaiming, restoring or repairing land improvements (alterations to the natural condition of land by grading, landscaping, additions such as pavements, roadways or similar works) resulting from direct physical loss or damage to insured property.",
        sumInsured: "As specified in Policy Schedule.",
        covered: [
          { title: "Reclaiming, Restoring or Repairing Land Improvements", description: "Cost of restoring/repairing land improvements (pavements, roadways, landscaping, grading) following direct physical loss of or damage to insured property.", limit: "" },
        ],
        notCovered: [
          { title: "Golf Course Land Improvements", description: "This coverage does not apply to land improvements at a golf course unless specifically mentioned in the Schedule.", limit: "" },
        ],
        conditions: [
          "Additional premium applicable.",
          "All terms, conditions and exclusions of the policy apply.",
        ],
        claimDocuments: [
          "Duly filled claim form",
          "Photographs of landscaping damage",
          "Cost estimates/invoices for restoration",
          "Evidence of underlying physical loss to insured property",
        ],
        displayOrder: 13,
      },
      {
        title: "Optional Cover: Snowfall Damage",
        description: "Extends the policy to cover damages resulting from collapse of roofs/housetops/buildings caused by the weight of snow/ice/sleet collected during snowfall, and bursting of water pipes caused by freezing temperatures.",
        sumInsured: "Limited to 20% of Sum Insured for building and contents respectively.",
        covered: [
          { title: "Collapse of Roof/Housetop/Building due to Snow Weight", description: "Structural collapse caused by accumulation of snow, ice or sleet during snowfall.", limit: "Up to 20% of Sum Insured for building." },
          { title: "Bursting of Water Pipes due to Freezing", description: "Bursting of water pipes caused by freezing temperatures.", limit: "Up to 20% of Sum Insured for contents." },
        ],
        notCovered: [],
        conditions: [
          "Coverage limited to 20% of Sum Insured for building and contents respectively.",
        ],
        claimDocuments: [
          "Duly filled claim form",
          "Photographs of damage",
          "Weather/snowfall records from meteorological authority",
          "Repair estimates/invoices",
        ],
        displayOrder: 14,
      },
      {
        title: "Optional Cover: Repair and Maintenance Cover",
        description: "Covers the cost of technician visits for damages to specified appliances (as mentioned in the Policy Schedule) due to electrical damage/non-working of the appliance, including preventive maintenance to keep the appliances in good working condition.",
        sumInsured: "As specified in Policy Schedule / Certificate of Insurance.",
        covered: [
          { title: "Technician Visit for Appliance Repair/Maintenance", description: "Cost of technician visit for electrical damage/non-working of appliances specified in the Policy Schedule, including preventive maintenance.", limit: "As specified in Policy Schedule." },
        ],
        notCovered: [
          { title: "Cost of Spare Parts, Gas Top-Up, Consumables", description: "Cost of spare parts repaired or replaced, gas top-up or re-filling, or any other consumable used in the appliance.", limit: "" },
          { title: "Appliance Transportation Costs", description: "Transportation costs incurred to repair or replace an appliance.", limit: "" },
          { title: "Commercial Use Appliances", description: "Appliances not used for domestic purposes or at commercial places like shops, offices, hotels, restaurants.", limit: "" },
          { title: "Accessories Damage", description: "Damage to accessories of appliances (e.g., remote controls).", limit: "" },
          { title: "Wear and Tear", description: "Normal wear and tear of appliances.", limit: "" },
          { title: "Aesthetic Defects Not Affecting Function", description: "Cracking, scratching, denting, chipping, breakage or any other aesthetic defects not affecting the operation or function of the appliance.", limit: "" },
        ],
        conditions: [
          "Additional premium applicable.",
          "To avail the service, contact the toll-free number in the Policy Schedule and provide required details.",
          "Inception and expiry of this add-on cover will be as mentioned in the Policy Schedule/Certificate of Insurance.",
          "If the policy is cancelled, this cover is automatically cancelled.",
          "No refund of premium for partially utilized or unutilized services.",
          "Insurer reserves the right to offer revised rates, terms and conditions at renewal based on claim experience.",
        ],
        claimDocuments: [
          "Contact toll-free number as mentioned in Policy Schedule",
          "Policy Schedule / Certificate of Insurance",
          "Details of the appliance requiring service",
        ],
        displayOrder: 15,
      },
    ],
    definitions: [
      { term: "Bank", meaning: "A bank or any financial institution.", example: "" },
      { term: "Fire", meaning: "Actual ignition or burning under accidental or fortuitous circumstances.", example: "" },
      { term: "Explosion", meaning: "A sudden violent burst with a loud sound causing damage by rupturing, shattering, cracking etc. of property — evidenced by broken machinery, shattered glass, splintered timbers and widely scattered debris.", example: "" },
      { term: "Implosion", meaning: "Bursting inward or collapse due to external pressure.", example: "" },
      { term: "Earthquake, Volcanic Eruption, or Other Convulsions of Nature", meaning: "Seismic activity or a violent and abrupt shaking of the ground caused by movement between tectonic plates along a fault line in the earth's crust; usually dependent on magnitude, peak ground acceleration or velocity.", example: "" },
      { term: "Riot & Strike", meaning: "Direct visible physical loss, destruction or damage by external violent means caused to the property.", example: "" },
      { term: "Malicious Damage", meaning: "Destruction/loss/damage to insured property on account of an intentional act of others.", example: "" },
      { term: "Storm", meaning: "An event with extreme atmospheric conditions such as strong winds with or without heavy rain, thunder, lightning, hail or snow recorded at a particular location.", example: "" },
      { term: "Cyclone / Hurricane / Typhoon / Tempest", meaning: "A type of storm system characterized by a large-scale air mass that rotates around a centre of low atmospheric pressure.", example: "" },
      { term: "Tsunami", meaning: "Waves caused by sudden movement of the ocean surface due to earthquakes, landslides on the sea floor, land slumping into the ocean, large volcanic eruptions, or meteorite impact in the ocean. Covered only when the Earthquake peril is also covered under the policy.", example: "" },
      { term: "Flood and Inundation", meaning: "Temporary accumulation of water in a normally dry area resulting in a rise in water levels due to heavy rainfall, overflow of inland or tidal waters, flash flood or storm, cyclone, hurricane or typhoon.", example: "" },
      { term: "Leakage from Automatic Sprinkler Installation", meaning: "Accidental leakage from an automatic sprinkler installation when there is no fire. (Damage caused by water from sprinklers responding to fire is payable as fire damage.)", example: "" },
      { term: "Bush Fire / Forest Fire / Jungle Fire", meaning: "Occurrence of fire due to accidental burning of vegetation, grass etc. including but not limited to wildfire of forestry or plantations resulting in lost yields and burnt areas.", example: "" },
      { term: "Smoke Damage", meaning: "Repainting of the insured building directly caused by smoke which is sudden and accidental in nature, whether generated from within or outside the insured premises, but excluding smoke from fireplaces.", example: "" },
      { term: "Carpet Area", meaning: "1. For the main building unit: the net usable floor area, excluding area covered by external walls, areas under services shafts, exclusive balcony/verandah area and exclusive open terrace area, but including area covered by internal partition walls. 2. For any enclosed structure on the same site: net usable floor area of such structure. 3. For any balcony, verandah, terrace, parking area or enclosed structure that is part of the Home: 25% of its net usable floor area.", example: "" },
      { term: "Commencement Date", meaning: "The date and time from which the insurance cover under this Policy begins, as shown in the Policy Schedule.", example: "" },
      { term: "Cost of Construction", meaning: "The amount required to construct the Home Building at the Commencement Date. For residential structures including Fittings and Fixtures: Carpet Area (sq. m.) × Rate of Cost of Construction at Commencement Date (as declared by the insured and accepted by the insurer). For additional structures: amount based on prevailing rate of Cost of Construction at Commencement Date.", example: "" },
      { term: "Endorsement", meaning: "A written amendment to the Policy (additions, deletions, modifications, exclusions or conditions) which may change the terms or scope of the original policy.", example: "" },
      { term: "Home Contents", meaning: "Articles or things in the Home that are not permanently attached or fixed to the structure of the Home. May consist of General Contents and/or Valuable Contents.", example: "" },
      { term: "General Contents", meaning: "All the contents of household use in the Home — e.g. furniture, electronic items and goods, antennae, solar panels, water storage equipment, kitchen equipment, electrical equipment (including those fitted on walls), clothing and apparel and items of similar nature.", example: "" },
      { term: "Valuable Contents", meaning: "Items such as jewellery, silverware, paintings, works of art, antique items, curios and items of similar nature.", example: "" },
      { term: "Insured", meaning: "The person/s who has/have purchased Insurance Cover under this Policy.", example: "" },
      { term: "Insured Property", meaning: "The Home Building and Home Contents, or any item of property covered by this Policy.", example: "" },
      { term: "Kutcha Construction", meaning: "Building(s) having walls and/or roofs of wooden planks, thatched leaves, grass, hay of any kind, bamboo, plastic cloth, asphalt, canvas, tarpaulin and the like.", example: "" },
      { term: "Pucca Construction", meaning: "Construction other than Kutcha Construction.", example: "" },
      { term: "Policy Period", meaning: "The period commencing from the effective date and time shown in the Policy Schedule and terminating at Midnight on the expiry date shown in the Policy Schedule, or on the termination or cancellation of insurance (whichever is earlier).", example: "" },
      { term: "Policy Schedule", meaning: "The document accompanying and forming part of the Policy that gives the insured's personal details, Policy Period, description of Insured Property, Sum Insured for each cover, limits and sub-limits, covers purchased or opted out, premium paid, add-on covers, and other relevant information.", example: "" },
      { term: "Premium", meaning: "The amount paid by the insured for this insurance. The Policy Schedule shows the premium amount for the Policy Period and all taxes and levies.", example: "" },
      { term: "Saleable Value", meaning: "The purchase cost of a flat or apartment, or a value which can be realized if the flat or apartment is sold on the date of proposal for insurance.", example: "" },
      { term: "First Loss Limit", meaning: "The sum insured of the property that is exposed to loss or damage in a single loss occurrence.", example: "" },
      { term: "Spouse", meaning: "Wife or husband.", example: "" },
      { term: "Sum Insured", meaning: "The amount shown as Sum Insured in the Policy Schedule. Represents the insurer's maximum liability for each cover or part of cover and for each loss.", example: "" },
      { term: "Total Loss", meaning: "A situation where the Insured Property or item is completely destroyed, lost or damaged beyond retrieval or repair, or the cost of repairing it is more than the Sum Insured for that item or in total.", example: "" },
      { term: "Your Home Building", meaning: "A building consisting of a residential unit, having an enclosed structure and a roof, basement (if any) and used as a building place. Includes fixtures and fittings permanently attached, additional structures on the same site (garage, compound walls, fences, gates, retaining walls, internal roads, verandah/porch, septic tanks, bio-gas plants, fixed water storage, solar panels, wind turbines, AC systems), and any other structure shown in the Policy Schedule.", example: "" },
      { term: "Hospital", meaning: "An institution established for in-patient care and day care treatment of illness and/or injuries, registered as a hospital with local authorities, with qualified nursing staff round the clock, minimum 10 in-patient beds (towns <10 lakh population) or 15 beds (all other places), qualified medical practitioners round the clock, fully equipped operation theatre, and accessible patient records.", example: "" },
      { term: "Hospitalization", meaning: "Admission in a Hospital for a minimum period of 24 consecutive hours.", example: "" },
    ],
    faqs: [
      {
        question: "What is the Bharat Griha Raksha Plus – Long Term policy?",
        answer: "It is a long-term home insurance policy issued by HDFC ERGO General Insurance Company that covers your Home Building and/or Home Contents against physical loss, damage or destruction caused by 17 insured perils including fire, earthquake, flood, cyclone, riot, theft (post-event), and more.",
      },
      {
        question: "What are the two options for Sum Insured under Home Building Cover?",
        answer: "Option 1 is Reinstatement Value — the prevailing Cost of Construction of the Home Building at the Commencement Date. Option 2 is Saleable Value — applicable for Flats/Apartments only, based on the present saleable value on the date of insurance.",
      },
      {
        question: "Does the Sum Insured increase automatically over time?",
        answer: "Yes. If the policy period is more than one year, the Sum Insured is automatically increased by 10% per annum on each policy anniversary without any additional premium, up to a maximum of 100% of the Sum Insured at the Policy Commencement Date.",
      },
      {
        question: "What happens to the Sum Insured after a claim is paid?",
        answer: "The Sum Insured is restored to its full original amount after each claim payment. You must pay a proportionate premium for the unexpired policy period from the date of loss; the insurer may deduct this from the net claim payable.",
      },
      {
        question: "Does underinsurance apply to this policy?",
        answer: "No. The Bharat Griha Raksha Plus – Long Term policy includes a Waiver of Underinsurance (Clause I). If your Sum Insured, calculated from the information you provided, is less than the actual value at risk, the difference will not affect the amount the insurer pays you.",
      },
      {
        question: "Is Home Contents Cover automatic or separate?",
        answer: "A built-in cover for General Contents is included equal to 20% of the Home Building Sum Insured (up to ₹10 Lakh), provided you have opted for both Home Building and Home Contents cover. If you want a higher Sum Insured for Home Contents or only Home Contents Cover, you must declare the Sum Insured in the Proposal Form and pay the applicable premium.",
      },
      {
        question: "Are Valuable Contents like jewellery and paintings covered automatically?",
        answer: "No. Valuable Contents (jewellery, silverware, paintings, works of art, antique items, curios) are not covered under the standard Home Contents Cover. You must opt for the optional Valuable Contents Cover (on Agreed Value Basis) by submitting a valuation certificate (waived if Sum Insured is up to ₹5 Lakh and individual item value does not exceed ₹1 Lakh).",
      },
      {
        question: "Is theft covered under this policy?",
        answer: "Yes, but only theft that occurs within 7 days from the occurrence of and proximately caused by any of the listed Insured Events (e.g., theft following a flood or fire). Standalone burglary/theft not following an Insured Event is not covered under this policy.",
      },
      {
        question: "What is the Loan Value Cover for Flats & Apartments?",
        answer: "If a flat/apartment under course of construction (possession not taken) suffers a Total Loss due to an Insured Event, and you choose not to reconstruct or retain the property and instead abandon it to the insurer, the insurer reimburses the actual payments made to the builder/developer up to the date of the total loss. The policy ceases after payment under this cover.",
      },
      {
        question: "Does the policy cover additional costs required to comply with municipal regulations during reconstruction?",
        answer: "Yes. The policy covers additional costs of reconstruction/reinstatement incurred solely because you must comply with municipal/local authority regulations or State/Central Act rules, over and above the cost to restore the property to equivalent-when-new condition. Reconstruction must commence within a reasonable time and be completed within 12 months from the date of damage.",
      },
      {
        question: "How do I file a claim?",
        answer: "You must: (1) Immediately notify HDFC ERGO of the loss (at any branch or call centre), (2) Report to appropriate authorities (police, fire brigade, District Administration etc. as applicable), (3) Take steps to prevent further loss or damage, (4) Do not sell, clean, repair or remove damaged items without the insurer's consent (except urgent necessity), (5) Submit the claim form within 30 days from the date you first notice the loss, along with all required documents.",
      },
      {
        question: "Can I cancel the policy, and will I get a refund?",
        answer: "Yes, you can cancel the policy at any time during the policy term by informing HDFC ERGO. The company will refund the proportionate premium for the unexpired policy period, subject to no claims having been made during the policy period.",
      },
      {
        question: "What happens to the policy if the insured person dies?",
        answer: "The Home Building Cover and Home Contents Cover continue for the benefit of the insured's legal representative/s during the remainder of the Policy Period, subject to all terms and conditions. If the Personal Accident optional cover was purchased, it continues for the spouse until policy expiry.",
      },
      {
        question: "What happens if I have multiple home insurance policies?",
        answer: "If multiple policies cover the same risk (including policies involving a bank or lending entity), the contribution clause shall not be applied. You have the right to choose which policy to claim under. After paying your claim, HDFC ERGO will seek contribution from the other insurer(s). If a bank is involved, no contribution clause applies.",
      },
      {
        question: "How do I raise a grievance?",
        answer: "You can contact HDFC ERGO via: Phone: 022 6158 2020 / 022 6234 6234; Email: grievance@hdfcergo.com; Website: www.hdfcergo.com; Senior Citizens: 022 6242 6226 / seniorcitizen@hdfcergo.com; or Courier to the C&G Redressal Cell, D-301, 3rd Floor, Eastern Business District (Magnet Mall), LBS Marg, Bhandup (West), Mumbai – 400078. If not satisfied, you may approach the IRDAI Integrated Grievance Management System (https://bimabharosa.irdai.gov.in) or the nearest Insurance Ombudsman.",
      },
      {
        question: "Which Insurance Ombudsman handles grievances for Maharashtra (excluding Mumbai Metro) and Navi Mumbai/Thane?",
        answer: "The Pune Ombudsman office handles Maharashtra (Area of Navi Mumbai and Thane excluding Mumbai Metropolitan Region). Contact: JeevanDarshan Bldg., 3rd Floor, C.T.S. No. 195 to 198, N.C. Kelkar Road, Narayan Peth, Pune – 411 030. Tel: 020-24471175. Email: bimalokpal.pune@cioins.co.in.",
      },
    ],
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
 