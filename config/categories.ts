export interface CategoryConfig {
  name: string
  slug: string
  description: string
  badge: {
    bg: string
    text: string
    dot: string
  }
}

export const CATEGORIES: CategoryConfig[] = [
  {
    name: "Health",
    slug: "health",
    description:
      "Covers medical expenses, hospitalization, surgery, treatment costs, and preventive care for individuals and families.",
    badge: { bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-400" },
  },
  {
    name: "Travel",
    slug: "travel",
    description:
      "Covers trip cancellations, emergency medical care abroad, lost baggage, flight delays, and passport loss.",
    badge: { bg: "bg-rose-50", text: "text-rose-700", dot: "bg-rose-400" },
  },
  {
    name: "Car",
    slug: "car",
    description:
      "Protects your car against accidents, theft, fire, natural disasters, and third-party liability.",
    badge: { bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-400" },
  },
  {
    name: "Bike",
    slug: "bike",
    description:
      "Covers two-wheelers against accidental damage, theft, and third-party bodily injury or property damage.",
    badge: { bg: "bg-orange-50", text: "text-orange-700", dot: "bg-orange-400" },
  },
  {
    name: "Home",
    slug: "home",
    description:
      "Covers your house structure and contents against fire, flood, earthquake, theft, and accidental damage.",
    badge: { bg: "bg-sky-50", text: "text-sky-700", dot: "bg-sky-400" },
  },
  {
    name: "Term Life",
    slug: "term",
    description:
      "Provides a death benefit to your family if you pass away during the policy term. Pure protection at low premiums.",
    badge: { bg: "bg-indigo-50", text: "text-indigo-700", dot: "bg-indigo-400" },
  },
  {
    name: "Personal Accident",
    slug: "accident",
    description:
      "Pays compensation on accidental death, permanent disability, or temporary disability due to an accident.",
    badge: { bg: "bg-red-50", text: "text-red-700", dot: "bg-red-400" },
  },
]

// Lookup helpers used throughout the app
export const getCategoryBySlug = (slug: string): CategoryConfig | undefined =>
  CATEGORIES.find((c) => c.slug === slug)

export const getCategoryName = (slug: string): string =>
  getCategoryBySlug(slug)?.name ?? slug

export const getCategoryBadge = (slug: string) =>
  getCategoryBySlug(slug)?.badge ?? {
    bg: "bg-slate-50",
    text: "text-slate-700",
    dot: "bg-slate-400",
  }