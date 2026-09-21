"use client"
import Link from "next/link"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function Footer() {
  const [subscribed, setSubscribed] = useState(false)
  return (
    <footer className="mt-12 border-t border-zinc-100 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid md:grid-cols-12 gap-8">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-zinc-900 text-white grid place-items-center font-bold text-sm tracking-widest" style={{ fontFamily: "var(--font-playfair)" }}>NG</div>
              <div className="font-bold text-lg leading-none" style={{ fontFamily: "var(--font-playfair)" }}>N-GELO <span className="text-xs font-normal text-zinc-500">NEXT</span></div>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600 max-w-[420px]">Reference showcase — 14 free & open-source drops (MIT / ISC / Free) with attribution. Estimated <span className="line-through">₹4,999</span> → <span className="font-bold text-emerald-700">₹0</span> • Not for sale. Extracted components rendered here — source name on card, no outbound link.</p>
          </div>
          <div className="md:col-span-3">
            <div className="font-semibold text-sm">Marketplace</div>
            <ul className="mt-3 space-y-2.5 text-sm text-zinc-600">
              <li><Link href="/shop" className="hover:text-zinc-900 hover:underline underline-offset-4">All products — ₹0</Link></li>
              <li><Link href="/about" className="hover:text-zinc-900">About & FAQ</Link></li>
              <li><span className="text-zinc-400">Licenses — on product page</span></li>
            </ul>
          </div>
          <div className="md:col-span-4">
            <div className="font-semibold text-sm">Get updates</div>
            <p className="mt-3 text-sm text-zinc-500">Drops, seller tips, no spam.</p>
            <form onSubmit={(e) => { e.preventDefault(); setSubscribed(true)}} className="mt-3 flex gap-2">
              <Input required type="email" placeholder="you@email.com" className="flex-1 h-10 rounded-full" aria-label="Email for newsletter" />
              <Button type="submit" className="rounded-full h-10">Join</Button>
            </form>
            {subscribed && <p className="mt-2 text-xs text-emerald-600">Thanks! Check your inbox.</p>}
            <p className="mt-3 text-xs text-zinc-400">© {new Date().getFullYear()} N-GELO Next — portfolio demo</p>
          </div>
        </div>

        <div className="mt-8 rounded-[12px] border border-amber-200 bg-amber-50 p-4">
          <div className="text-xs font-semibold tracking-widest text-amber-900">REFERENCE ATTRIBUTION — NOT FOR SALE • ₹0</div>
          <p className="mt-1.5 text-xs leading-relaxed text-amber-800">
            14 products curated from free & open-source. Estimated <span className="line-through">₹4,999</span> → <span className="font-bold text-emerald-700">₹0</span> •{" "}
            <span translate="no">shadcn/ui (MIT)</span> • <span translate="no">Radix (MIT)</span> • <span translate="no">Heroicons (MIT)</span> • <span translate="no">Lucide (ISC)</span> • <span translate="no">Flowbite (MIT)</span> • <span translate="no">daisyUI (MIT)</span> • <span translate="no">AstroWind (MIT)</span> • <span translate="no">Vercel Commerce (MIT)</span> •{" "}
            <span translate="no">Cruip Tasty (Free)</span> • <span translate="no">Uiverse (MIT)</span> • <span translate="no">CSS Loaders (Free)</span> • <span translate="no">LottieFiles (Free)</span> • <span translate="no">Motion (MIT)</span> • <span translate="no">View Transitions (Free)</span> — all rights original authors.
          </p>
        </div>

        <div className="mt-6 pt-6 border-t border-zinc-100 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between text-xs text-zinc-500">
          <span>Reference demo • ₹0 • no payment • extracted • shown here</span>
          <span className="inline-flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" /> All systems operational</span>
        </div>
      </div>
    </footer>
  )
}
