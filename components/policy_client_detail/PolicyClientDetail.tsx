'use client'

import Link from "next/link"
import { useState } from "react"

interface Policy {
    _id: string
    name: string
    provider: string
    category: string
    price: number
    coverage: number
    features: string[]
    description?: string
    duration?: string
    claimSettlementRatio?: number
    minAge?: number
    maxAge?: number
}

export default function PolicyClientDetail({policy}: {policy: Policy}) {
    const [added, setAdded] = useState(false)

    const handleAddToCompare = () => {
        const existing: string[] = JSON.parse(
            localStorage.getItem("compareList") || "[]"
        )
        if(existing.includes(policy._id)) {
            setAdded(true)
            return 
        }
        if(existing.length >= 4) {
            alert("You can compare up to 4 policies at a time.")
            return 
        }
        localStorage.setItem(
            "compareList",
            JSON.stringify([...existing, policy._id])
        )
        setAdded(true)
    }

    const categoryColors: Record<string, string> = {
        health: "bg-emerald-100 text-emerald-800",
        life: "bg-blue-100 text-blue-800",
        auto: "bg-orange-100 text-orange-800",
        home: "bg-purple-100 text-pruple-800"
    }

    const badgeClass = 
        categoryColors[policy.category?.toLowerCase()] ||
        "bg-gray-100 text-gray-700"

    return (
        <main className="min-h-screen bg-[#f5f4f0] font-sans">
        {/* top nav strip */}
        <div className="bg-[#1a1a2e] text-white px-6 py-3 flex items-center justify-between text-sm">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
            <span className="text-lg font-bold tracking-tight text-[#e0c97f]">PolicyLens</span>
            </Link>
            <Link
            href="/compare"
            className="bg-[#e0c97f] text-[#1a1a2e] px-4 py-1.5 rounded-full font-semibold hover:brightness-110 transition"
            >
            Compare Policies
            </Link>
        </div>
    
        <div className="max-w-5xl mx-auto px-4 py-10">
            {/* breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-[#1a1a2e] transition">Home</Link>
            <span>/</span>
            <span className="capitalize">{policy.category}</span>
            <span>/</span>
            <span className="text-[#1a1a2e] font-medium truncate">{policy.name}</span>
            </div>
    
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* left - main detail card */}
            <div className="lg:col-span-2 space-y-5">
                {/* header card */}
                <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100">
                <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide ${badgeClass}`}>
                        {policy.category}
                    </span>
                    <h1 className="mt-3 text-3xl font-bold text-[#1a1a2e] leading-tight">
                        {policy.name}
                    </h1>
                    <p className="mt-1 text-gray-500 text-sm font-medium">
                        by <span className="text-[#1a1a2e]">{policy.provider}</span>
                    </p>
                    </div>
                    <div className="text-right">
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Premium</p>
                    <p className="text-4xl font-black text-[#1a1a2e]">
                        Rs. {policy.price.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-400">per year</p>
                    </div>
                </div>
    
                {policy.description && (
                    <p className="mt-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">
                    {policy.description}
                    </p>
                )}
                </div>
    
                {/* key stats */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <StatCard label="Coverage" value={`Rs. ${(policy.coverage / 100000).toFixed(0)}L`} icon="Shield" />
                {policy.duration && (
                    <StatCard label="Duration" value={policy.duration} icon="Term" />
                )}
                {policy.claimSettlementRatio !== undefined && (
                    <StatCard label="Claim Ratio" value={`${policy.claimSettlementRatio}%`} icon="OK" />
                )}
                {policy.minAge !== undefined && policy.maxAge !== undefined && (
                    <StatCard label="Age Range" value={`${policy.minAge}-${policy.maxAge} yrs`} icon="Age" />
                )}
                </div>
    
                {/* features */}
                <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100">
                <h2 className="text-base font-bold text-[#1a1a2e] mb-4 flex items-center gap-2">
                    <span>*</span> Coverage Details
                </h2>
                <ul className="space-y-2.5">
                    {policy.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                        <span className="mt-0.5 w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 text-xs font-bold">
                        OK
                        </span>
                        {feature}
                    </li>
                    ))}
                </ul>
                </div>
            </div>
    
            {/* right - action card */}
            <div className="space-y-5">
                <div className="bg-[#1a1a2e] text-white rounded-2xl p-6 shadow-md sticky top-6">
                <p className="text-[#e0c97f] text-xs uppercase tracking-widest font-semibold mb-1">
                    Annual Premium
                </p>
                <p className="text-5xl font-black mb-1">
                    Rs. {policy.price.toLocaleString()}
                </p>
                <p className="text-xs text-gray-400 mb-6">Inclusive of GST</p>
    
                <button
                    onClick={handleAddToCompare}
                    className={`w-full py-3 rounded-xl font-bold text-sm transition mb-3 ${
                    added
                        ? "bg-emerald-500 text-white cursor-default"
                        : "bg-[#e0c97f] text-[#1a1a2e] hover:brightness-110"
                    }`}
                >
                    {added ? "Added to Compare" : "+ Add to Compare"}
                </button>
    
                <Link
                    href="/compare"
                    className="block w-full text-center py-3 rounded-xl border border-white/20 text-white text-sm font-medium hover:bg-white/10 transition"
                >
                    View Comparison
                </Link>
    
                <div className="mt-6 pt-5 border-t border-white/10 space-y-3">
                    <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Provider</span>
                    <span className="font-semibold">{policy.provider}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Category</span>
                    <span className="font-semibold capitalize">{policy.category}</span>
                    </div>
                    {policy.claimSettlementRatio !== undefined && (
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Claim Ratio</span>
                        <span className="font-semibold text-emerald-400">
                        {policy.claimSettlementRatio}%
                        </span>
                    </div>
                    )}
                </div>
                </div>
    
                {/* trust badges */}
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm text-center space-y-3">
                <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Why Compare?</p>
                {[
                    "* 100% unbiased data",
                    "* Real premium quotes",
                    "* Feature-by-feature breakdown",
                ].map((item) => (
                    <p key={item} className="text-xs text-gray-600">{item}</p>
                ))}
                </div>
            </div>
            </div>
        </div>
        </main>
    );
}

function StatCard({ label, value, icon }: { label: string; value: string; icon: string }) {
  return (
    <div className="bg-white rounded-xl px-5 py-4 shadow-sm border border-gray-100 flex items-center gap-3">
      <span className="text-2xl">{icon}</span>
      <div>
        <p className="text-xs text-gray-400 uppercase tracking-wide">{label}</p>
        <p className="text-lg font-bold text-[#1a1a2e]">{value}</p>
      </div>
    </div>
  );
}
