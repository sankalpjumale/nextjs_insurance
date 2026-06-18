import { Plane, TrendingUp } from "lucide-react";

export function TravelHero() {
  return (
    <section className="max-w-7xl mx-auto px-6 pt-16 pb-10">
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 bg-rose-50 text-rose-700 border border-rose-100 px-3 py-1.5 rounded-full text-xs font-semibold mb-6">
          <TrendingUp className="w-3.5 h-3.5" />
          Travel Insurance Comparison
        </div>

        <h1
          className="text-5xl font-bold text-stone-900 leading-tight"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Travel smarter,
          <span className="text-rose-600 italic"> stay protected.</span>
        </h1>

        <p className="mt-5 text-lg text-stone-500 leading-relaxed">
          Compare travel insurance plans from trusted providers and find the
          best coverage for your next journey.
        </p>

        <div className="flex items-center gap-3 mt-8">
          <div className="p-3 rounded-xl bg-rose-50">
            <Plane className="w-6 h-6 text-rose-600" />
          </div>

          <p className="text-sm text-stone-600">
            Medical emergencies • Trip delays • Lost baggage • Passport loss
          </p>
        </div>
      </div>
    </section>
  );
}