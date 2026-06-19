import { ICoverageSection } from "@/model/Policy"
import { TabCard } from "@/components/policy_detail_tabs/TabCard"
import { SectionHeader } from "./SectionHeader"
import SumInsuredBadge from "@/components/policy/SumInsurancedBadge"
import { CoverageItemGroup } from "./CoverageItemGroup"
import { CoverageSectionConditions } from "@/components/policy/CoverageSectionContions"

interface CoverageSectionCardProps {
  section: ICoverageSection
  query?: string
}

export function CoverageSectionCard({ section, query = "" }: CoverageSectionCardProps) {
  return (
    <TabCard>
      <SectionHeader
        title={section.title}
        subtitle={section.description}
        badge={section.sumInsured ? <SumInsuredBadge value={section.sumInsured} /> : undefined}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {section.covered?.length > 0 && (
          <CoverageItemGroup
            label="Covered"
            type="covered"
            items={section.covered}
            query={query}
          />
        )}
        {section.notCovered?.length > 0 && (
          <CoverageItemGroup
            label="Not Covered"
            type="notCovered"
            items={section.notCovered}
            query={query}
          />
        )}
      </div>

      <CoverageSectionConditions conditions={section.conditions} />
    </TabCard>
  )
}