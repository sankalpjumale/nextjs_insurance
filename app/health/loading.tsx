import { Loader2 } from "lucide-react"

export default function Loading() {
    return (
        <main className="min-h-screen bg-[#f7f5f0] flex items-center justify-center">
            <div className="flex items-center gap-3 text-stone-400">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span className="text-sm">Loading health policies...</span>
            </div>
        </main>
    )
}
