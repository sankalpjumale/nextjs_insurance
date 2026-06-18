import { XCircle, AlertTriangle } from "lucide-react"
import { TabCard } from "@/components/policy_detail_tabs/TabCard"
import { TabEmpty } from "@/components/policy_detail_tabs/TabEmpty"

type Variant = "exclusion" | "condition"

const variantConfig: Record<Variant, { icon: React.ReactNode }> = {
  exclusion: { icon: <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" /> },
  condition: { icon: <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" /> },
}

interface StringListTabProps {
  items: string[]
  variant: Variant
  empty: string
}

export function StringListTab({ items, variant, empty }: StringListTabProps) {
  if (!items?.length) return <TabEmpty text={empty} />

  const { icon } = variantConfig[variant]

  return (
    <TabCard>
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-stone-700">
            {icon}
            {item}
          </li>
        ))}
      </ul>
    </TabCard>
  )
}