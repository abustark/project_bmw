"use client"
import { useState } from "react"
import Link from "next/link"

export function Footer() {
  const [subscribed, setSubscribed] = useState(false)

  return (
    <footer className="mt-12 border-t border-[hsl(var(--hairline))] bg-[hsl(var(--canvas))]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid md:grid-cols-12 gap-8">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-[8px] bg-[#5e6ad2] text-white grid place-items-center font-semibold text-[13px]">N</div>
              <div className="font-semibold text-[15px] tracking-tight text-[hsl(var(--ink))] leading-none">N-GELO</div>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-[hsl(var(--ink-muted))] max-w-[420px]">
              Reference showcase — 14 free & open-source drops (MIT / ISC / Free) with attribution. Estimated <span className="line-through opacity-60">₹4,999</span> → <span className="font-medium text-[hsl(var(--ink))]">₹0</span> · not for sale. Extracted components rendered here — source name on card, no outbound link.
            </p>
          </div>
          <div className="md:col-span-3">
            <div className="text-xs tracking-[0.18em] font-medium text-[hsl(var(--ink-subtle))]">MARKETPLACE</div>
            <ul className="mt-3 space-y-2.5 text-sm text-[hsl(var(--ink-muted))]">
              <li><Link href="/shop" className="hover:text-[hsl(var(--ink))] hover:underline underline-offset-4">All products — ₹0</Link></li>
              <li><Link href="/about" className="hover:text-[hsl(var(--ink))]">About & FAQ</Link></li>
              <li><span className="text-[hsl(var(--ink-subtle))]">Licenses — on product page</span></li>
            </ul>
          </div>
          <div className="md:col-span-4">
            <div className="text-xs tracking-[0.18em] font-medium text-[hsl(var(--ink-subtle))]">GET UPDATES</div>
            <p className="mt-3 text-sm text-[hsl(var(--ink-subtle))]">Drops, seller tips, no spam.</p>
            <form
              className="mt-3 flex gap-2"
              onSubmit={(e) => {
                e.preventDefault()
                setSubscribed(true)
              }}
            >
              <input required type="email" placeholder="you@email.com" className="flex-1 h-9 px-3.5 rounded-[8px] bg-[hsl(var(--surface-1))] border border-[hsl(var(--hairline))] text-sm text-[hsl(var(--ink))] placeholder:text-[hsl(var(--ink-subtle))] focus:outline-none focus:border-[#5e6ad2] focus:ring-1 focus:ring-[#5e6ad2]" aria-label="Email for newsletter" />
              <button className="h-9 px-4 rounded-[8px] bg-[#5e6ad2] hover:bg-[#828fff] text-white text-sm font-medium focus-visible:ring-2 focus-visible:ring-[#5e6ad2]">Join</button>
            </form>
            {subscribed && <p className="mt-2 text-xs text-[#5e6ad2]">Thanks! Check your inbox.</p>}
            <p className="mt-3 text-xs text-[hsl(var(--ink-subtle))]">© {new Date().getFullYear()} N-GELO — portfolio demo</p>
          </div>
        </div>

        <div className="mt-8 rounded-[12px] border border-[hsl(var(--hairline))] bg-[hsl(var(--surface-1))] p-4">
          <div className="text-[10px] tracking-[0.2em] font-medium text-[hsl(var(--ink-subtle))]">SOURCES · MIT / ISC / FREE · ALL RIGHTS ORIGINAL AUTHORS</div>
          <p className="mt-2 text-xs leading-relaxed text-[hsl(var(--ink-subtle))] font-mono">
            <span translate="no">shadcn/ui</span> · <span translate="no">Radix</span> · <span translate="no">Heroicons</span> · <span translate="no">Lucide</span> · <span translate="no">Flowbite</span> · <span translate="no">daisyUI</span> · <span translate="no">AstroWind</span> · <span translate="no">Vercel Commerce</span> · <span translate="no">Cruip Tasty</span> · <span translate="no">Uiverse</span> · <span translate="no">CSS Loaders</span> · <span translate="no">LottieFiles</span> · <span translate="no">Motion</span> · <span translate="no">View Transitions</span>
          </p>
        </div>

        <div className="mt-6 pt-6 border-t border-[hsl(var(--hairline))] flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between text-xs text-[hsl(var(--ink-subtle))]">
          <span>Reference demo · ₹0 · no payment · extracted · shown here</span>
          <span className="inline-flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#5e6ad2]" aria-hidden="true" /> All systems operational</span>
        </div>
      </div>
    </footer>
  )
}
