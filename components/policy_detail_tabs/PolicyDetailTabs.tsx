'use client'

import { useState } from "react"
import { CheckCircle, XCircle, FileText, HelpCircle, BookOpen, AlertTriangle, Layers } from "lucide-react"

const TABS = [
  { id: "coverage",    label: "Coverage",    icon: Layers        },
  { id: "exclusions",  label: "Exclusions",  icon: XCircle       },
  { id: "conditions",  label: "Conditions",  icon: AlertTriangle },
  { id: "claims",      label: "Claims",      icon: FileText      },
  { id: "faqs",        label: "FAQs",        icon: HelpCircle    },
  { id: "definitions", label: "Glossary",    icon: BookOpen      },
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
      {active === "coverage"    && <CoverageTab sections={policy.coverageSections} />}
      {active === "exclusions"  && <StringListTab items={policy.globalExclusions} icon={<XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />} empty="No global exclusions listed." />}
      {active === "conditions"  && <StringListTab items={policy.globalConditions} icon={<AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />} empty="No global conditions listed." />}
      {active === "claims"      && <ClaimsTab sections={policy.coverageSections} />}
      {active === "faqs"        && <FAQsTab faqs={policy.faqs} />}
      {active === "definitions" && <DefinitionsTab definitions={policy.definitions} />}
    </div>
  )
}

/* ── Coverage ── */
function CoverageTab({ sections }: { sections: any[] }) {
  if (!sections?.length) return <Empty text="No coverage sections available." />

  const sorted = [...sections].sort((a, b) => a.displayOrder - b.displayOrder)

  return (
    <div className="space-y-6">
      {sorted.map((section: any, i: number) => (
        <div key={i} className="bg-white rounded-2xl border border-stone-100 p-6">
          <div className="flex items-start justify-between gap-4 mb-4">
            <h3 className="text-lg font-bold text-stone-900" style={{ fontFamily: "'Playfair Display', serif" }}>
              {section.title}
            </h3>
            {section.sumInsured && (
              <span className="shrink-0 text-xs font-semibold bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full border border-indigo-100">
                {section.sumInsured}
              </span>
            )}
          </div>
          {section.description && (
            <p className="text-sm text-stone-500 mb-5">{section.description}</p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {section.covered?.length > 0 && (
              <div>
                <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-3">Covered</p>
                <ul className="space-y-3">
                  {section.covered.map((item: any, j: number) => (
                    <li key={j} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-stone-800">{item.title}</p>
                        {item.description && <p className="text-xs text-stone-500 mt-0.5">{item.description}</p>}
                        {item.limit && <p className="text-xs font-semibold text-indigo-500 mt-0.5">Limit: {item.limit}</p>}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {section.notCovered?.length > 0 && (
              <div>
                <p className="text-xs font-bold text-rose-600 uppercase tracking-widest mb-3">Not Covered</p>
                <ul className="space-y-3">
                  {section.notCovered.map((item: any, j: number) => (
                    <li key={j} className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-stone-800">{item.title}</p>
                        {item.description && <p className="text-xs text-stone-500 mt-0.5">{item.description}</p>}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {section.conditions?.length > 0 && (
            <div className="mt-5 pt-4 border-t border-stone-100">
              <p className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-2">Conditions</p>
              <ul className="space-y-1.5">
                {section.conditions.map((c: string, j: number) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-stone-600">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

/* ── Generic string list (exclusions / conditions) ── */
function StringListTab({ items, icon, empty }: { items: string[]; icon: React.ReactNode; empty: string }) {
  if (!items?.length) return <Empty text={empty} />
  return (
    <div className="bg-white rounded-2xl border border-stone-100 p-6">
      <ul className="space-y-3">
        {items.map((item: string, i: number) => (
          <li key={i} className="flex items-start gap-2 text-sm text-stone-700">
            {icon}
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ── Claims ── */
function ClaimsTab({ sections }: { sections: any[] }) {
  const sectionsWithDocs = sections?.filter((s) => s.claimDocuments?.length > 0)
  if (!sectionsWithDocs?.length) return <Empty text="No claim documents listed." />

  return (
    <div className="space-y-5">
      {sectionsWithDocs.map((section: any, i: number) => (
        <div key={i} className="bg-white rounded-2xl border border-stone-100 p-6">
          <h3 className="text-sm font-bold text-stone-700 mb-4">{section.title}</h3>
          <ul className="space-y-2">
            {section.claimDocuments.map((doc: string, j: number) => (
              <li key={j} className="flex items-start gap-2 text-sm text-stone-600">
                <FileText className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                {doc}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

/* ── FAQs ── */
function FAQsTab({ faqs }: { faqs: any[] }) {
  const [open, setOpen] = useState<number | null>(null)
  if (!faqs?.length) return <Empty text="No FAQs available." />

  return (
    <div className="space-y-3">
      {faqs.map((faq: any, i: number) => (
        <div key={i} className="bg-white rounded-2xl border border-stone-100 overflow-hidden">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between px-6 py-4 text-left text-sm font-semibold text-stone-800 hover:text-indigo-700 transition-colors"
          >
            {faq.question}
            <span className={`ml-4 shrink-0 text-indigo-400 transition-transform ${open === i ? "rotate-180" : ""}`}>▾</span>
          </button>
          {open === i && (
            <div className="px-6 pb-5 text-sm text-stone-600 leading-relaxed border-t border-stone-100 pt-4">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

/* ── Definitions ── */
function DefinitionsTab({ definitions }: { definitions: any[] }) {
  if (!definitions?.length) return <Empty text="No definitions available." />

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {definitions.map((def: any, i: number) => (
        <div key={i} className="bg-white rounded-2xl border border-stone-100 p-5">
          <p className="text-sm font-bold text-indigo-700 mb-1">{def.term}</p>
          <p className="text-sm text-stone-600 leading-relaxed">{def.meaning}</p>
          {def.example && (
            <p className="text-xs text-stone-400 mt-2 italic">e.g. {def.example}</p>
          )}
        </div>
      ))}
    </div>
  )
}

/* ── Empty ── */
function Empty({ text }: { text: string }) {
  return (
    <div className="flex items-center justify-center py-16 text-stone-400 text-sm">{text}</div>
  )
}