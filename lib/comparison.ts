import { IPolicy, ICoverageSection } from "@/model/Policy"

export const MAX_COMPARE = 3
export const MIN_COMPARE = 2

export function parseComparisonSlugs(param: string | undefined): string[] {
  if (!param) return []
  return param
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, MAX_COMPARE)
}

export function buildComparisonUrl(slugs: string[]): string {
  if (slugs.length === 0) return "/compare"
  return `/compare?policies=${slugs.join(",")}`
}

export function addToComparison(current: string[], slug: string): string[] {
  if (current.includes(slug)) return current
  if (current.length >= MAX_COMPARE) return current
  return [...current, slug]
}

export function removeFromComparison(current: string[], slug: string): string[] {
  return current.filter((s) => s !== slug)
}

//builds a unified, ordered list of coverage section titles across all compared policies, so each row in the comparison table represents the same kind of coverage even if not every policy has it.
export function getUnifiedSectionTitles(policies: IPolicy[]): string[] {
  const seen = new Map<string, number>() // title is  earliest displayOrder

  for (const policy of policies) {
    for (const section of policy.coverageSections ?? []) {
      const key = section.title.trim().toLowerCase()
      const existingOrder = seen.get(key)
      if (existingOrder === undefined || section.displayOrder < existingOrder) {
        seen.set(key, section.displayOrder)
      }
    }
  }

  return Array.from(seen.entries())
    .sort((a, b) => a[1] - b[1])
    .map(([key]) => key)
}

export function findSectionByTitle(
  policy: IPolicy,
  titleKey: string
): ICoverageSection | undefined {
  return policy.coverageSections?.find(
    (s) => s.title.trim().toLowerCase() === titleKey
  )
}


//Coverage gap: a section that exists in at least one compared policy but is entirely missing from another.
export interface CoverageGap {
  sectionTitle: string
  missingFrom: string[] // policy names missing this section
  presentIn: string[]   // policy names that have it
}

export function findCoverageGaps(policies: IPolicy[]): CoverageGap[] {
  const titles = getUnifiedSectionTitles(policies)
  const gaps: CoverageGap[] = []

  for (const titleKey of titles) {
    const missingFrom: string[] = []
    const presentIn: string[] = []

    for (const policy of policies) {
      const section = findSectionByTitle(policy, titleKey)
      if (section) {
        presentIn.push(policy.name)
      } else {
        missingFrom.push(policy.name)
      }
    }

    if (missingFrom.length > 0 && presentIn.length > 0) {
      //use the original-cased title from which policy has it
      const original = policies
        .map((p) => findSectionByTitle(p, titleKey))
        .find(Boolean)
      gaps.push({
        sectionTitle: original?.title ?? titleKey,
        missingFrom,
        presentIn,
      })
    }
  }

  return gaps
}


//Benefit match: for a given section, does each policy cover a similarly titled item? Matches by normalized item title across policies.
export interface BenefitRow {
  itemTitle: string
  perPolicy: Record<string, { covered: boolean; limit?: string }> // keyed by policy slug
}

export function buildBenefitMatrix(
  policies: IPolicy[],
  sectionTitleKey: string
): BenefitRow[] {
  const itemTitles = new Map<string, number>() // normalized title is first seen order

  policies.forEach((policy) => {
    const section = findSectionByTitle(policy, sectionTitleKey)
    section?.covered.forEach((item, idx) => {
      const key = item.title.trim().toLowerCase()
      if (!itemTitles.has(key)) itemTitles.set(key, itemTitles.size + idx)
    })
  })

  const rows: BenefitRow[] = []

  for (const [key] of itemTitles) {
    const perPolicy: BenefitRow["perPolicy"] = {}
    let displayTitle = key

    for (const policy of policies) {
      const section = findSectionByTitle(policy, sectionTitleKey)
      const match = section?.covered.find(
        (item) => item.title.trim().toLowerCase() === key
      )
      if (match) displayTitle = match.title
      perPolicy[policy.slug] = {
        covered: Boolean(match),
        limit: match?.limit,
      }
    }

    rows.push({ itemTitle: displayTitle, perPolicy })
  }

  return rows
}