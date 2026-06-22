import { IPolicy } from "@/model/Policy"
import { getUnifiedSectionTitles, findSectionByTitle } from "@/lib/comparison"
import { BenefitMatrixSection } from "@/components/compare/BenefitMatrixSection"

export function BenefitMatrix({ policies }: { policies: IPolicy[] }) {
  const sectionKeys = getUnifiedSectionTitles(policies)

  return (
    <div>
      <h2 className="text-sm font-bold text-stone-700 uppercase tracking-widest mb-4">
        Benefit-by-Benefit Comparison
      </h2>
      {sectionKeys.map((key) => {
        const displayTitle =
          policies
            .map((p) => findSectionByTitle(p, key))
            .find(Boolean)?.title ?? key

        return (
          <BenefitMatrixSection
            key={key}
            policies={policies}
            sectionTitleKey={key}
            sectionDisplayTitle={displayTitle}
          />
        )
      })}
    </div>
  )
}