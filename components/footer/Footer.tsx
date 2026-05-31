import Link from "next/link";
import { Shield } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-white/80 backdrop-blur-md ">
      <div className="max-w-7xl mx-auto px-3 py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Shield
                className="w-5 h-5 text-indigo-600"
                strokeWidth={2.5}
              />

              <span
                className="font-bold text-xl text-stone-900"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                PolicyLens
              </span>
            </div>

            <p className="text-sm text-stone-500 max-w-md">
              Compare insurance policies across multiple categories and
              make informed decisions with confidence.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-6 text-sm">
            <Link
              href="/"
              className="text-stone-500 hover:text-stone-900 transition-colors"
            >
              Home
            </Link>

            <Link
              href="/compare"
              className="text-stone-500 hover:text-stone-900 transition-colors"
            >
              Compare Policies
            </Link>
          </div>
        </div>

        <div className="mt-5 pt-3 border-t border-stone-100">
          <p className="text-xs text-stone-400 text-center">
            © {new Date().getFullYear()} PolicyLens. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
