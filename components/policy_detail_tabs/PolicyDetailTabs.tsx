'use client'

import { useState } from "react"
import { CheckCircle, XCircle, FileText, HelpCircle, BookOpen, AlertTriangle, Layers } from "lucide-react"
import { CoverageTab } from "@/components/policy_detail_tabs/CoverageTab"
import { StringListTab } from "@/components/policy_detail_tabs/StringListTab"
import { ClaimsTab } from "@/components/policy_detail_tabs/ClaimsTab"
import { FAQsTab } from "@/components/policy_detail_tabs/FAQsTAb"
import { DefinitionsTab } from "@/components/policy_detail_tabs/DefinitionsTab"

const TABS = [
  { id: "coverage",    label: "Coverage",   icon: Layers        },
  { id: "exclusions",  label: "Exclusions", icon: XCircle       },
  { id: "conditions",  label: "Conditions", icon: AlertTriangle },
  { id: "claims",      label: "Claims",     icon: FileText      },
  { id: "faqs",        label: "FAQs",       icon: HelpCircle    },
  { id: "definitions", label: "Glossary",   icon: BookOpen      },
]

export function PolicyDetailTabs({ policy }: { policy: any }) {
  const [active, setActive] = useState("coverage")

  return (
    <div>
      {/* Tab bar */}
      <div className="flex gap-1 overflow-x-auto pb-2 mb-8 border-b border-stone-200">
        {TABS.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${
                active === tab.id
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-stone-500 hover:text-stone-800 hover:bg-stone-100"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Tab content */}
      {active === "coverage" && (
        <CoverageTab sections={policy.coverageSections} />
      )}
      {active === "exclusions" && (
        <StringListTab
          items={policy.globalExclusions}
          variant="exclusion"
          empty="No global exclusions listed."
        />
      )}
      {active === "conditions" && (
        <StringListTab
          items={policy.globalConditions}
          variant="condition"
          empty="No global conditions listed."
        />
      )}
      {active === "claims" && (
        <ClaimsTab sections={policy.coverageSections} />
      )}
      {active === "faqs" && (
        <FAQsTab faqs={policy.faqs} />
      )}
      {active === "definitions" && (
        <DefinitionsTab definitions={policy.definitions} />
      )}
    </div>
  )
}