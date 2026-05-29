"use client"

import { useEffect, useState, useCallback } from "react"
import Link from "next/link"
import {
    Shield,
    ArrowLeft,
    Plus,
    X,
    CheckCircle2,
    XCircle,
    ChevronDown,
    SlidersHorizontal,
    Loader2
} from "lucide-react"

interface Policy {
    _id: string
    name: string
    provider: string
    category: string
    price: number
    coverage: number
    features: string[]
    description: string
    isActive: boolean
}

const categoryColors: Record<string, { bg: string; text: string }> = {
    health: { bg: "bg-emerald-50", text: "text-emerald-700" },
    life: { bg: "bg-violet-50", text: "text-violet-700" },
    auto: { bg: "bg-amber-50", text: "text-amber-700" },
    home: { bg: "bg-sky-50", text: "text-sky-700" },
    default: { bg: "bg-slate-50", text: "text-slate-700" },
}
 
const MAX_COMPARE = 4
 
// Policy selector dropdown
function PolicySelector({
    allPolicies,
    selected,
    onSelect,
    onRemove,
    index,
}: {
    allPolicies: Policy[]
    selected: Policy | null
    onSelect: (policy: Policy) => void
    onRemove: () => void
    index: number
}) {
    const [open, setOpen] = useState(false)
 
    const available = allPolicies.filter(
        (p) => p._id !== selected?._id
    )
 
    if (selected) {
        const colors =
            categoryColors[selected.category?.toLowerCase()] ?? categoryColors.default
        return (
            <div className="relative bg-white rounded-2xl border border-stone-100 shadow-sm p-5 flex flex-col gap-3 min-w-0">
                <button
                    onClick={onRemove}
                    className="absolute top-3 right-3 text-stone-300 hover:text-red-400 transition-colors"
                    aria-label="Remove"
                >
                    <X className="w-4 h-4" />
                </button>
 
                <span
                    className={`self-start text-xs font-semibold px-2.5 py-1 rounded-full ${colors.bg} ${colors.text}`}
                >
                    {selected.category}
                </span>
 
                <div>
                    <h3
                        className="font-bold text-stone-900 text-base leading-snug"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        {selected.name}
                    </h3>
                    <p className="text-xs text-stone-400 mt-0.5">{selected.provider}</p>
                </div>
 
                <div className="flex items-end gap-1 mt-auto">
                    <span className="text-xl font-bold text-stone-900">
                        Rs. {selected.price?.toLocaleString("en-IN")}
                    </span>
                    <span className="text-xs text-stone-400 mb-0.5">/yr</span>
                </div>
            </div>
        )
    }
 
    return (
        <div className="relative">
            <button
                onClick={() => setOpen((v) => !v)}
                className="w-full flex items-center justify-between gap-2 bg-white border-2 border-dashed border-stone-200 hover:border-indigo-300 rounded-2xl px-5 py-6 text-stone-400 hover:text-indigo-500 transition-all group"
            >
                <span className="flex items-center gap-2 text-sm font-medium">
                    <Plus className="w-4 h-4" />
                    Add policy {index + 1}
                </span>
                <ChevronDown
                    className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
                />
            </button>
 
            {open && (
                <div className="absolute z-30 top-full mt-2 w-full bg-white border border-stone-100 rounded-2xl shadow-xl overflow-hidden">
                    {available.length === 0 ? (
                        <p className="text-sm text-stone-400 text-center py-6">
                            No more policies available
                        </p>
                    ) : (
                        <ul className="max-h-64 overflow-y-auto divide-y divide-stone-50">
                            {available.map((p) => (
                                <li key={p._id}>
                                    <button
                                        onClick={() => {
                                            onSelect(p)
                                            setOpen(false)
                                        }}
                                        className="w-full text-left px-4 py-3 hover:bg-indigo-50 transition-colors flex items-center justify-between group"
                                    >
                                        <div>
                                            <p className="text-sm font-semibold text-stone-800 group-hover:text-indigo-700">
                                                {p.name}
                                            </p>
                                            <p className="text-xs text-stone-400">{p.provider}</p>
                                        </div>
                                        <span className="text-sm font-bold text-stone-700">
                                            Rs. {p.price?.toLocaleString("en-IN")}
                                        </span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    )
}
 
// Comparison row
function CompareRow({
    label,
    values,
    highlight = false,
}: {
    label: string
    values: (string | number | boolean | null)[]
    highlight?: boolean
}) {
    return (
        <tr className={`border-b border-stone-100 ${highlight ? "bg-indigo-50/40" : "bg-white"}`}>
            <td className="px-5 py-4 text-xs font-semibold text-stone-400 uppercase tracking-wider whitespace-nowrap w-36">
                {label}
            </td>
            {values.map((val, i) => (
                <td key={i} className="px-5 py-4 text-sm text-stone-700 text-center">
                    {typeof val === "boolean" ? (
                        val ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 mx-auto" />
                        ) : (
                            <XCircle className="w-5 h-5 text-stone-200 mx-auto" />
                        )
                    ) : val !== null && val !== undefined ? (
                        String(val)
                    ) : (
                        <span className="text-stone-200">-</span>
                    )}
                </td>
            ))}
            {/* empty cols if less than MAX_COMPARE selected */}
            {Array.from({ length: MAX_COMPARE - values.length }).map((_, i) => (
                <td key={`empty-${i}`} className="px-5 py-4 text-center text-stone-100">
                    -
                </td>
            ))}
        </tr>
    )
}
 
// Main page
export default function ComparePage() {
    const [allPolicies, setAllPolicies] = useState<Policy[]>([])
    const [slots, setSlots] = useState<(Policy | null)[]>([null, null])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
 
    useEffect(() => {
        async function fetchPolicies() {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/api/policies`
                )
                const data = await res.json()
                setAllPolicies(data.data || [])
            } catch {
                setError("Failed to load policies.")
            } finally {
                setLoading(false)
            }
        }
        fetchPolicies()
    }, [])
 
    const handleSelect = useCallback((policy: Policy, slotIndex: number) => {
        setSlots((prev) => {
            const next = [...prev]
            next[slotIndex] = policy
            return next
        })
    }, [])
 
    const handleRemove = useCallback((slotIndex: number) => {
        setSlots((prev) => {
            const next = [...prev]
            next[slotIndex] = null
            // shrink slots if last two are empty and total > 2
            const trimmed = next.filter(
                (_, i) => i < 2 || next[i] !== null || next[i - 1] !== null
            )
            return trimmed.length >= 2 ? trimmed : next
        })
    }, [])
 
    const addSlot = () => {
        if (slots.length < MAX_COMPARE) setSlots((p) => [...p, null])
    }
 
    const selected = slots.filter(Boolean) as Policy[]
    const canCompare = selected.length >= 2
 
    // collect all unique features across selected policies
    const allFeatures = Array.from(
        new Set(selected.flatMap((p) => p.features ?? []))
    )
 
    return (
        <main className="min-h-screen bg-[#f7f5f0]">
            {/* Navbar */}
            <nav className="border-b border-stone-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Shield className="w-6 h-6 text-indigo-600" strokeWidth={2.5} />
                        <span
                            className="font-bold text-xl tracking-tight text-stone-900"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            PolicyLens
                        </span>
                    </div>
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to policies
                    </Link>
                </div>
            </nav>
 
            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Header */}
                <div className="mb-10">
                    <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4 border border-indigo-100">
                        <SlidersHorizontal className="w-3.5 h-3.5" />
                        Side-by-side Comparison
                    </div>
                    <h1
                        className="text-4xl font-bold text-stone-900 leading-tight"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        Compare Policies
                    </h1>
                    <p className="text-stone-500 mt-2 text-base">
                        Select up to {MAX_COMPARE} policies to compare them side-by-side.
                    </p>
                </div>
 
                {/* Loading / Error */}
                {loading ? (
                    <div className="flex items-center justify-center py-32 gap-3 text-stone-400">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span className="text-sm">Loading policies...</span>
                    </div>
                ) : error ? (
                    <div className="text-center py-32 text-red-400 text-sm">{error}</div>
                ) : (
                    <>
                        {/* Selector Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                            {slots.map((slot, i) => (
                                <PolicySelector
                                    key={i}
                                    index={i}
                                    allPolicies={allPolicies.filter(
                                        (p) =>
                                            !slots.some(
                                                (s, si) => si !== i && s?._id === p._id
                                            )
                                    )}
                                    selected={slot}
                                    onSelect={(p) => handleSelect(p, i)}
                                    onRemove={() => handleRemove(i)}
                                />
                            ))}
 
                            {slots.length < MAX_COMPARE && (
                                <button
                                    onClick={addSlot}
                                    className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-stone-200 hover:border-indigo-300 rounded-2xl px-4 py-6 text-stone-300 hover:text-indigo-400 transition-all text-sm font-medium"
                                >
                                    <Plus className="w-5 h-5" />
                                    Add slot
                                </button>
                            )}
                        </div>
 
                        {/* Comparison Table */}
                        {canCompare ? (
                            <div className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-x-auto">
                                <table className="w-full min-w-[600px]">
                                    <thead>
                                        <tr className="border-b border-stone-100">
                                            <th className="px-5 py-4 text-left text-xs font-semibold text-stone-300 uppercase tracking-wider w-36">
                                                Field
                                            </th>
                                            {slots.map((slot, i) =>
                                                slot ? (
                                                    <th
                                                        key={slot._id}
                                                        className="px-5 py-4 text-center text-sm font-bold text-stone-900"
                                                        style={{ fontFamily: "'Playfair Display', serif" }}
                                                    >
                                                        <div>{slot.name}</div>
                                                        <div className="text-xs font-normal text-stone-400 mt-0.5">
                                                            {slot.provider}
                                                        </div>
                                                    </th>
                                                ) : (
                                                    <th key={`empty-h-${i}`} className="px-5 py-4" />
                                                )
                                            )}
                                            {Array.from({
                                                length: MAX_COMPARE - slots.length,
                                            }).map((_, i) => (
                                                <th key={`pad-${i}`} className="px-5 py-4" />
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <CompareRow
                                            label="Category"
                                            values={slots.map((s) => s?.category ?? null)}
                                            highlight
                                        />
                                        <CompareRow
                                            label="Price / yr"
                                            values={slots.map((s) =>
                                                s ? `Rs. ${s.price?.toLocaleString("en-IN")}` : null
                                            )}
                                        />
                                        <CompareRow
                                            label="Coverage"
                                            values={slots.map((s) =>
                                                s ? `Rs. ${s.coverage?.toLocaleString("en-IN")}` : null
                                            )}
                                            highlight
                                        />
                                        <CompareRow
                                            label="Provider"
                                            values={slots.map((s) => s?.provider ?? null)}
                                        />
                                        <CompareRow
                                            label="Active"
                                            values={slots.map((s) =>
                                                s !== null ? s.isActive : null
                                            )}
                                            highlight
                                        />
 
                                        {/* Feature rows */}
                                        {allFeatures.length > 0 && (
                                            <>
                                                <tr>
                                                    <td
                                                        colSpan={MAX_COMPARE + 1}
                                                        className="px-5 py-3 text-xs font-bold text-indigo-500 uppercase tracking-widest bg-indigo-50/60"
                                                    >
                                                        Features
                                                    </td>
                                                </tr>
                                                {allFeatures.map((feature, fi) => (
                                                    <CompareRow
                                                        key={fi}
                                                        label={feature}
                                                        values={slots.map((s) =>
                                                            s ? s.features?.includes(feature) ?? false : null
                                                        )}
                                                        highlight={fi % 2 === 0}
                                                    />
                                                ))}
                                            </>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-24 text-center border-2 border-dashed border-stone-200 rounded-2xl">
                                <SlidersHorizontal className="w-10 h-10 text-stone-200 mb-4" />
                                <p className="text-stone-400 font-medium">
                                    Select at least 2 policies above to see the comparison.
                                </p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </main>
    )
}
